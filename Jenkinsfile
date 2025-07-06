pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10', daysToKeepStr: '30'))
    }

    stages {
        stage('Clean up') {
            steps {
                deleteDir()
                sh 'docker system prune -af'
            }
        }

        stage('Validate PR') {
            when {
                allOf {
                    changeRequest()
                    expression { env.CHANGE_TARGET == 'develop' }
                }
            }
            stages {
                stage('Build Frontend') {
                    agent {
                        docker {
                            image 'node:20'
                        }
                    }
                    steps {
                        dir('frontend') {
                            withCredentials([
                                string(credentialsId: 'vite-url-imad', variable: 'VITE_BASE_URL')
                            ]) {
                                writeFile file: '.env.production', text: "VITE_BASE_URL=\"${VITE_BASE_URL}\"\n"
                            }
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
                stage('Build Backend') {
                    agent {
                        docker {
                            image 'maven:3-eclipse-temurin-21'
                        }
                    }
                    steps {
                        dir('backend') {
                            sh 'mvn clean install -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                allOf {
                    branch 'develop'
                    not { changeRequest() }
                }
            }
            stages {
                stage('Build Frontend') {
                    agent {
                        docker {
                            image 'node:20'
                        }
                    }
                    steps {
                        echo 'Building frontend (deploy)...'
                        dir('frontend') {
                            withCredentials([
                                string(credentialsId: 'vite-url-imad', variable: 'VITE_BASE_URL')
                            ]) {
                                writeFile file: '.env.production', text: "VITE_BASE_URL=\"${VITE_BASE_URL}\"\n"
                            }
                            sh 'npm ci'
                            sh 'npm run build'
                        }
                    }
                }

                stage('Build Backend') {
                    agent {
                        docker {
                            image 'maven:3-eclipse-temurin-21'
                        }
                    }
                    steps {
                        echo 'Building backend...'
                        dir('backend') {
                            sh 'mvn clean install -DskipTests'
                        }
                    }
                }

                stage('Build & Push Images') {
                    agent any
                    environment {
                        SHORT_SHA = "${env.GIT_COMMIT.take(7)}"
                    }
                    steps {
                        echo 'Building and pushing images...'
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'docker-registry',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            )
                        ]) {
                            sh '''
                                echo "$DOCKER_PASS" | \
                                docker login registry.praksa.abhapp.com \
                                    --username "$DOCKER_USER" --password-stdin

                                docker build -t registry.praksa.abhapp.com/imad-be:$SHORT_SHA backend
                                docker push registry.praksa.abhapp.com/imad-be:$SHORT_SHA

                                docker build -t registry.praksa.abhapp.com/imad-fe:$SHORT_SHA frontend
                                docker push registry.praksa.abhapp.com/imad-fe:$SHORT_SHA
                            '''
                        }
                    }
                }

                stage('Deploy App') {
                    agent any
                    environment {
                        PATH = "/usr/local/bin:${env.PATH}"
                    }
                    steps {
                        checkout scm

                        script {
                            def shortCommit = env.GIT_COMMIT.take(7)

                            withCredentials([
                                usernamePassword(
                                    credentialsId: 'docker-registry',
                                    usernameVariable: 'DOCKER_USER',
                                    passwordVariable: 'DOCKER_PASS'
                                ),
                                string(credentialsId: 'postgres-password-imad', variable: 'POSTGRES_PASSWORD'),
                                string(credentialsId: 'postgres-db-imad', variable: 'POSTGRES_DB'),
                                string(credentialsId: 'postgres-user-imad', variable: 'POSTGRES_USER'),
                                string(credentialsId: 'postgres-user-imad', variable: 'DB_USER'),
                                string(credentialsId: 'postgres-password-imad', variable: 'DB_PASSWORD'),
                                string(credentialsId: 'postgres-url-imad', variable: 'DB_URL'),
                                string(credentialsId: 'jwt-key-imad', variable: 'JWT_KEY'),
                                // NEW CREDENTIALS BELOW
                                string(credentialsId: 'email-user-imad', variable: 'EMAIL_USER'),
                                string(credentialsId: 'email-password-imad', variable: 'EMAIL_PASSWORD'),
                                string(credentialsId: 'stripe-api-key-imad', variable: 'STRIPE_API_KEY'),
                                string(credentialsId: 'stripe-webhook-key-imad', variable: 'STRIPE_WEBHOOK_KEY'),
                                string(credentialsId: 'client-base-url-imad', variable: 'CLIENT_BASE_URL') // add this to Jenkins if not already there
                            ]) {
                                writeFile file: '.env', text: """\
                                    TAG=${shortCommit}
                                    POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
                                    POSTGRES_USER=${POSTGRES_USER}
                                    POSTGRES_DB=${POSTGRES_DB}
                                    DB_USER=${DB_USER}
                                    DB_PASSWORD=${DB_PASSWORD}
                                    DB_URL=${DB_URL}
                                    JWT_KEY=${JWT_KEY}
                                    EMAIL_USER=${EMAIL_USER}
                                    EMAIL_PASSWORD=${EMAIL_PASSWORD}
                                    STRIPE_API_KEY=${STRIPE_API_KEY}
                                    STRIPE_WEBHOOK_KEY=${STRIPE_WEBHOOK_KEY}
                                    CLIENT_BASE_URL=${CLIENT_BASE_URL}
                                """.stripIndent()

                                sh """
                                    echo "$DOCKER_PASS" | docker login registry.praksa.abhapp.com \
                                        --username "$DOCKER_USER" --password-stdin

                                    docker compose -f docker-compose-imad.yml pull
                                    docker compose -f docker-compose-imad.yml up -d
                                """
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            deleteDir()
        }

        success {
            script {
                if (!env.CHANGE_ID && env.BRANCH_NAME == 'develop') {
                    def shortCommit = env.GIT_COMMIT.take(7)
                    withCredentials([
                        string(credentialsId: 'slack-bot-token', variable: 'SLACK_TOKEN')
                    ]) {
                        sh """
                            curl -X POST https://slack.com/api/chat.postMessage \
                                -H "Authorization: Bearer $SLACK_TOKEN" \
                                -H "Content-type: application/json" \
                                --data '{
                                    "channel": "#jenkins-test",
                                    "text": "*Build Succeeded* for `${env.BRANCH_NAME}` (`${shortCommit}`)"
                                }'
                        """
                    }
                }
            }
        }

        failure {
            script {
                if (!env.CHANGE_ID && env.BRANCH_NAME == 'develop') {
                    def shortCommit = env.GIT_COMMIT.take(7)
                    withCredentials([
                        string(credentialsId: 'slack-bot-token', variable: 'SLACK_TOKEN')
                    ]) {
                        sh """
                            curl -X POST https://slack.com/api/chat.postMessage \
                                -H "Authorization: Bearer $SLACK_TOKEN" \
                                -H "Content-type: application/json" \
                                --data '{
                                    "channel": "#jenkins-test",
                                    "text": ":x: *Build Failed* for `${env.BRANCH_NAME}` (`${shortCommit}`)"
                                }'
                        """
                    }
                }
            }
        }
    }
}

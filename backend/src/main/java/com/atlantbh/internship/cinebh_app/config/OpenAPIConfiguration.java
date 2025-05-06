package com.atlantbh.internship.cinebh_app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfiguration {
    @Bean
    public OpenAPI defineOpenApi() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("Imad Huremovic");
        myContact.setEmail("imad.huremovic@gmail.com");

        Info information = new Info()
                .title("Web-based ticketing application API")
                .version("1.0")
                .description("Web-based ticketing application that allows online movie ticket purchases for a specific movie company with multiple subsidiaries across the country/world.")
                .contact(myContact);
        return new OpenAPI().info(information).servers(List.of(server));
    }
}

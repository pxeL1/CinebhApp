export default function getDefaultMovie() {
    return {
        id: 0,
        genres: [
            {
                id:0,
                genre: {
                    id: 0,
                    name: 'No genre'
                }
            }
        ],
        duration: '',
        images: [
            {
                id: 0,
                url: "https://firebasestorage.googleapis.com/v0/b/cinebhapp-storage.firebasestorage.app/o/noimage.jpg?alt=media&token=04894a36-251b-4a09-ba23-3ea1cda92119",
                coverPhoto: true
            }

        ],
        name: '',
        endDate: '',
        language: '',
        startDate: '',
        pgRating: '',
        status: '',
        synopsis: '',
        trailer: ''}
}
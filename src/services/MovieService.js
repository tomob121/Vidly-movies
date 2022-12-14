import http from './httpService'
import { getGenres } from './GenreService'

const apiEndPoint = 'http://localhost:3000/api/movies/'

export async function getMovies() {
    const { data } = await http.get(apiEndPoint)
    return data
}

export async function deleteMovie(id) {
    const { data } = await http.delete(apiEndPoint + id)
    return data
}

export async function getMovie(id) {
    const { data } = await http.get(apiEndPoint + id)
    return data
}

export async function saveMovie(movie) {
    let movieind = {
        title: movie.title,
        genreId: movie.genre,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
    }

    if (movie._id)
        return await http.put(apiEndPoint + movie._id, movieind)

    return await http.post(apiEndPoint, movieind)
}
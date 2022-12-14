import http from './httpService'

const apiEndPoint = 'http://localhost:3000/api/genres'

export async function getGenres() {
    const { data } = await http.get(apiEndPoint)
    return data
}


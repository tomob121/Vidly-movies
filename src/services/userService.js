import http from './httpService'

const apiEndPoint = 'http://localhost:3000/api/users'


export async function registerUser(user) {
    const result = await http.post(apiEndPoint, {
        email: user.username,
        name: user.name,
        password: user.password
    })
    return result
}
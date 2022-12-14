import http from './httpService'
import jwtDecode from 'jwt-decode';

const loginApiEndPoint = 'http://localhost:3000/api/auth'

const tokenKey = 'token'

http.setJwt(getJwt())

export async function login(email, password) {
    const { data: jwt } = await http.post(loginApiEndPoint, { email, password })
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) { return null }
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}
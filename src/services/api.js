import axios from '../utils/axios-customize';

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

export const getUserWithPaginate = (currentPage, pageSize) => {
    return axios.get(`/api/v1/user?current=${currentPage}&pageSize=${pageSize}`)
}
export const getFilterUser = (currentPage, pageSize, fullName, email, phone) => {
    return axios.get(`/api/v1/user?current=${currentPage}&pageSize=${pageSize}&fullName=/${fullName}/i&email=/${email}/i&phone=/${phone}/i`)
}
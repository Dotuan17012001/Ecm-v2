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

export const getUserWithPaginate= (query) => {
    return axios.get(`/api/v1/user?${query}`)
}

export const createNewUser= (fullName, password, email, phone) => {
    return axios.post(`/api/v1/user`,{fullName, password, email, phone})
}

export const createUserImportBulk= (array) => {
    return axios.post(`/api/v1/user/bulk-create`,array)
}

export const callUpdateUser= (_id, fullName, phone) => {
    return axios.put(`/api/v1/user`,{_id, fullName, phone})
}

export const callDeleteUser= (_id) => {
    return axios.delete(`/api/v1/user/${_id}`)
}

export const callGetBookWithPaginate= (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const callFetchCategory= () => {
    return axios.get(`/api/v1/database/category`)
}

export const callUploadImageBook= (fileImg) => {
    let bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg); 
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
        "Content-Type": "multipart/form-data",
        "upload-type": "book"
        },
    });
}

export const createNewBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post(`/api/v1/book`,{thumbnail, slider, mainText, author, price, sold, quantity, category})
}

export const callUpdateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`,{thumbnail, slider, mainText, author, price, sold, quantity, category})
}

export const callDeleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`)
}

export const getBookCategory = () => {
    return axios.get(`/api/v1/database/category`)
}

export const getListBookWithPaginate = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const callGetDetailBook = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}

export const callCreateOrder = (data) => {
    return axios.post(`/api/v1/order`,{...data})
}

export const getHistoryOrder = () => {
    return axios.get(`/api/v1/history`)
}

export const callUploadImageAvatar = (fileImg) => {
    let bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg); 
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
        "Content-Type": "multipart/form-data",
        "upload-type": "avatar"
        },
    });
}


export const callUpdateInfoUser = (_id, phone , fullName, avatar) => {
    return axios.put(`/api/v1/user`,{ _id, phone , fullName, avatar})
}

//optional parameter
// export const callUpdateInfoUser = (_id, phone , fullName, avatar) => {
    //     return axios.put(`/api/v1/user`,{ _id, phone , fullName, ...(avatar ? {avatar:avatar} : {})})
    // }
    
export const callChangePassword = (email, oldpass, newpass) => {
    return axios.post(`/api/v1/user/change-password`,{email, oldpass, newpass})
}

export const callGetListOrderWithPaginate = (query) => {
    return axios.get(`/api/v1/order?${query}`)
}

export const callGetDashboard = () => {
    return axios.get(`/api/v1/database/dashboard`)
}
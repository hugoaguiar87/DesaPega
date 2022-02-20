import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';

const Api_BASEURL = 'http://localhost:5000/api'

const postSingIn = async (email, password) => {
    const body = qs.stringify({
        email,
        password
    })

    const req = await 
        axios.post(`${Api_BASEURL}/user/signin`, body)
        .then(res => {return res.data})
        .catch(err => {return err})

    return req
}

const postSingUp = async (email, password, state_id, name) => {
    const body = qs.stringify({
        email, password, state_id, name
    })

    const req = await
        axios.post(`${Api_BASEURL}/user/signup`, body)
        .then(res => {return res.data})
        .catch(err => {return err})

    return req
}

const getStates = async () => {
    const req = await 
        axios.get(`${Api_BASEURL}/states`)
            .then(res => {return res.data})
            .catch(err => {return err})
    
    return req
}

const getCategories = async () => {
    const req = await 
        axios.get(`${Api_BASEURL}/categories`)
            .then(res => {return res.data})
            .catch(err => {return err})

    return req
}

const getAds = async () => {
    const req = await 
        axios.get(`${Api_BASEURL}/ads/list`)
            .then(res => {return res.data})
            .catch(err => {return err})

    return req
}

const getAdItem = async (id, other) => {
    const req = await 
        axios.get(`${Api_BASEURL}/ads/${id}${(other) ? `?other=${other}` : ''}`)
            .then(res => {return res.data})
            .catch(error => {return {error}})
    
    return req
}

const postAd = async (body) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const req = await 
        axios.post(`${Api_BASEURL}/ads/create`, body, header)
            .then(res => res.data)
            .catch(err => err)
    
    return req
}

const getUserInfos = async () => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const req = await 
        axios.get(`${Api_BASEURL}/user/me`, header)
        .then(res => res.data)
        .catch(error => error)

    return req
}

const putUserInfos = async (email = null, name = null, password = null) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const body = qs.stringify({
        name, email, password
    })

    const req = await
        axios.put(`${Api_BASEURL}/user/me`, body, header)
            .then(res => res.data)
            .catch(error => error)
    
    return req
}

const postEditAd = async (adId, body) =>{
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    
    const req = await
        axios.post(`${Api_BASEURL}/ads/${adId}`, body, header)
            .then(res => res.data)
            .catch(err => err)

    return req
}

const delImg = async (id_image) => {
    let token = Cookies.get('token')
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const req = await
        axios.delete(`${Api_BASEURL}/ads/image/${id_image}`, header)
            .then(res => res.data)
            .catch(err => err)
    
    return req
}

export const requestApi = {
    login: async (email, password) => {
        return await postSingIn(email, password)
    },

    register: async(email, password, state_id, name) => {
        return await postSingUp(email, password, state_id, name)
    },

    states: async () => {
        return await getStates()
    },

    categories: async () => {
        return await getCategories()
    },

    adsList: async () => {
        return await getAds()
    },

    adItem: async (id, other = null) => {
        return await getAdItem(id, other)
    },

    createAd: async (body) => {
        return await postAd(body)
    },

    userInfos: async () => {
        return await getUserInfos()
    },

    editUser: async (email, name, password) => {
        return await putUserInfos(email, name, password)
    },

    editAd: async (adId, body) => {
        return await postEditAd(adId, body)
    },

    deleteImage: async (id_image) => {
        return await delImg(id_image)
    }
}
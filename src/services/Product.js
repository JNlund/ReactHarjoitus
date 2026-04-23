import axios from "axios"

// const baseUrl = "https://localhost:7229/api/products" 
const baseUrl = "https://jnbackendcareeria-bmf2ejavbecyc3aq.canadacentral-01.azurewebsites.net/api/products"

const getAll = (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    return axios.get(baseUrl, config)
}

const create = (newProduct, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    return axios.post(baseUrl, newProduct, config)
}

const remove = (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (id, newObject, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    return axios.put(`${baseUrl}/${id}`, newObject, config)
}

export default { getAll, create, remove, update }
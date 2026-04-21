import axios from 'axios'

const baseUrl = "https://localhost:5174/api/authentication"
//const baseUrl = "https://nwbackendsimo.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }
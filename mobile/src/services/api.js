import axios from 'axios'


const api = axios.create({
    baseURL:'http://192.168.15.14:5555'
})

export default api
import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 1000 * 20
    })

    instance.interceptors.request.use(config => {
        config.headers['X-Access-Token'] = window.sessionStorage.getItem('token')
        return config
    })

    instance.interceptors.response.use(res => {
        return res
    })

    return instance(config)
}
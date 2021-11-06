export default class Auth {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    async login(params) {
        return await this.axios.post(`${this.url}/auth/login`, params);
    }

}
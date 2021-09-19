export default class Waiters {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getCategories() {
        return await  this.axios.get(`${this.url}categories/`);
    }

    async getMenuItems() {
        return await  this.axios.get(`${this.url}menu-items/`);
    }

    async createAccount(params) {
        return await this.axios.post(`${this.url}accounts`, params);
    }

    async createOrders(params) {
        return await this.axios.post(`${this.url}orders`, params);
    }

}
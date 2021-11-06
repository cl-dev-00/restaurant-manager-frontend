export default class Shared {

    constructor(axios, url) {
        this.axios = axios; 
        this.url = url;
    }

    async getOrdersUndone() {
        return await this.axios.get(`${this.url}/orders`);
    }

    async getCategories() {
        return await  this.axios.get(`${this.url}/categories`);
    }

    async getMenuItems() {
        return await  this.axios.get(`${this.url}/menu-items`);
    }

    async changeStateOrder(id) {
        return await this.axios.put(`${this.url}/orders/${id}/changeState`, {});
    }

}
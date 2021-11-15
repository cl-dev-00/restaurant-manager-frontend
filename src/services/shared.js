export default class Shared {

    constructor(axios, url) {
        this.axios = axios; 
        this.url = url;
    }

    async getOrders() {
        return await this.axios.get(`${this.url}/orders`, {
            headers: {
                'date-current': new Date().toJSON().slice(0, 10),
            }
        });
    }

    async getCategories() {
        return await  this.axios.get(`${this.url}/categories`);
    }

    async getMenuItems() {
        return await  this.axios.get(`${this.url}/menu-items`);
    }

    async getEmployee(id) {
        return await this.axios.get(`${this.url}/employees/${id}`);
    }

    async changeStateOrder(id, importe = 0) {
        return await this.axios.put(`${this.url}/orders/${id}/changeState`, {
            importe,
        });
    }

}
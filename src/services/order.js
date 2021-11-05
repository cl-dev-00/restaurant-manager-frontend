export default class Order {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getMenuItemsAvailable() {
        return await  this.axios.get(`${this.url}/menu-items/available`);
    }
    
    async getTablesAvailable() {
        return await  this.axios.get(`${this.url}/tables/available`);
    }

    async getOrder(id) {
        return await this.axios.get(`${this.url}/orders/${id}`);
    }

    async createOrder(params) {
        return await this.axios.post(`${this.url}/orders`, params);
    }

    async updateOrder(params, id) {
        return await this.axios.put(`${this.url}/orders/${id}`, params);
    }

}
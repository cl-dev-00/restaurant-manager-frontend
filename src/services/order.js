export default class Order {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getCategories() {
        return await  this.axios.get(`${this.url}/categories/`);
    }

    async getMenuItems(idComercial) {
        return await  this.axios.get(`${this.url}/menu-items/available/commercial/${idComercial}`);
    }
    
    async getMenuItemsAvailable(idComercial) {
        return await  this.axios.get(`${this.url}/menu-items/commercial/${idComercial}`);
    }

    async getTablesAvailable(idComercial) {
        return await  this.axios.get(`${this.url}/tables/available/commercial/${idComercial}`);
    }

    async createOrder(params) {
        return await this.axios.post(`${this.url}/orders`, params);
    }

    async createOrderDetails(params) {
        return await this.axios.post(`${this.url}/order-details`, params);
    }

}
export default class KitchenRoom {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    getOrdersUndone() {
        return this.axios.get(`${this.url}/orders/undone`);    
    }
    
    getOrdersWithPaying() {
        return this.axios.get(`${this.url}/orders/without-paying`);    
    }

    getOrder(id) {
        return this.axios.get(`${this.url}/orders/${id}`);    
    }
    
    updateOrder(id, params) {
        return this.axios.put(`${this.url}/orders/${id}`, params);    
    }

}
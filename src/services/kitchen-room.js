export default class KitchenRoom {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    getOrdersUndone(idComercial) {
        return this.axios.get(`${this.url}/orders/undone/${idComercial}`);    
    }
    
    getOrdersWithPaying(idComercial) {
        return this.axios.get(`${this.url}/orders/without-paying/${idComercial}`);    
    }

    getOrder(id) {
        return this.axios.get(`${this.url}/orders//${id}`);    
    }
    
    updateOrder(id, params) {
        return this.axios.put(`${this.url}/orders/${id}`, params);    
    }

}
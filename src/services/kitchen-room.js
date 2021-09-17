export default class KitchenRoom {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    getAccounts() {
        return this.axios.get(this.url + 'accounts');    
    }

    getAccount(id) {
        return this.axios.get(`${this.url}accounts/${id}`);    
    }
    
    updateAccount(id, params) {
        return this.axios.put(`${this.url}accounts/${id}`, params);    
    }

}
export default class Manager {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getEmployees() {
        return await this.axios.get(`${this.url}/employees`);
    }

    async createEmployee(payload) {
        
        return await this.axios.post(`${this.url}/employees`, payload);
    }
    
    async updateEmployee(id, payload) {
        return await this.axios.put(`${this.url}/employees/${id}`, payload);
    }
    
    async deleteEmployee(id) {
        return await this.axios.delete(`${this.url}/employees/${id}`);
    }
    
    async getRoles() {
        return await this.axios.get(`${this.url}/roles`);
    }

    async getMenuItem(id) {
        return await this.axios.get(`${this.url}/menu-items/${id}`);
    }
    
    async createMenuItem(payload) {
        return await this.axios.post(`${this.url}/menu-items`, payload);
    }

    async updateMenuItem(id, payload) {
        return await this.axios.put(`${this.url}/menu-items/${id}`, payload);
    }

    async deleteMenuItem(id) {
        return await this.axios.delete(`${this.url}/menu-items/${id}`);
    }

    async createCategory(params) {
        return await  this.axios.post(`${this.url}/categories`, params);
    }

    async updateCategory(id, params) {
        return await  this.axios.put(`${this.url}/categories/${id}`, params);
    }

    async deleteCategory(id) {
        return await  this.axios.delete(`${this.url}/categories/${id}`);
    }

    async getTables() {
        return await  this.axios.get(`${this.url}/tables`);
    }

    async getTable(id) {
        return await  this.axios.get(`${this.url}/tables/${id}`);
    }

    async createTable(params) {
        return await  this.axios.post(`${this.url}/tables`, params);
    }

    async updateTable(id, params) {
        return await  this.axios.put(`${this.url}/tables/${id}`, params);
    }

    async deleteTable(id) {
        return await  this.axios.delete(`${this.url}/tables/${id}`);
    }

}
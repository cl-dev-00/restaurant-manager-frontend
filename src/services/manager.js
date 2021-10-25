export default class Manager {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getEmployees() {
        const employees = await this.axios.get(`${this.url}/employees`);

        return employees;
    }

    async getEmployee(id) {
        const employee = await this.axios.get(`${this.url}/employees/${id}`);

        return employee;
    }

    async createEmployee(payload) {
        const employee = await this.axios.post(`${this.url}/employees`, payload);

        return employee;
    }

    async updateEmployee(id, payload) {
        const employee = await this.axios.put(`${this.url}/employees/${id}`, payload);

        return employee;
    }

    async deleteEmployee(id) {
        const response = await this.axios.delete(`${this.url}/employees/${id}`);

        return response;
    }

    async getRoles() {
        const roles = await this.axios.get(`${this.url}/roles`);

        return roles;
    }

    async getCategory(id) {
        const category = await this.axios.get(`${this.url}/categories/${id}`);
    
        return category;
    }

}
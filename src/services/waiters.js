export default class Waiters {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getCategories() {
        return await  this.axios.get(`${this.url}categories/`);
    }

}
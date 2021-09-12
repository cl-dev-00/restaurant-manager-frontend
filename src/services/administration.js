export default class Administration {

    constructor(Axios, urlBase) {
        this.axios = Axios;
        this.urlBase = urlBase;
        this.url = urlBase + 'categories';
    }

    async getCategories() {
        const categories = await this.axios.get(this.url);

        return categories;
    }
    
    async getCategory(id) {
        const category = await this.axios.get(`${this.url}/${id}`);
    
        return category;
    }

}
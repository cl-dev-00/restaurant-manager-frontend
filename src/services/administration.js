export default class Administration {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    async getCategories() {
        return [{
            
        }];
    }
    
    async getCategory(id) {
        const category = await this.axios.get(`${this.url}categories/${id}`);
    
        return category;
    }

}
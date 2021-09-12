export default class Waiters {

    constructor(Axios, urlBase) {
        this.axios = Axios;
        this.urlBase = urlBase;
        this.url = '';
    }

}
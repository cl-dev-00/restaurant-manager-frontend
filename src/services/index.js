import Axios from 'axios';

import Administration from './administration';
import Cashier from './cashier';
import KitchenRoom from './kitchen-room';
import Waiters from './waiters';

Axios.defaults.headers.common.Accept = "application/json";

const url = 'http://localhost:4000/api/';

export default {
    administration: new Administration(Axios, url),
    cashier: new Cashier(Axios, url),
    kitchenRoom: new KitchenRoom(Axios, url),
    waiters: new Waiters(Axios, url),
}
import Axios from 'axios';

import Administration from './administration';
import Orders from './order';
import KitchenRoom from './kitchen-room';

Axios.defaults.headers.common.Accept = "application/json";

const url = 'http://localhost:4000/api/';

export default {
    administration: new Administration(Axios, url),
    orders: new Orders(Axios, url),
    kitchenRoom: new KitchenRoom(Axios, url),
}
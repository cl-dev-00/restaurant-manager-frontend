import Axios from 'axios';

import Administration from './administration';
import Orders from './order';
import KitchenRoom from './kitchen-room';
import SocketioService from './socketio.service';


Axios.defaults.headers.common.Accept = "application/json";

const url = 'http://localhost:4000/api';

export default {
    administration: new Administration(Axios, url),
    orders: new Orders(Axios, url),
    kitchenRoom: new KitchenRoom(Axios, url),
    socketioService: new SocketioService('http://localhost:4000')
}
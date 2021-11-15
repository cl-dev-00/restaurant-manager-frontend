import Axios from 'axios';

import Auth from './auth';
import Manager from './manager';
import Orders from './order';
import KitchenRoom from './kitchen-room';
import Shared from './shared';
import SocketioService from './socketio.service';

import store from '../store/index';

Axios.defaults.headers.common.Accept = "application/json";

// Axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('access_token');

//         if(token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     error => Promise.reject(error)
// );

Axios.interceptors.request.use(
    config => {
        const nivel_usuario = store.getters.user?.role?.user_level?.nivel_usuario;

        if(nivel_usuario) {
            config.headers.nivel_usuario = nivel_usuario;
        }

        return config;
    },
    error => Promise.reject(error)
);


let url = '';

if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:4000/api';
} else {
    url = 'https://restaurant-manager-cl.herokuapp.com/';
}

console.log(url)


export default {
    auth: new Auth(Axios, url),
    manager: new Manager(Axios, url),
    orders: new Orders(Axios, url),
    kitchenRoom: new KitchenRoom(Axios, url),
    shareds: new Shared(Axios, url),
    socketioService: new SocketioService('http://localhost:4000')
}
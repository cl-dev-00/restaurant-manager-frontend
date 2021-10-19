import Home from '../views/Home.vue'
import About from '../views/Home.vue'
import Administration from '../views/administration/Administration.vue'
import Orders from '../views/orders/Orders.vue'
import KitchenRoom from '../views/kitchen-room/KitchenRoom.vue'

import MenuConfig from '../views/administration/MenuConfig.vue'

import Login from '../views/login/Login.vue'

const routersInfo = {
    home: {
        path: '/',
        name: 'Home',
        component: Home
    },
    about: {
        path: '/about',
        name: 'About',
        component: About
    }, 
    administration: {
        path: '/administration',
        name: 'Administration',
        component: Administration
    }, 

    menuconfig: {
        path: '/menu-configuration',
        name: 'MenuConfig',
        component: MenuConfig
    },

    orders: {
        path: '/orders',
        name: 'Orders',
        component: Orders
    }, 
    kitchenroom: {
        path: '/kitchen-room',
        name: 'KitchenRoom',
        component: KitchenRoom
    }, 
    Login: { 
        path: '/login',
        name: 'Login',
        component: Login
    },
};

export default routersInfo;
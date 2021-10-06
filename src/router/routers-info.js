import Home from '../views/Home.vue'
import About from '../views/Home.vue'
import Administration from '../views/administration/Administration.vue'
import Orders from '../views/orders/Orders.vue'
import KitchenRoom from '../views/kitchen-room/KitchenRoom.vue'

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
    order: {
        path: '/orders',
        name: 'Orders',
        component: Orders
    }, 
    kitchenroom: {
        path: '/kitchen-room',
        name: 'KitchenRoom',
        component: KitchenRoom
    }, 
    
};

export default routersInfo;
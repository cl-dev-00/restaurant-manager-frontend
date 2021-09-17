import Home from '../views/Home.vue'
import About from '../views/Home.vue'
import Administration from '../views/administration/Administration.vue'
import Cashier from '../views/cashier/Cashier.vue'
import KitchenRoom from '../views/kitchen-room/KitchenRoom.vue'
import Waiters from '../views/waiters/Waiters.vue'

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
    cashier: {
        path: '/cashier',
        name: 'Cashier',
        component: Cashier
    }, 
    kitchenroom: {
        path: '/kitchen-room',
        name: 'KitchenRoom',
        component: KitchenRoom
    }, 
    waiters: {
        path: '/waiters',
        name: 'Waiters',
        component: Waiters
    }, 
    
};

export default routersInfo;
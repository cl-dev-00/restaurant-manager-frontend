import store from '../store/index.js';

export function authorization(to, from, next) {

    const { user, isLoggedIn } = store.getters;

    if (!user || !isLoggedIn) {
        return next('/login');
    }

    if (to.path.includes('manager') && user.role.user_level.nivel_usuario !== 2) {
        return next('/');
    }
    if (to.path.includes('orders') && user.role.user_level.nivel_usuario !== 3 && user.role.user_level.nivel_usuario !== 4) {
        return next('/');
    }
    if (to.path.includes('kitchen-room') && user.role.user_level.nivel_usuario !== 5) {
        return next('/');
    }
    if (to.path.includes('login') && user) {
        return next('/');
    }

    next();
}

export function loggedIn(to, from, next) {

    const { user, isLoggedIn } = store.getters;

    if(user && isLoggedIn) {
        next('/');
    }

    next();
}
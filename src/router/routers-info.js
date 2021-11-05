import Home from '../views/Home.vue'
import Login from '../views/login/Login.vue'
import Orders from '../views/orders/Orders.vue'
import OrderEdit from '../views/orders/OrderEdit.vue'
import KitchenRoom from '../views/kitchen-room/KitchenRoom.vue'
import Categories from '../views/manager/Categories.vue'
import Manager from '../views/manager/Manager.vue'
import Employees from '../views/manager/employees/Employees.vue'
import EmployeeAddOrEdit from '../views/manager/employees/EmployeeAddOrEdit.vue'
import MenuItems from '../views/manager/menu-items/MenuItems.vue'
import MenuItemAddOrEdit from '../views/manager/menu-items/MenuItemAddOrEdit.vue'
import Tables from '../views/manager/tables/Tables.vue'
import TableAddOrEdit from '../views/manager/tables/TableAddOrEdit.vue'
import Taxes from '../views/manager/taxes/Taxes.vue'
import TaxeAddOrEdit from '../views/manager/taxes/TaxeAddOrEdit.vue'

import { authorization, loggedIn } from '../middlewares/authorization'


const routersInfo = {
    home: {
        path: '/',
        name: 'Home',
        component: Home,
    },
    Login: {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: loggedIn,
    },
    orders: {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        beforeEnter: authorization,
        title: 'Modulo de Ordenes',

    },
    orderEdit: {
        path: '/orders/:id/edit',
        name: 'OrderEdit',
        component: OrderEdit,
        beforeEnter: authorization,
    },
    kitchenroom: {
        path: '/kitchen-room',
        name: 'KitchenRoom',
        component: KitchenRoom,
        beforeEnter: authorization,
        title: 'Modulo de Cocina',

    },
    manager: {
        path: '/manager',
        name: 'manager',
        component: Manager,
        beforeEnter: authorization,
        title: "Inicio",

    },
    categories: {
        path: '/manager/categories',
        name: 'Categories',
        component: Categories,
        beforeEnter: authorization,
        title: "Lista de categorias",

    },
    employees: {
        path: '/manager/employees',
        name: 'Employees',
        component: Employees,
        beforeEnter: authorization,
        title: "Lista de empleados",

    },
    employeeCreate: {
        path: '/manager/employees/create',
        name: 'EmployeeAdd',
        component: EmployeeAddOrEdit,
        beforeEnter: authorization,
        title: "Agregar nuevo empleado",

    },
    employeeEdit: {
        path: '/manager/employees/:id/edit',
        name: 'EmployeeEdit',
        component: EmployeeAddOrEdit,
        beforeEnter: authorization,
        title: 'Editar información del empleado',

    },
    menuItems: {
        path: '/manager/menu-items',
        name: 'MenuItems',
        component: MenuItems,
        beforeEnter: authorization,
        title: "Lista de items del menu",

    },
    menuItemCreate: {
        path: '/manager/menu-items/create',
        name: 'MenuItemAdd',
        component: MenuItemAddOrEdit,
        beforeEnter: authorization,
        title: "Agregar nuevo item al menu",

    },
    menuItemEdit: {
        path: '/manager/menu-items/:id/edit',
        name: 'MenuItemEdit',
        component: MenuItemAddOrEdit,
        beforeEnter: authorization,
        title: 'Editar información del item del menu',

    },
    tables: {
        path: '/manager/tables',
        name: 'Tables',
        component: Tables,
        beforeEnter: authorization,
        title: "Lista de mesas de la sucursal",

    },
    tableCreate: {
        path: '/manager/tables/create',
        name: 'TableAdd',
        component: TableAddOrEdit,
        beforeEnter: authorization,
        title: "Agregar nueva mesa",

    },
    tableEdit: {
        path: '/manager/tables/:id/edit',
        name: 'TableEdit',
        component: TableAddOrEdit,
        beforeEnter: authorization,
        title: "Editar información de la mesa",

    },
    taxes: {
        path: '/manager/taxes',
        name: 'Taxes',
        component: Taxes,
        beforeEnter: authorization,
        title: "Lista de los impuestos",

    },
    taxeCreate: {
        path: '/manager/taxes/create',
        name: 'TaxeAdd',
        component: TaxeAddOrEdit,
        beforeEnter: authorization,
        title: "Agregar nuevo impuesto",

    },
    taxeEdit: {
        path: '/manager/taxes/:id/edit',
        name: 'TaxeEdit',
        component: TaxeAddOrEdit,
        beforeEnter: authorization,
        title: "Editar información del impuestos",

    },

};

export default routersInfo;
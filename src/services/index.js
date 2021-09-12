import Administration from './administration';
import Cashier from './cashier';
import KitchenRoom from './kitchen-room';
import Waiters from './waiters';

export default {
    administration: new Administration(),
    cashier: new Cashier(),
    kitchenRoom: new KitchenRoom(),
    waiters: new Waiters(),
}
import { io } from "socket.io-client";


class SocketioService {
    socket;
    constructor(url) {
        this.url = url;
        this.setupSocketConnection();
    }
  
    setupSocketConnection() {
      this.socket = io(this.url, {
        extraHeaders: {
          'idComercial': 1
        }
      });
    }

    sendOrderKitchroom(order) {
      this.socket.emit('/sockets/orders/sendOrderKitchroom', order);
    }

    doneOrder(order) {
      this.socket.emit('/sockets/orders/doneOrder', order);
    }

    getSendOrder(callback) {
      this.socket.on('/sockets/orders/sendNewOrder', (payload) => {
        callback(payload);
      });
    }

    getDoneOrder(callback) {
      this.socket.on('/sockets/orders/sendDoneOrder', (payload) => {
        callback(payload);
      });
    }

    getChangeMenuItems(callback) {
      this.socket.on('/sockets/menu-items/changeState', (payload) => {
        callback(payload);
      })      
    }

    changeDoneOrderDetail(id) {
      this.socket.emit('/sockets/order-details/changeDoneOrderDetail', id);
    }

    changeStateMenuItems(menuItems = []) {
      this.socket.emit('/sockets/menu-items/update', menuItems);
    }

  }
  
  export default SocketioService;
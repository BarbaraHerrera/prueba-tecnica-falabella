var Logger = require('../utils/Logger');
var logger = new Logger().getInstance();

class Order
{
    /**
     * 
     * @param {string} orderId  Numero de la orden de compra
     * @param {string} rutUser  Rut del usuario asociado a la compra
     * @param {string} productList Detalle del producto
     */
    constructor(orderId, rutUser, productList)
    {
        this.orderId = orderId;
        this.rutUser = rutUser;
        this.productList = productList;
    }
}
module.exports = Order;
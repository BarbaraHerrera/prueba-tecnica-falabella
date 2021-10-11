var Logger = require('../utils/Logger');
var logger = new Logger().getInstance();

class Product{
    /**
     * 
     * @param {string} productName Nombre del producto
     * @param {string} productId Numero identificador del producto 
     * @param {string} description Detalle del producto
     * @param {string} stock Cantidad del producto
     */
    constructor(productName, productId, description, stock)
   {
       this.productName= productName;
       this.productId= productId;
       this.description= description;
       this.stock= stock;

       logger.log(`Agregando Producto ${productName} con ID: ${productId} `)

   } 
}

module.exports = Product;
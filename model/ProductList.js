class ProductList{
    /**
     * 
     * @param {string} productId Numero identificador del producto
     * @param {int} quantity cantidad restante del producto
     */
    constructor(productId, quantity)
    {
        this.productId= productId;
        this.quantity= quantity;
    }
}
module.exports = ProductList;
var expect = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
var axios = require('axios');
let Product = require('../../../../model/Product');
require('mocha-allure-reporter');

/**
 * Metodo que ejecuta test cases para los escenarios de productos
 */
function suite(){

    var product;
    var url;
    //var product2;

    before(function(){
        chai.use(chaiHttp)
        url = 'http://localhost:8080';
        product = new Product('Nintendo Switch', '2', 'La mejor consola', '5');
        //product2 = new Product('Nintendo LTE', '2', 'La mejor consola', '5');
    })

    const getProducts = allure.createStep('Productos Paso 1 - Consultar producto', async () => {
        chai.request(url)
        .get('/products')
        .end(function(err, res){
            expect(res).to.have.status(200);
            if(err){
                throwError(err);
            }
        });
        
    });

    const addProducts = allure.createStep('Productos Paso 2 - Agregar producto exitosamente', async (done) => {
        chai.request(url)
        .post('/products')
        .send(product)
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
            if(err){
                throwError(err);
            }
        });
    });

    const getProductDetails = allure.createStep('Productos Paso 3 - Validar producto añadido previamente', async (done) => {
        chai.request(url)
        .post('/products')
        .send(product)
        .end(function(err, res){
            expect(res).to.have.status(500);
            done();
            if(err){
                throwError(err);
            }
        });
    });

    const throwError = allure.createStep("Detalle del test erroneo", (err) => {
        throw new Error(err);
      });


    it('Consulta exitosa de productos', function()
    {
        getProducts();
    });

    it('Producto agregado correctamente', function(done)
    {
        addProducts(done)
    })

    it('Validar producto añadido previamente', function(done)
    {
        getProductDetails(done);
    });
   
}

module.exports = suite;
var expect = require('chai').expect;
var axios = require('axios');
var chai = require('chai');
var chaiHttp = require('chai-http');
const ProductList = require('../../../../model/ProductList');
let Order = require('../../../../model/Order');
require('mocha-allure-reporter');


/**
 * Metodo que ejecuta test cases para los escenarios de ordenes
 */
function suite(){
    var productList;
    var list;
    var order;
    var url;

    before(function(){
         chai.use(chaiHttp)
         url = 'http://localhost:8080';
         productList = new ProductList('1','1');
         list = new Array();
         order = new Order('01', '18.188.222-0', list);

         list.push(productList);
    })

    const getDetails = allure.createStep('Crear orden de compra', async(done)=> {

          axios.post('http://localhost:8080/orders',  order).then(res =>{
            expect(res.status).to.equal(200);
            done();
        })
        .catch(err =>{
            throwError(err);
            done(err);
        });

    });

    const getStock = allure.createStep('Obtener alerta de producto sin stock', async(done) => 
    {
        
        chai.request(url).post('/orders',  order).then(res =>{
        expect(res.status).to.equal(500);
        done();
        })
        .catch(err =>{
            throwError(err);
            done(err);
        });
        
    });

    const throwError = allure.createStep("Detalle del test erroneo", (err) => {
        throw new Error(err);
      });

    it('Crear detalle de orden', function(done){
        getDetails(done);
    });

    it('Producto Sin Stock', function(done){
        getStock(done);
    });


}

module.exports = suite;
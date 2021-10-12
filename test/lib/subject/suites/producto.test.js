var expect = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
var axios = require('axios');
let Product = require('../../../../model/Product');

/**
 * Metodo que ejecuta test cases para los escenarios de productos
 */
function suite(){

    var product;
    var url;

    before(function(){
        chai.use(chaiHttp)
        url = 'http://localhost:8080';
        product = new Product('Nintendo Switch', '2', 'La mejor consola', '5');
    })

    it('Consulta exitosa de productos', function(done)
    {
        chai.request(url)
        .get('/products')
        .end(function(err, res){
            expect(res).to.have.status(200);
            done();
        });
        
    });

    it('Producto agregado correctamente', function(done)
        {
            chai.request(url)
            .post('/products')
            .send(product)
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        })

        it('Validar producto añadido previamente', function(done){

            chai.request(url)
            .post('/products')
            .send(product)
            .end(function(err, res){
                expect(res).to.have.status(500);
                done();
            });
        });
   
}

module.exports = suite;
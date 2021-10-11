var expect = require('chai').expect;
var axios = require('axios');
const ProductList = require('../../../../model/ProductList');
let Order = require('../../../../model/Order');

function suite(){
    var productList;
    var list;
    var order;

    before(function(){
         productList = new ProductList('1','1');
         list = new Array();
         order = new Order('01', '18.188.222-0', list);

         list.push(productList);
    })

    it('Validar detalle de orden', function(done){
        
        
        axios.post('http://localhost:8080/orders',  order).then(res =>{
            expect(res.status).to.equal(200)
            done();
        })
        .catch(err =>{
            done(err)
        });
    });

    it('Producto Sin Stock', function(){

        axios.post('http://localhost:8080/orders',  order).then(res =>{
            expect(res.status).to.equal(500)
            done();
        })
        .catch(err =>{
            done(err)
        });

    });


}

module.exports = suite;
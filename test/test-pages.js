var expect = require('chai').expect;
var request = require('request');

describe('Test de aceptacion', function(){
    describe('Sitio Bubu', function(){
        it('Contenido principal de la pagina bubu', function(done)
        {
            request('http://localhost:8080', function(error, response, body)
            {
                expect(body).to.equal('Hello Bubus');
                done();
            });
        });


        it('Status del sitio', function(done)
        {
            request('http://localhost:8080', function(error, response, body)
            {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Sitio Bubu About', function(){
        it('Sobre el contenido del sitio', function(done)
        {
            request('http://localhost:8080/about', function(error, response,body)
            {
                expect(response.statusCode).to.equal(404)
                done();
            });
        });
    });
   
});
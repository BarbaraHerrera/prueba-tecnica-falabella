var expect = require('chai').expect;
var axios = require('axios');
let User = require('../../../../model/User');

require('mocha-allure-reporter');

/**
 * Metodo que ejecuta test cases para los escenarios de usuarios
 */
function suite(){    
    var user;

    before(function(){
        user = new User('Bubucela', '24.144.222-0', 'Casa 123', '4563212');
    });

    const testStep = allure.createStep("initial", () => {
       
    });

    it('Consulta exitosa de usuarios', async function()
    {
        let respuesta;
        const helloBubu = await axios.get('http://localhost:8080/users').then(res => respuesta = res);
        console.log('Respuesta Exitosa '+ respuesta.status);
        expect(respuesta.status).to.equal(200);  
        testStep();
    });
    
    it('Validar Usuario Agregado Exitosamente', function(done)
    {

        axios.post('http://localhost:8080/users', user).then(res => { 
        expect(res.status).to.equal(200);
        done();
        })
        .catch(err => {
            done(err);
        });
        
       
    });

    it('Validar Usuario Agregado Previamente', function()
    {
        
        axios.post('http://localhost:8080/users', user).then(res => { 
        expect(res.status).to.equal(500);
        console.log('STATUS'+res.status)
        done();
        })
        .catch(err => {
            done(err);
        });
        
    });

    

}

module.exports = suite;
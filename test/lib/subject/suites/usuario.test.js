var expect = require('chai').expect;
require('chai').should;
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

    const getEmpty = allure.createStep("Paso 0 - Consulta datos vacios", async (done) => {
            
        expect('').to.be.empty;
    });

    const getUser = allure.createStep("Paso 1 - Consultar usuarios", async () => {
        let respuesta;
        const helloBubu = await axios.get('http://localhost:8080/users').then(res => respuesta = res);
        console.log('Respuesta Exitosa '+ respuesta.status);
        expect(respuesta.status).to.equal(200);
    });

    const addUserWithSucess = allure.createStep("Paso 2 - Agregar usuário de manera exitosa", async (done) => {
            
        expect('').to.be.empty;
        await axios.post('http://localhost:8080/users', user).then(res => { 
            expect(res.status).to.equal(200);
            done();
            })
            .catch(err => {
                throwError(err);
                done(err);
            }); 
    });

    const addUserFailed = allure.createStep("Paso 3 - Validar usuario previamente agregado", async (done) => {
         await axios.post('http://localhost:8080/users', user).then(res => { 
            expect(res.status).to.equal(200);
            console.log('STATUS'+res.status)
            done();
            })
            .catch(err => {
                console.log('ERROR: STATUS'+err)
                done(err);
                throwError(err);
            });
    });

    const throwError = allure.createStep("Detalle del test erroneo", (err) => {
        throw new Error(err);
      });
    
     it('Consulta json vacio', async function()
      {
         getEmpty();
    });

    it('Consulta exitosa de usuarios', async function()
    {
       getUser();
    });
    
    it('Validar Usuario Agregado Exitosamente', function(done)
    {
        addUserWithSucess(done);       
    });

    it('Validar Usuario Agregado Previamente', function(done)
    {
        addUserFailed(done);
    });

}

module.exports = suite;
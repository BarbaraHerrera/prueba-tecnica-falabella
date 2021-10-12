var usuarioTest = require('./lib/subject/suites/usuario.test')
var productoTest = require('./lib/subject/suites/producto.test')
var ordenTest = require('./lib/subject/suites/orden.test')
/**
 * Test-Page
 * Suite principal de pruebas
 */
describe('Test de aceptacion', async function(){
    
    describe('Usuarios - Casos de prueba', usuarioTest.bind(this));

    describe('Productos - Casos de Prueba', productoTest.bind(this));

    describe('Ordenes - Casos de Prueba', ordenTest.bind(this));
 
});
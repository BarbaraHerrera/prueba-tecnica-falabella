var expect = require('chai').expect;
var request = require('request');
var axios = require('axios');
let users = require('../assets/json/user.json');
const ProductList = require('../model/ProductList');
var usuarioTest = require('./lib/subject/suites/usuario.test')
var productoTest = require('./lib/subject/suites/producto.test')
var ordenTest = require('./lib/subject/suites/orden.test')

describe('Test de aceptacion', async function(){
    
    describe('Usuarios - Casos de prueba', usuarioTest.bind(this));

    describe('Productos - Casos de Prueba', productoTest.bind(this));

    describe('Ordenes - Casos de Prueba', ordenTest.bind(this));
 
});
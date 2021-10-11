var Logger = require('../utils/Logger');
var logger = new Logger().getInstance();

class User{

    /**
     * 
     * @param {string} name Nombre del usuario 
     * @param {string} rut Rut identificador del usuario 
     * @param {string} address Direccion del usuario 
     * @param {string} phone Telefono del usuario
     */
    constructor(name, rut, address, phone)
    {
        this.name = name;
        this.rut = rut;
        this.address = address;
        this.phone =phone;

        logger.log(`Agregando usuario: ${name} con rut: ${rut}`)
    }
}

module.exports = User;
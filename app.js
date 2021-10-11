var express = require('express')
var app = express()
var bodyParser = require('body-parser')
let user = require('./assets/json/user.json')
let products = require('./assets/json/products.json')
let orders = require('./assets/json/orders.json')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userList = new Array(user);
let respuesta;
let respuesta2;
let respuesta3;

//USUARIOS
app.route('/users')
.get(function(req, res)
{
    res.setHeader('Content-Type', 'application/json');
    res.send(userList);
})
.post(function(req, res)
{

    if (!userList.find(e => e.rut == req.body.rut)){
        userList.push(req.body);
        respuesta = userList;

    } else {
        respuesta = {
            error : true,
            codigo : 500,
            mensaje : 'El usuario ya fue creado previamente'
        }
        res.status(500);
    }

    res.send(respuesta);
})

//PRODUCTOS
let productList = new Array(products);
app.route('/products').
get(function(req, res)
{
    res.setHeader('Content-Type', 'application/json');
    res.send(productList);
})
.post(function(req, res)
{
    if(!productList.find(p => p.productName == req.body.productName)){
        productList.push(req.body);
        respuesta2 = productList;
    }else {
        respuesta2 = {
            error : true,
            codigo : 500,
            mensaje : 'El producto ya fue añadido'
        }
        res.status(500);
    }
    res.send(respuesta2);
})

//ORDENES
let orderList = new Array();

app.route('/orders').
get(function(req, res)
{
    res.setHeader('Content-Type', 'application/json');
    res.send(orderList);
})
.post(function(req, res)
{
    var pList = req.body.productList;

   console.log('Lista de pList'+JSON.stringify(pList));


    console.log('Counnt '+pList.length);

    for (var i = 0 ; i < pList.length ; i++){

        let foundProd = productList.find(e => e.productId == pList[i].productId);

        var stock = foundProd.stock;

        if( stock >= pList[i].quantity){

            orderList.push(req.body);
            
            foundProd.stock = foundProd.stock - pList[i].quantity;
            
            respuesta3 = orderList;
        } else {
            respuesta3 = {
                error: true,
                statusCode: 500,
                mensaje: `No hay stock disponible del producto ${foundProd.productName}`
            }
        }
    }

    res.send(respuesta3);

})

app.listen(8080)
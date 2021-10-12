var express = require('express')
var app = express()
var bodyParser = require('body-parser')

let axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userList = new Array();


let respuestaUsers;
    
let respuestaProducto;
let respuestaOrden;

axios({
    method: "get",
    url: "http://localhost:3000/users",
  }).then(function(resp) {
    userList.push(resp.data);
});

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
        respuestaUsers = userList;

    } else {
        respuestaUsers = {
            error : true,
            codigo : 500,
            mensaje : 'El usuario ya fue creado previamente'
        }
        res.status(500);
    }

    res.send(respuestaUsers);
})

//PRODUCTOS
let productList = new Array();

axios({
    method: "get",
    url: "http://localhost:3000/products",
  }).then(function(resp) {
    productList.push(resp.data);
});

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
        respuestaProducto = productList;
    }else {
        respuestaProducto = {
            error : true,
            codigo : 500,
            mensaje : 'El producto ya fue añadido'
        }
        res.status(500);
    }
    res.send(respuestaProducto);
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

        if (foundProd) {
            var stock = foundProd.stock;
    
            if( stock >= pList[i].quantity){
    
                orderList.push(req.body);
                
                foundProd.stock = foundProd.stock - pList[i].quantity;
                
                respuestaOrden = orderList;
            } else {
                respuestaOrden = {
                    error: true,
                    statusCode: 500,
                    mensaje: `No hay stock disponible del producto ${foundProd.productName}`
                }
            }
        } else {
            respuestaOrden = {
                error: true,
                statusCode: 500,
                mensaje: `Producto no encontrado`
            }
        }

    }

    res.send(respuestaOrden);

})

app.listen(8080)
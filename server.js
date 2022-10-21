const express = require('express');
const app = express();
const routerProductos = require('./src/rutas/productos')
const routerCarritos = require('./src/rutas/carritos');

// const { Router } = require('express');
// const routerProductos = Router()
const productos = require('./public/productos.txt');
const carritos = require('./public/carritos.json')







// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarritos)



// Running server
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log("server running"))
server.on('error', error => console.log(error))
const { Router } = require ('express');
const routerProductos =  Router();
const { authMiddleware } = require('../middlewares/admin')

const Contenedor = require ('../contenedores/contenedor');
const contenedorProductos = new Contenedor('./public/productos.txt');

routerProductos.get('/', async (req, res) => {
    const productos = await contenedorProductos.getAll().catch()
    res.json({"La lista de productos es:": productos});
})

//Acá tengo que validar si el Producto es no encontrado ↓
 
routerProductos.get('/:id?', async (req, res) => {
    const { id } = req.params 
    const productos = await contenedorProductos.getAll().catch()
    const producto = await contenedorProductos.getById(id).catch()
    if( producto != null ){
    res.json( `El nombre del producto es ${producto.name} con un valor de $${producto.price} y Id:${producto.id}` )
    } else {
    res.send("Producto no encontrado")
    }
})

//Acá tengo que validar si el Producto es no encontrado ↑

routerProductos.post('/guardar', authMiddleware, async (req, res) => {
    const producto = req.body
    const productoNuevo = await contenedorProductos.save(producto).catch()
    res.json(`Se guardó el producto ${producto.name} con Id=${producto.id}`)
})

routerProductos.put('/:id', authMiddleware,async (req, res) => {
    const { id } = req.params
    const producto = req.body
    producto.id = parseInt(id);
    const productoAnt = await contenedorProductos.getById(id).catch()
    if( productoAnt != null){
        await contenedorProductos.modifyProducto(id, producto).catch()
        res.json(`Se modificó el producto ${productoAnt.name} por el producto ${producto.name}`)  
    } else {
        res.send("No se puede reemplazar el producto porque el id es inexistente. Producto no encontrado")
    }
})

routerProductos.delete('/:id', authMiddleware,async (req, res) =>{
    const {id} = req.params;
    const producto = await contenedorProductos.getById(id).catch()
    if( producto != null ){
        await contenedorProductos.deleteById(id).catch();
        res.json(`Se borró el producto ${producto.name} con Id:${id}`)
    } else {
        res.send("Producto no encontrado")
    }
}) 

 module.exports = routerProductos;
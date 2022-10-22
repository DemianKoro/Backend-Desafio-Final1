const { Router } = require ('express');
const routerCarritos = Router();

const Contenedor = require ('../contenedores/contenedor');
const contenedorCarritos = new Contenedor('./public/carritos.json');
const contenedorProductos = new Contenedor('./public/productos.txt');

//Lista de Carritos ↓

routerCarritos.get('/', async (req, res) => {
    const carritos = await contenedorCarritos.getAll().catch()
    res.json({"La lista de carritos es:": carritos});
})

//Carrito por id ↓

routerCarritos.get('/:id/productos', async (req, res) => {
    const { id } = req.params 
    // const carritos = await contenedorCarritos.getAll().catch()
    const carrito = await contenedorCarritos.getById(id).catch()
    console.log(carrito)
    if( carrito != null ){
    res.json( `El Carrito Id:${carrito.id} contiene: ${carrito.products.name}` )
    } else {
    res.send("Carrito no encontrado")
    }
})

// Nuevo Carrito ↓

routerCarritos.post('/', async (req, res) => {
    const carrito = req.body
    const carritoNuevo = await contenedorCarritos.save(carrito).catch();
    res.json(`Se creó el carrito id=${carrito.id}`)
})

// Borrar Carrito por id ↓

routerCarritos.delete('/:id', async (req, res) =>{
    const {id} = req.params;
    const carrito = await contenedorCarritos.getById(id).catch();
    if( carrito != null ){
        await contenedorCarritos.deleteById(id).catch();
        res.json(`Se borró el Carrito con Id:${id}`)
    } else {
        res.send("Carrito no encontrado")
    }
})

// Incorporar productos al carrito por su id de producto ↓

routerCarritos.post('/:id/productos/:id_prod', async (req, res) =>{
    const {id} = req.params;
    const {id_prod} = req.params
    const producto = await contenedorProductos.getById(id_prod).catch();
    // console.log('producto:', products)
    const carrito = await contenedorCarritos.getById(id).catch();
    // console.log("carrito", carrito)
    await contenedorCarritos.saveInCarr(id, id_prod, producto).catch();
    res.json(`Se guardó el producto ${producto.name} con Id=${producto.id} en el carrito id: ${carrito.id}`) 
}) 

// Incorporar productos al carrito por su id de producto ↓

routerCarritos.delete('/:id/productos/:id_prod', async (req, res) =>{
    const {id} = req.params;
    const {id_prod} = req.params
    const carrito = await contenedorCarritos.getById(id).catch();
    const producto = await contenedorProductos.getById(id_prod).catch();
    // console.log('producto:', producto)
    await contenedorCarritos.deleteInCarr(id_prod, id, producto).catch();
    res.json(`Se borró el producto ${producto.name} con Id=${producto.id} del carrito id: ${carrito.id}`)
})

module.exports = routerCarritos;
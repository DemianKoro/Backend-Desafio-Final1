// Incorporar productos al carrito por su id de producto

// routerCarritos.post('/:id/productos', async (req, res) =>{
//     const {id} = req.params;
//     const products = await contenedorProductos.getById(id).catch()
//     console.log(products)
//     const carrito = await contenedorCarritos.getById(id).catch();
//     console.log(carrito)
//     const productoEnCarrito = await contenedorCarritos.saveInCarr(products).catch()
//     res.json(`Se guardó el producto ${products.name} con Id=${products.id} en el carrito id: ${carrito.id}`) 
// }) 


    // async saveInCarr(producto, carrito){
    //     carrito.push(producto);
    //     await fs.promises.writeFile(this.archivo,JSON.stringify(carrito, null, 2))
    // }
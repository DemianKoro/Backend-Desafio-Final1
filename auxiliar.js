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

    const carrito = await this.getById(id);
    const resultado = {"products":[], "errores":[], "repetidos":[]};
    if (carrito) {
        for (let i= 0; i < id_prod.length; i++) {
            const producto = await contenedor.getById(id_prod[i]);
            if (producto) {
                const checkIfExistsProductInCarrito = (p) => p.id == producto.id;
                if (carrito.products.some(checkIfExistsProductInCarrito)) {
                    resultado.repetidos.push(producto);
                } else {
                    carrito.products.push(producto);
                    resultado.products.push(producto);
                }
            } else {
                resultado.errores.push({"id": id_prod[i], "error": "Producto no existe"});
            }
        }
        if (resultado.products.length > 0) {
            await deleteById(id);
            const content = await getAll();
            content.push(carrito);
            await fs.promises.writeFile(FILE, JSON.stringify(content, null, 2));
        }
        return resultado;
    }
    return null;
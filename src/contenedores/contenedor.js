const fs = require('fs');
const { parse } = require('path');


class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    
     
    }
    async save(producto){
        let productosObj = await this.getAll();
        let id = productosObj.length + 1;
        producto.id= parseInt(id)
        productosObj.push(producto);
        await fs.promises.writeFile(this.archivo,JSON.stringify(productosObj, null, 2))
    }

    async saveInCarr(id, id_prod, producto){

      const carrito = await this.getById(id);
      const resultado = {"products": [], "errores": [], "repetidos": []};

    //   if (carrito) {
    //     for (let i = 0; i < id_prod.length; i++) {
    //         const producto = await this.getById(id_prod[i]);
    //         if (producto) {
    //             const checkIfExistsProductInCarrito = (p) => p.id == producto.id;
    //             if (carrito.products.some(checkIfExistsProductInCarrito)) {
    //                 resultado.repetidos.push(producto);
    //             } else {
    //                 carrito.products.push(producto);
    //                 resultado.products.push(producto);
    //             }
    //         } else {
    //             resultado.errores.push({"id": id_prod[i], "error": "Producto no existe"});
    //         }
    //     }
        if (resultado.products.length >= 0 ) {
            await this.deleteById(id);
            carrito.products.push(producto);
            const content = await this.getAll();
            content.push(carrito);
            // console.log(content);
            await fs.promises.writeFile(this.archivo, JSON.stringify(content, null, 2));
        }
        return resultado;
    // }
    return null;
    
    }


    async getAll(){
        let productos = await fs.promises.readFile(this.archivo);
        let productosObj = JSON.parse(productos);
        return productosObj;

    }

     async getById(id){
        let productos = await this.getAll();
        let productoRetornado = await productos.find((prod)=>prod.id==id);
        return productoRetornado;
    }


    async deleteById(id){
        let productos = await this.getAll();
        let nuevaListaProductos = productos.filter((prod)=>prod.id!==parseInt(id));
        await fs.promises.writeFile(this.archivo,JSON.stringify(nuevaListaProductos, null, 2));
    }


    async deleteInCarr(id_prod, id) {
        const carrito = await this.getById(id);
        if (carrito) {
            const producto = carrito.products.find(p => p.id == id_prod);
            if (producto) {
                let listaProductos = carrito.products.filter(p => p.id != id_prod);
                await this.deleteById(id);
                const content = await this.getAll();
                const newCarrito = {...carrito, 'products': listaProductos}
                content.push(newCarrito);
                await fs.promises.writeFile(this.archivo, JSON.stringify(content, null, 2));
                return producto;
            }
        }
        return null;
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archivo,'[]');
    }

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }

    async modifyProducto(id, producto){
        let productos = await this.getAll();
        let nuevaListaProductos = productos.splice(parseInt(id - 1) , 1 , producto);
        await fs.promises.writeFile(this.archivo,JSON.stringify(productos, null, 2))

    }

}

let contenedor = new Contenedor('./public/productos.txt');
let contenedor2 = new Contenedor('./carritos.json');



module.exports = Contenedor;


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

    async saveInCarr(producto, carrito){
        let carritos = await this.getAll();
        let oldProducts = carrito.products
        let products = {oldProducts, producto}
        console.log("productos retornados",products)        
        let nuevaListaCarritos = carritos.splice((carrito -1) , 0 , producto);
        console.log(carritos)
        await fs.promises.writeFile(this.archivo,JSON.stringify(carritos, null, 2))
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

let contenedor = new Contenedor('./productos.txt');
let contenedor2 = new Contenedor('./carritos.txt');

module.exports = Contenedor;


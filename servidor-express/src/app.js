import express from "express";
import {ProductManager} from "./ProductManager.js";

const app= express();



const port = 8080;

const manager = new ProductManager("./products.json");
//console.log(manager);


//METODO PARA VISUALIZAR EL LISTADO DE PRODUCTOS, INCLUYEN QUERY PARAM PARA FILTAR LIMITE DE RESULTADOS
app.get ("/products",async (req,res) => {
    const products = await manager.getProducts();
    const limit = parseInt (req.query.limit);
    if (!isNaN (limit)){
        res.send(products.slice(0, limit));
    } else {
        res.send(products);
    }
    
});


//METODO PARA BUSCAR Y VISUALIZAR PRODUCTO POR MEDIO DE SU ID
app.get ("/products/:pid",async (req,res) => {
    try{
        const pId =parseInt(req.params.pid);
        const products = await manager.getProductById(pId);
        res.send(products);
    } catch (error) {
        res.send (`El producto con el id ingresado no existe`);
    }
    
});

app.listen(port, ()=>console.log(`Server listening on port ${port}`));
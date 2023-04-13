import express from "express";
import {ProductManager} from "./ProductManager.js";

const app= express();



const port = 8080;

const manager = new ProductManager("./products.json");
//console.log(manager);



app.get ("/products",async (req,res) => {
    const products = await manager.getProducts();
    const limit = parseInt (req.query.limit);
    if (!isNaN (limit)){
        res.send(products.slice(0, limit));
    } else {
        res.send(products);
    }
    
});



app.get ("/products/:pid",async (req,res) => {
    const pId =parseInt(req.params.pid);
    const products = await manager.getProductById(pId);
    res.send(products);
});

app.listen(port, ()=>console.log(`Server listening on port ${port}`));
import { products } from "./data.js";
import express from "express";




const app=express();


app.get("/",(req,res)=>{
    res.send(`
        <h1>Home page<h1>
        <a href="/api/products">Browser products</a>`

    );
});

app.get("/api/products",(req,res)=>{
    const modiProducts=products.map(
        ({reviews,description,...rest})=> rest ,
    );
    res.status(200).json({count:modiProducts.length,data:modiProducts});

});



app.use((req,res)=>{
    res.status(404).send("Route not found");
});


app.listen(3393,()=>{
    console.log("prg4 running at http://localhost:3393");

});
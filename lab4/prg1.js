import express from 'express';

const app=express()
// request goes here 
app.get("/",(request,res)=>{
    res.end.send("<h1> hello Express</h1>")
});
app.get("/about",(req,res)=>{
    res.send("<h2>About page</h2>");
});
const products = [
  { id: 1, name: "marker", qty: 100, price: 15 },
  { id: 2, name: "duster", qty: 50, price: 10 },
];
app.get ("/product",(req,res)=>{
    res.send ("<h2> Product page</h2>");   
});
app.use ((req,res)=>{
    res.status(404).send("<h1>Page not found");
});
app.listen(3333,()=>console.log ("prg1 is running at 3333"));
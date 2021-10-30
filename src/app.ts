import express, { Request, Response, NextFunction } from "express";
const app = express()
require("dotenv").config()
const PORT = process.env.PORT!
const { getOrders } = require("./controller/orders")
console.log(PORT)

getOrders().catch(console.error)
app.get('/',(req:Request,res:Response)=>{
    res.json("hello")
})



app.listen(PORT,()=>{
    console.log(`Server Started At ${PORT}`)
})
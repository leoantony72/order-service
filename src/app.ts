import express, { Request, Response, NextFunction } from "express";
const app = express()
require("dotenv").config()
const PORT = process.env.PORT!
console.log(PORT)

app.get('/',(req:Request,res:Response)=>{
    res.json("hello")
})



app.listen(PORT,()=>{
    console.log(`Server Started At ${PORT}`)
})
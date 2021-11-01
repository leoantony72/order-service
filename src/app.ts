import express, { Request, Response, NextFunction } from "express";
const app = express();
require("dotenv").config();
const PORT = process.env.PORT!;
const { getOrders } = require("./controller/orders");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



getOrders().catch(console.error);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: "Order-Service" });
});

app.listen(PORT, () => {
  console.log(`Server Started At ${PORT}`);
});
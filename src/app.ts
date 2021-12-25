import express, { Request, Response} from "express";
const app = express();
require("dotenv").config();
const PORT = process.env.PORT!;
const { getOrders } = require("./controller/orders");



getOrders().catch(console.error);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: "Order-Service" });
});

app.listen(PORT, () => {
  console.log(`Server Started At ${PORT}`);
});
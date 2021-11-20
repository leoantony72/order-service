const Kafkajs = require("../config/kafka");
const consumer = Kafkajs.consumer({ groupId: "ordersId" });
const { OrderId } = require("../controller/generateId");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getOrders = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
      //values
      let obj = JSON.parse(message.value);
      let date_created = new Date();
      let items = obj.succeeded;
      let total = obj.amount / 100;
      await prisma.orders.create({
        data: {
          order_id: obj.order_id,
          customer_id: obj.customer_id,
          total: total,
          billing_address_id: obj.billing_address_id,
          order_status: obj.order_status,
          payment_type: obj.payment_type,
          date_created: date_created,
        },
      });
      items.forEach(async (item: any) => {
        let order_itemID = await OrderId();
        let quantity: number = item.quantity;
        console.log("Quantity :" + quantity);
        console.log("Item :" + item.pid);
        const create_order_Item = await prisma.order_items.create({
          data: {
            order_item_id: order_itemID,
            order_id: obj.order_id,
            item_id: item.pid,
            item_quantity: quantity,
          },
        });
      });
    },
  });
};

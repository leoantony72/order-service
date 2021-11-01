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
      await prisma.orders.create({
        data: {
          order_id: obj.order_id,
          customer_id: obj.customer_id,
          total: obj.amount,
          billing_address_id: obj.billing_address_id,
          order_status: obj.order_status,
          payment_type: obj.payment_type,
          date_created: date_created,
        },
      });
    },
  });
};

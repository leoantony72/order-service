const Kafkajs = require("../config/kafka");
const consumer = Kafkajs.consumer({ groupId: "ordersId" });
const { OrderId } = require("../controller/generateId");
const client = require("../config/database");

export const getOrders = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  try {
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
        console.log(obj, items);
        await client.query("BEGIN");
        var query =
          "INSERT INTO orders(order_id,customer_id,total,billing_address_id,order_status,payment_type,date_created)VALUES($1,$2,$3,$4,$5,$6,$7)";

        const insertOrder = await client.query(query, [
          obj.order_id,
          obj.customer_id,
          total,
          obj.billing_address_id,
          obj.order_status,
          obj.payment_type,
          date_created,
        ]);
        await client.query("COMMIT");

        console.log(obj.order_id);
        items.forEach(async (item: any) => {
          let order_itemID = await OrderId();
          let quantity = item.quantity;
          let orderid = obj.order_id;
          console.log("Quantity :" + quantity);
          console.log("Item :" + item.pid);
          var query =
            "INSERT INTO order_items(order_item_id,order_id,item_id,item_quantity)VALUES($1,$2,$3,$4)";
          await client.query("BEGIN");
          const insertOrder_items = await client.query(query, [
            order_itemID,
            orderid,
            item.pid,
            quantity,
          ]);
          await client.query("COMMIT");
        });
      },
    });
  } catch (e) {
    await client.query("ROLLBACK");
    console.log(e);
  }
};

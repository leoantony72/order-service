const Kafkajs = require("../config/kafka");
const consumer = Kafkajs.consumer({ groupId: 'get-orders' })

export const getOrders = async () => {   
    // Consuming
    var topic:any
    var message:any
    var partition:any

    await consumer.connect()
    await consumer.subscribe({ topic: 'orders', fromBeginning: true })
   
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
   
  
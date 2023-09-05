const {Kafka} =require("kafkajs")
const log_data= require("./system_logs.json")

createProducer();

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_log_store_client",
            brokers:["192.168.4.165:9092"]
        })

        const producer=kafka.producer();
        console.log("producer a bağlanılyor")
        await producer.connect();
        console.log("bağlantı sağlandı")
        let messages = log_data.map(item=>{
            return {
                value:JSON.stringify(item),
                partition:item.type=="system" ? 0 : 1
            }

        })

        const message_result = await producer.send({
            topic:"LogStoreTopic", //mesaj hangi topic e gidecek
            message:messages
        })

        console.log(`mesaj gönderimi başarılı , ${message_result}`)

        await producer.disconnect()
    } catch (error) {
        console.log("Hata", error)
    } finally{
        process.exit(0)
    }
}
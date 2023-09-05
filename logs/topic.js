const {Kafka} = require("kafkajs")


createTopic();

async function createTopic(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_log_store_client",
            brokers:["192.168.4.165:9092"]
        })

        const admin = kafka.admin();

        console.log("kafka broker a bağlaılıyor")
        await admin.connect();
        console.log("Kafka broker a bağlantılı başarılı Topic üretilcek ")

        await admin.createTopics({
            topics:[
                {
                    topic:"LogStoreTopic",
                    numPartitions:2
                }
            ]
        })
        console.log("Topic başarlı bir şekilde oluşturuldu")
        await admin.disconnect()
    } catch (error) {
        console.log("Hata",error)
    } finally{
        process.exit(0);
    }
}
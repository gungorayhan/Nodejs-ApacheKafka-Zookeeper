const {Kafka} = require("kafkajs")

createTopic()

async function createTopic(){
    try {
        
    const kafka = new Kafka({
        clientId:"kafka_pub_sub_client",
        brokers:["192.168.4.165:9092"]
    })

    const admin = kafka.admin();
    console.log("kafka broker a bağlanılıyor")
    await admin.connect()
    console.log("kafka broker a bağlantı başatrılı topic üretilecek")
    await admin.createTopics({
        topics:[
            {
                topic:"raw_video_topic",
                numPartitions:1
            }
        ]
    });
    console.log("Topic başarılı bir şekilde oluşturuldu")
    await admin.disconnect()

    } catch (error) {
        console.log("hata",error)
    } finally{
        process.exit(0)
    }
}
const {Kafka}= require("kafkajs")

createProducer()

async function createProducer(){
    try {
        const kafka= new Kafka({
            clientId:"kafka_pub_sub_client",
            brokers:["192.168.4.165:9092"]
        })

        const producer= kafka.producer();
        console.log("producer e bağlanıcalak")
        await producer.connect();
        console.log("producere bağlantı başaruılu")
        const message_result=await producer.send({
            topic:"raw_video_topic",
            messages:[{
                value:"yeni video içeriğği",
                partition:0
            }]
        })

        console.log("gönderme işlemi başarılı", JSON.stringify(message_result))
        await producer.disconnect()

    } catch (error) {
        console.log("hata",error)
    } finally{
        process.exit(0)
    }
}
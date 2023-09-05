const {Kafka} = require("kafkajs")

createProducer();

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_ornek_1",
            brokers:["192.168.4.165:9092"]
        })

        const producer = kafka.producer();
        console.log("producer a bağlanılıyor")
        await producer.connect();

        const messa_result = await producer.send({
            topic:"Logs",
            messages:[
                {
                    value:"bu bir test log mesajıdır. partition 0 a gidecek ",
                    partition:0
                }
            ]
        })

        console.log("gönderme işlemı başarılı. " , JSON.stringify(messa_result)) //işlem sonrasunda mesaj ve bassoffset bilgilerini geri döner 
        // [{"topicName":"Logs","partition":0,"errorCode":0,"baseOffset":"1","logAppendTime":"-1","logStartOffset":"0"}]
        await producer.disconnect();
    } catch (error) {
        console.log("hata oluştu",error)
    } finally{
        process.exit(0)
    }
}
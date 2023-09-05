const {Kafka} = require("kafkajs")

//node consumer.js Logs || Logs2
const topic_name = process.argv[2] || "Logs2";
const partition=process.argv[3] || 0;

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
            topic:topic_name,
            messages:[
                {
                    value:"bu bir test log mesajıdır. partition 0 a gidecek ",
                    partition:partition
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
const {Kafka} = require("kafkajs")

//node consumer.js Logs || Logs2
const topic_name =process.argv[2] || "Logs2"

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_ornek_1",
            brokers:["192.168.4.165:9092"]
        })

        const consumer = kafka.consumer({
            groupId:"ornek_1cg_1"
        });
        console.log("Consumer a bağlanıyoruz...")
        await consumer.connect();
        console.log("Bağlantı başarılı")

        //consumer sabscribe
        await consumer.subscribe({
            topic:topic_name, //subscribe olacağı topic
            fromBeginning:true // baştan başlayarak oku. davranışını tanımlıyoruz
        })

        await consumer.run({
            eachMessage:async result=>{
                console.log(` Gelen mesaj ${result.message.value} : Partition:=>${result.partition}`)
            }
        })

    } catch (error) {
        console.log("Hata oluştu ", error )
    }
}
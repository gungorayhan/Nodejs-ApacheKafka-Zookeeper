const {Kafka} = require("kafkajs")

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
            topic:"Logs", //subscribe olacağı topic
            fromBeginning:true // baştan başlayarak oku. davranışını tanımlıyoruz
        })

        await consumer.run({
            eachMessage:async result=>{
                console.log(` Gelen mesaj ${result.message.value} : Partition:=>`)
            }
        })

    } catch (error) {
        console.log("Hata oluştu ", error )
    }
}
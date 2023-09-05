const {Kafka} = require("kafkajs")

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_log_store_client",
            brokers:["192.168.4.165:9092"]
        })

        const consumer= kafka.consumer({
            groupId:"log_store_consumer_group"
        });

        console.log("consumer a bağlanılıyor")
        await consumer.connect()
        console.log("bağlantı başarılı")

        //consumer subscribe
        await consumer.subscribe({
            topic:"LogStoreTopic",
            fromBeginning:true
        })

        await consumer.run({
            eachMessage:async result =>{
                console.log(`Gelen mesajlar --> ${result.message.value}, par=>${result.partition}`)
            }
        })
    } catch (error) {
        console.log("Hata",error)
    }
}
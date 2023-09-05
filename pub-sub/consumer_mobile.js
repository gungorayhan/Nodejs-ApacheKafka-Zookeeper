const {Kafka} = require("kafkajs")

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId:"kafka_pub_sub_client",
            brokers:["192.168.4.165:9092"]
        })

        const consumer = kafka.consumer({
            groupId:"mobile_encoder_consumer_group"
        });
        console.log("consumer a bağlanılıyor")
        await consumer.connect();
        console.log("bağlantı başarılı")

        await consumer.subscribe({
            topic:"raw_video_topic",
            fromBeginning:true
        })

        await consumer.run({
            eachMessage:async result =>{
                console.log(`işlenen video ${result.message.value}_mobile_encoder`)
            }
        })

    } catch (error) {
        console.log("hata",error)
    }
}
const { Kafka } = require("kafkajs");

createTopic();

async function createTopic() {
    try {
        //admin stauff...
        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.4.165:9092"]
        });
        const admin = kafka.admin();
        console.log("kafka broker a ağlanıyoruz")
        await admin.connect();
        console.log("Kafka broker a bağlantı başarılı topik üretilecek")
        await admin.createTopics({
            topics: [
                {
                    topic: "Logs",
                    numPartitions: 1 
                },
                {
                    topic: "Logs2",
                    numPartitions: 2 
                }
            ]
        })
        console.log("topic başarılı bir şekilde oluşturldu")
        await admin.disconnect();

    } catch (error) {
        console.log("Bir hata oluştu", error);
    } finally {
        process.exit(0)
    }
}
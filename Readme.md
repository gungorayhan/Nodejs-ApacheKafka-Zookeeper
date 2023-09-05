## docker 
docker run --name zookeeper -p 2181:2181 -d zookeeper

docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=192.168.8.148:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.8.148:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka


## producer / consumer 

Bir consumer bir partition a bağlanır!<br/>
eğer şöyle yapar isek;
bir adet consumer çalışıyor,
producer dan Logs2 nin partition 0 ve 1 e mesaj attık 
consumer önce 0 sonrasında 1. parititon ı okuyacak.<br/>
 fakat biz consumer ı 2 adet yapar isek; 
 consumer grup load balancing yapar ve partition ları ayrı consumerlar okur
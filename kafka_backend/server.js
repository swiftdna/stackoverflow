const process = require('node:process');
const connection =  new require('./kafka/Connection');
const connectDB = require('./config/db');
const fs = require('fs');

connectDB();
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
const Aggregator = require('./services/aggregator');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, (err,res) => {
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, (err, data) => {
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
const kafka = require("kafka-node");
const client = new kafka.KafkaClient();
client.loadMetadataForTopics(["stackoverflow_backend_processing"], (err, resp) => {
  console.log(JSON.stringify(resp))
});

handleTopicRequest("stackoverflow_backend_processing", Aggregator);
process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`
    );
});

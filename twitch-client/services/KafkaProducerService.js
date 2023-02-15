import kafkaConfig from '../providers/CloudKarafkaProvider.js';
import {Kafka, Partitioners} from "kafkajs";

const TOPIC_PREFIX = process.env.TOPIC_PREFIX;


const kafka = new Kafka(kafkaConfig);
const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});
await producer.connect();

let sendEvent = async (topic, eventType, user, channel, content, additionalInfo) => {
    topic = TOPIC_PREFIX + topic;
    const eventMessage = {
        eventType: eventType,
        user: user,
        channel: channel,
        content: content,
        additionalInfo: additionalInfo,
        date: new Date()
    }
    await producer.send({
        topic,
        messages: [{value: JSON.stringify(eventMessage)}]
    });
    console.log('[Kafka Producer]: ', eventMessage);
}

export default sendEvent;
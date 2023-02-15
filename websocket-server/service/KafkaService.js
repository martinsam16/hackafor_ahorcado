import {Kafka} from 'kafkajs';
import {kafkaConfig} from '../providers/CloudKarafkaConfig.js';

const kafka = new Kafka(kafkaConfig);
const TOPIC_PREFIX = process.env.TOPIC_PREFIX;
const TOPIC = TOPIC_PREFIX + 'events'

export const startConsumer = async () => {
    const consumer = kafka.consumer({groupId: TOPIC_PREFIX + 'ahorcadows'})
    await consumer.connect();
    await consumer.subscribe({topic: TOPIC});
    console.log('Kafka consumer is ready!')
    return consumer
};
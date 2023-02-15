const KAFKA_USER = process.env.KAFKA_USER;
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;

export default {
    clientId: 'twitch-client',
    brokers: ['dory.srvs.cloudkafka.com:9094'],
    authenticationTimeout: 10000,
    ssl: true,
    socket: {
        keepAlive: {
            enabled: true
        },
    },
    sasl: {
        mechanism: 'SCRAM-SHA-512',
        username: KAFKA_USER,
        password: KAFKA_PASSWORD
    },
    retry: {
        initialRetryTime: 100,
        retries: 5
    },
};
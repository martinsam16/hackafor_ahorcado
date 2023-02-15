import { MongoClient, ServerApiVersion } from 'mongodb';

const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;

const uri = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@dinocluster.1ypinta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
export default client;
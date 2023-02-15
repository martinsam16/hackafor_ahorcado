import client from "../providers/MongodbProvider.js";

const DINO_DB = 'dinodb';

export const retrieveTokenData = async () => {
    console.log('Retrieving token')
    return await client.db(DINO_DB)
        .collection('TokenData')
        .findOne({});
}

export const refreshTokenData = async (newToken)=>{
    await client.db(DINO_DB)
        .collection('TokenData')
        .insertOne(newToken);
    console.log('Token refreshed!');
}

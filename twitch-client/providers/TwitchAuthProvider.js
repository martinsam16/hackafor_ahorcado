import {RefreshingAuthProvider} from '@twurple/auth';
import {retrieveTokenData, refreshTokenData} from "../services/MongodbService.js";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let tokenData = await retrieveTokenData();

const twitchAuthProvider = new RefreshingAuthProvider({
        clientId,
        clientSecret,
        onRefresh: async newTokenData => {
            await refreshTokenData(newTokenData);
            tokenData = newTokenData;
        }
    },
    tokenData
);
export default twitchAuthProvider;

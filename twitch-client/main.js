import {ChatClient} from '@twurple/chat';
import twitchAuthProvider from './providers/TwitchAuthProvider.js';
import sendEvent from "./services/KafkaProducerService.js";
import {ChatEmote} from "@twurple/common";

const channelsToRunBot = ['dinodev16']
const chatClient = new ChatClient({authProvider: twitchAuthProvider, channels: channelsToRunBot});
await chatClient.connect();
console.log('Chatbot running!')

const COMMAND_PREFIX = '!';

chatClient.onMessage(async (channel, user, msg, privMsg) => {
    if (msg.startsWith(COMMAND_PREFIX)) {
        const command = msg.split(COMMAND_PREFIX).at(1);
        console.log(command)
        if (command === 'ahorcado' && channelsToRunBot.includes(user)) {
            await chatClient.say(channel, '[ahorcado_digital] Iniciado!!');
            await sendEvent('events', 'AHORCADO_INITIALIZED', user, channel, command, null);
        } else if (command.length > 1) {
            await sendEvent('events', 'WORD', user, channel, command, null);
        } else {
            const letter = command.charAt(0);
            await sendEvent('events', 'LETTER', user, channel, letter, null);
        }
        //timeout
        //await sendEvent('events', 'COMMAND', user, channel, command, twitchPrivateMessageWithEmoteUrl(privMsg));
    }
});
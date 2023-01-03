import { Client, Collection, GatewayIntentBits } from 'discord.js';
import JFMBBotConfig from './interfaces/JFMBBotConfig';
import JFMBClient from './interfaces/JFMBClient';
const config = require('../config.json') as JFMBBotConfig;

import eventHandler from './handlers/eventHandler';
import commandHandler from './handlers/commandHandler';
import antiCrash from './handlers/antiCrash';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions
    ],
}) as JFMBClient;

client.commands = new Collection();
client.config = config;

eventHandler(client);
commandHandler(client);
antiCrash();

client.login(config.token);
import { ApplicationCommandDataResolvable, Client } from "discord.js";
import JFMBBotConfig from "./JFMBBotConfig";

export default interface JFMBClient extends Client {
    commands: any,
    config: JFMBBotConfig,
    commandArray: ApplicationCommandDataResolvable[],
}
import { CommandInteraction } from "discord.js";
import JFMBClient from "../interfaces/JFMBClient";

module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    async execute(interaction: CommandInteraction, client: JFMBClient) {
        return await interaction.reply({
            ephemeral: true,
            content: 'Pong!'
        })
    }
}
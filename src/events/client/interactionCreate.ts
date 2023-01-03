import { CommandInteraction, EmbedBuilder, ButtonInteraction, Collection, GuildMember } from "discord.js";
import JFMBClient from "../../interfaces/JFMBClient";

module.exports = {
    name: 'interactionCreate',
    
    async execute(interaction: CommandInteraction, client: JFMBClient) {
        const { guild, channel } = interaction;
        const member = interaction.member as GuildMember;


        if (!interaction.inGuild()) {
            return await interaction.reply({
                ephemeral: true,
                content: '⛔ Commands can only be used in guilds!'
            })
        }

        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                return await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setDescription('⛔ An error occured.')
                    ]
                })
            }

            if (command.permissions?.length > 0) {
                if (!member?.permissions.has(command.permissions)) {
                    return await interaction.reply({
                        ephemeral: true,
                        content: '⛔ You do not have the permissions required to use this command.'
                    })
                }
            }

            

            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.log(err);

                await interaction.reply({
                    content: '⛔ There was an error while executing this command!',
                    ephemeral: true,
                })
            }
        }

        if (interaction.isButton()) {
            const btnInteraction = interaction as ButtonInteraction;

            const { member, guild, channel } = interaction;

            
        }
    }
}
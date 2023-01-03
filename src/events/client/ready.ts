import JFMBClient from "../../interfaces/JFMBClient";

module.exports = {
    name: 'ready',
    once: true,
    
    async execute(client: JFMBClient) {
        await client.application?.commands.set(client.commandArray);

        console.log('The bot is ready!');
    }
}
const Ascii = require('ascii-table');
import fs from 'fs';
import JFMBClient from '../interfaces/JFMBClient';

export default async function (client: JFMBClient) {
    const table = new Ascii('Commands loaded');

    client.commandArray = [];

    const commandFiles = await fs.readdirSync(`${process.cwd()}/dist/commands`).filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
        const command = require(`${process.cwd()}/dist/commands/${file}`);

        if (!command.name) {
            table.addRow('NO_CMDNAME', '🛑 FAILED', 'Missing a name.');
            continue;
        }

        if (!command.description) {
            table.addRow(command.name, '🛑 FAILED', 'Missing a description.');
            continue;
        }

        client.commands.set(command.name, command);

        client.commandArray.push(command);

        await table.addRow(command.name, '✅ SUCCESSFUL');
    }

    console.log('\n' + table.toString());
}

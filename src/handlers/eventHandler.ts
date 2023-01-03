const Ascii = require('ascii-table');
import fs from 'fs';
import JFMBClient from '../interfaces/JFMBClient';

export default async function (client: JFMBClient) {
    const table = new Ascii('Events Loaded');

    const eventFolders = await fs.readdirSync(`${process.cwd()}/dist/events`);

    for (let eventFolder of eventFolders) {
        const eventFiles = await fs
            .readdirSync(`${process.cwd()}/dist/events/${eventFolder}`)
            .filter(file => file.endsWith('.js'));

        for (let file of eventFiles) {
            const event = require(`${process.cwd()}/dist/events/${eventFolder}/${file}`);

            if (event.name) {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
                await table.addRow(event.name, '✅ SUCCESSFUL');
            } else {
                await table.addRow(event.name, '⛔ MISSING NAME @' + file);
            }
        }
    }

    console.log('\n' + table.toString());
}

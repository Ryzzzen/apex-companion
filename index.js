require('dotenv').config();
require('moment').locale(process.env.LOCALE);

const Discord = require('discord.js');
const client = new Discord.Client();

const ApexCompanion = new (require('./class/ApexCompanion'))(client);

ApexCompanion.on('shutdown', async function() {
  console.log('Shutting down core modules.');

  await ApexCompanion.shutdown();
  await ApexCompanion.client.destroy();
  process.timeout(process.exit, 5000);
});

ApexCompanion.load().then(x => {
  client.on('ready', async () => {
    await ApexCompanion.onReady(client);

    client.on('message', msg => ApexCompanion.onMessage(msg));
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of the guild.`);
  });
  client.login(process.env.DISCORD_TOKEN);
});

if (process.env.FREE_HOST == true) {
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(200, {
      'Content-type': 'text/plain'
    });

    res.write('working');
    res.end();
  }).listen(4000);
}

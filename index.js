const { Client, Intents, MessageButton, IntentsBitField, NoSubscriberBehavior, DiscordAPIError, MessageSelectMenu, MessageAttachment, MessageEmbed, MessageActionRow } = require('discord.js');
const { loadImage, Canvas} = require("canvas-constructor/cairo")
const { version } = require("discord.js")
const Keyv = require('keyv');
const { inviteTracker } = require("discord-inviter");
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const moment = require('moment');
require("moment-duration-format");
const db = new Keyv('sqlite://./storage/database.sqlite');
const express = require('express');
const app = express();
const path = require("path");

const {
    token,
    prefix,
} = require('./config.json')
// يمكنك استخدام mergedConfig في الشيفرة الخاصة بك الآن

let canvax = require('canvas')
canvax.registerFont("./storage/Uni Sans Heavy.otf", { family: 'Discord' })
canvax.registerFont("./storage/DejaVuSansCondensed-Bold.ttf", { family: 'Discordx' })
const client = new Client({
intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.MESSAGE_CONTENT
],
}); // Declare client to be a new Discord Client (bot)
require('http').createServer((req, res) => res.end(`
Dveloper Bot : Ahmed Clipper
Server Support : https://dsc.gg/clipper-tv
`)).listen(3000) //Dont remove this 
  /*
  Code Below provides info about the bot 
  once it's ready
  */

const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 30; // أو أي قيمة تعتقد أنها مناسبة

let tracker = "10";

require("events").EventEmitter.defaultMaxListeners = 30;
  tracker = new inviteTracker(client);
	// "guildMemberAdd"  event to get full invite data
tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
  const startTimestamp = Math.floor(Date.now() / 1000) - 28;
  const memberCount = member.guild.memberCount;
  // return when get error
  if(error) return console.error(error);
  // get the channel
  let channel = member.guild.channels.cache.get("1230784484257959936"),
    Msg = (`
1. ${member.user} **- تم دعوة شخص جديد للسيرفر**
2. <@!${inviter.id}> **- تمت دعوته من قبل**
3. **عدد الدعوات -** **__${invite.count}__**
4. **العضو رقم -** **__${memberCount}__**
5. **<t:${startTimestamp}:R> -** **انضم للسيرفر منذ**`);
  // change welcome message when the member is bot
  if (member.user.bot)
        Msg = (`
1. ${member.user} **- تم دعوة بوت جديد جديد للسيرفر**
2. <@!${inviter.id}> **- تمت دعوته من قبل**
3. **عدد الدعوات -** **__${invite.count}__**
4. **العضو رقم -** **__${memberCount}__**
5. **<t:${startTimestamp}:R> -** **انضم للسيرفر منذ**`);
  // send welcome message
  channel.send(Msg);
});
//Fix Erorr Project
process.on("uncaughtException" , err => {
return;
})
 
process.on("unhandledRejection" , err => {
return;
})
 
process.on("rejectionHandled", error => {
  return;
});
client.on('ready', () => {
  console.log(``);
  console.log(`</> Logged in as : ${client.user.tag}!`);
  console.log(`</> Servers : ${client.guilds.cache.size}`);
  console.log(`</> Users : ${client.users.cache.size}`);
  console.log(`</> channels : ${client.channels.cache.size}`);
  console.log(`</> Name : ${client.user.username}`);
  client.user.setStatus('idle');///dnd/online/idle
  let status = [`By : Ahmed Clipper`];
  setInterval(()=>{
  client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
})






client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'bot') {
        const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Stats from \`${client.user.username}\``)
            .setDescription(``)
            .addFields(
                { name: ':ping_pong: Ping', value: `┕\`${Math.round(client.ws.ping)}ms\``, inline: true },
                { name: ':file_cabinet: Memory', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``, inline: true },
                { name: ':homes: Servers', value: `┕\`${client.guilds.cache.size}\``, inline: true },
                { name: ':busts_in_silhouette: Users', value: `┕\`${client.users.cache.size}\``, inline: true },
                { name: ':robot: Version', value: `┕\`v${require("./package.json").version}\``, inline: true },
                { name: ':blue_book: Discord.js', value: `┕\`v${version}\``, inline: true },
                { name: ':green_book: Node', value: `┕\`${process.version}\``, inline: true },
                { name: ':clock1: Uptime', value: `┕\`${duration}\``, inline: true },
                { name: ':control_knobs: API Latency', value: `┕\`${(message.client.ws.ping)}ms\``, inline: true }
            );
        message.reply({ embeds: [embed] });
    }
});


client.login(token)

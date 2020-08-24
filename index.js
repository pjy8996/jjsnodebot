const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "🔰디스코드🔰";
const byeChannelName = "🔰디스코드🔰";
const welcomeChannelComment = "**님! 안녕하세요!\n**사무트서버 디스코드에 오신것을 환영합니다!**\n**원할한 서버이용을 위해서**\n**인증채널에서 인증하신후 이용해주세요!**";
const byeChannelComment = "**님 안녕히 가세요.. 다음에 또뵈요!**";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);
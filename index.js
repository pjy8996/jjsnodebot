//===================입퇴장메세지, const===================
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const moment = require("moment");
require("moment-duration-format");
const momenttz = require('moment-timezone');
const welcomeChannelName = "🔰디스코드🔰";
const byeChannelName = "🔰디스코드🔰";
const welcomeChannelComment = "**님! 안녕하세요!\n**과학서버 디스코드에 오신것을 환영합니다!**\n**원할한 서버이용을 위해서**\n**인증채널에서 인증하신후 이용해주세요!**";
const byeChannelComment = "**님 안녕히 가세요.. 다음에 또뵈요!**";
//===================입퇴장메세지, const===================



//===================봇 켜짐로그===================
client.on('ready', () => {
  console.log('과학이 상태 ON');
});
//===================봇 켜짐로그===================



//===================단순자동응답===================
client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});
//===================단순자동응답===================

client.login(token);

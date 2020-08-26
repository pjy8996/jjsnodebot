//=========================봇구동세팅=========================//
const Discord = require('discord.js');    //디스코드.js지정
const client = new Discord.Client();    //클라이언트지정
const token = process.env.token;     //토큰
//=========================봇구동세팅=========================//


//=========================입퇴장메세지=========================//
const welcomeChannelName = "🔰디스코드🔰";   //채널지정
const byeChannelName = "🔰디스코드🔰";     //채널지정
const welcomeChannelComment = "**님! 안녕하세요!**\n**과학서버 디스코드에 오신것을 환영합니다!**\n**원할한 서버이용을 위해서**\n**인증채널에서 인증하신후 이용해주세요!**";  //입장메세지
const byeChannelComment = "**님 안녕히 가세요.. 다음에 또뵈요!**";   //퇴장메세지
//=========================입퇴장메세지=========================//


client.on('ready', () => {
  console.log('과학이 상태 ON!');
  client.user.setPresence({ game: { name: '과학서버봇 과학이!' }, status: 'online' })

  let state_list = [
    '과학서버봇 과학이!',
    '규칙을 숙지해주세요!',
    '오늘도 좋은 하루~',
  ]
  let state_list_index = 1;
  let change_delay = 3000; // 이건 초입니당. 1000이 1초입니당.

  function changeState() {
    setTimeout(() => {
      // console.log( '상태 변경 -> ', state_list[state_list_index] );
      client.user.setPresence({ game: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  // changeState();
});

//=========================입장역할지급=========================//
client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "신규유저"));   //지급할 역할 이름
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});
//=========================입장역할지급=========================//


//=========================단순자동응답=========================//
client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }
//=========================단순자동응답=========================//

  if(message.content == 'embed') {
    let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('http://www.naver.com')
      .setAuthor('나긋해', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('Inline field title', 'Some value here')
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('나긋해가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
      commandList.forEach(x => {
        commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
      });
  
      embed.addField('Commands: ', commandStr);
  
      message.channel.send(embed)
    } else if(message.content == '!초대코드2') {
      client.guilds.array().forEach(x => {
        x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
          .then(invite => {
            message.channel.send(invite.url)
          })
          .catch((err) => {
            if(err.code == 50013) {
              message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
            }
          })
      });
    } else if(message.content == '!초대코드') {
      if(message.channel.type == 'dm') {
        return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
      }
      message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    } else if(message.content.startsWith('!전체공지2')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('!전체공지2'.length);
        let embed = new Discord.RichEmbed()
          .setAuthor('공지 of 콜라곰 BOT')
          .setColor('#186de6')
          .setFooter(`콜라곰 BOT ❤️`)
          .setTimestamp()
    
        embed.addField('공지: ', contents);
    
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(embed)
        });
    
        return message.reply('공지를 전송했습니다.');
      } else {
        return message.reply('채널에서 실행해주세요.');
      }
    } else if(message.content.startsWith('!전체공지')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('!전체공지'.length);
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(`<@${message.author.id}> ${contents}`);
        });
    
        return message.reply('공지를 전송했습니다.');
      } else {
        return message.reply('채널에서 실행해주세요.');
      }
    } else if(message.content.startsWith('!청소')) {
      if(message.channel.type == 'dm') {
        return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
      }
      
      if(message.channel.type != 'dm' && checkPermission(message)) return
  
      var clearLine = message.content.slice('!청소 '.length);
      var isNum = !isNaN(clearLine)
  
      if(isNum && (clearLine <= 0 || 100 < clearLine)) {
        message.channel.send("**1 ~ 99 까지의 메세지를 청소할 수 있습니다!**")
        return;
      } else if(!isNum) { // c @나긋해 3
        if(message.content.split('<@').length == 2) {
          if(isNaN(message.content.split(' ')[2])) return;
  
          var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
          var count = parseInt(message.content.split(' ')[2])+1;
          let _cnt = 0;
  
          message.channel.fetchMessages().then(collected => {
            collected.every(msg => {
              if(msg.author.id == user) {
                msg.delete();
                ++_cnt;
              }
              return !(_cnt == count);
            });
          });
        }
      } else {
        message.channel.bulkDelete(parseInt(clearLine)+1)
          .then(() => {
            AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "** 개의 메시지를 삭제했습니다!** - [이 메세지는 3초 후에 사라집니다]");
          })
          .catch(console.error)
    }
  } else if(message.content.startsWith('!강퇴')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    console.log(message.mentions);

    let userId = message.mentions.users.first().id;
    let kick_msg = message.author.username+'#'+message.author.discriminator+'이(가) 강퇴시켰습니다.';
    
    message.member.guild.members.find(x => x.id == userId).kick(kick_msg)
  } else if(message.content.startsWith('!밴')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    console.log(message.mentions);

    let userId = message.mentions.users.first().id;
    let kick_msg = message.author.username+'#'+message.author.discriminator+'이(가) 강퇴시켰습니다.';

    message.member.guild.members.find(x => x.id == userId).ban(kick_msg)
  } else if(message.content.startsWith('!주사위')) {
    let min = 1;
    let max = 6;
    let dice_num = parseInt(Math.random() * (max - min) + min);
    return message.reply(`${dice_num}가 나왔습니다.`);
  } else if(message.content.startsWith('과학아')) {
    let arr = [
      '왜',
      '뭐',
      '?',
    ]
    let min = 0;
    let max = arr.length;
    let index = parseInt(Math.random() * (max - min) + min);
    return message.reply(`${arr[index]}`);
  } else if(message.content.startsWith('과학아 죽어')) {
    let arr = [
      '못죽어',
      '솔선수범',
      '?',
    ]
    let min = 0;
    let max = arr.length;
    let index = parseInt(Math.random() * (max - min) + min);
    return message.reply(`${arr[index]}`);
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}
  
  function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str;
    limitLen -= tmp.length;
  
    for(let i=0;i<limitLen;i++) {
        tmp += ' ';
    }
  
    return tmp;
  }
  
  async function AutoMsgDelete(message, str, delay = 3000) {
    let msg = await message.channel.send(str);
  
    setTimeout(() => {
      msg.delete();
    }, delay);
  }

  function getEmbedFields(message, modify=false) {
    if(message.content == '' && message.embeds.length > 0) {
      let e = message.embeds[0].fields;
      let a = [];
  
      for(let i=0;i<e.length;i++) {
          a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
      }
  
      return a.join('');
    } else if(modify) {
      return message.author.lastMessage.content;
    } else {
      return message.content;
    }
  }
  
  function MessageSave(message, modify=false) {
    imgs = []
    if (message.attachments.array().length > 0) {
      message.attachments.array().forEach(x => {
        imgs.push(x.url+'\n')
      });
    }
  
    username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
    channelName = message.channel.type != 'dm' ? message.channel.name : ''
    try {
      username = username.length > 1 ? username.join('') : username
    } catch (error) {}
  
    try {
      channelName = channelName.length > 1 ? channelName.join('') : channelName
    } catch (error) {}
  
    var s = {
      ChannelType: message.channel.type,
      ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
      ChannelName: channelName,
      GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
      GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
      Message: getEmbedFields(message, modify),
      AuthorId: message.author.id,
      AuthorUsername: username + '#' + message.author.discriminator,
      AuthorBot: Number(message.author.bot),
      Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
      CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
    }
  
    s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message
  
    MessageAdd(
      s.ChannelType,
      s.ChannelId,
      s.ChannelName,
      s.GuildId,
      s.GuildName,
      s.Message,
      s.AuthorId,
      s.AuthorUsername,
      s.AuthorBot,
      s.Embed,
      s.CreateTime,
    )
      // .then((res) => {
      //   console.log('db 저장을 했다.', res);
      // })
      .catch(error => console.log(error))
  }  
  
  client.login(token);
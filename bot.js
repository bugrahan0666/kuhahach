const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const data = require('quick.db')
const moment = require("moment");
const ayarlar=require("./ayarlar.json");
const express = require('express');
const app = express()
app.get('/', (req, res) => res.send("Bot aktif edildi."))
app.listen(process.env.PORT, () => console.log('Port ayarlandı ' + process.env.PORT))


//


client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.login(ayarlar.token).then(c => console.log(`${client.user.tag} olarak giriş yapıldı!`)).catch(err => console.error("Bota giriş yapılırken başarısız olundu!"));
client.on('ready', async () => {
       client.user.setStatus('online')
  client.user.setActivity("Phentos ❤️ Rademoon");
console.log(`${client.user.username} ismiyle bağlandım.`);
})


const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklendi: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

//Rademoon chat
client.on("ready", () => {
  client.channels.cache.get("777285687988846640").join();
   //main dosyaya atılacak
})

//Chat Guard
//Küfür engel
client.on('message', async message => {
  if(message.channel.type !== 'text') return;
  const chat = await data.fetch(`chat.${message.guild.id}`);
  if(!chat) return;
  const blacklist = ["oruspu","orsubu","orusbu","pç","yarrak", "top", "ibne", "sequ", "sgmal", "am", "amcık", "yarak", "amkcoc", "anneni", "pic", "oros", "kitabını", "sikik", "sg", "sq", "mal", "annesiz", "allah", "allahını", "rabbini", "oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "oc", "ananı"];
  const uyarılar = [
  'Bu sunucu da küfürler engellenmektedir!',
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = message.content.split(' ');
  
  content.forEach(kelime => {
  if(blacklist.some(chat => chat === kelime))  {
  if(message.member.permissions.has('ADMINISTRATOR')) return;
  message.delete();
  message.channel.send
  (new Discord.MessageEmbed()  
.setColor('#36393e')
.setTimestamp()   
.setDescription(`${message.author} ${uyarımesaj}`)).then(m => m.delete(2000));
  }
  })
  
  });
  //Reklam engel
  client.on('message', async message => {
    if(message.channel.type !== 'text') return;
  const chat = await data.fetch(`chat.${message.guild.id}`);
  if(!chat) return;
  const blacklist = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];
  const uyarılar = [
  'Bu sunucu da reklamlar engellenmektedir!',
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  if(blacklist.some(a => message.content.includes(a)))  {
  if(message.member.permissions.has('ADMINISTRATOR')) return;
  message.delete();
  message.channel.send(
new Discord.MessageEmbed()  
.setColor('#36393e')
.setTimestamp()
.setDescription(`${message.author} ${uyarımesaj}`)).then(m => m.delete(2000));
  }
  
  });

//Capslock
client.on('message', async message => {
  if(message.channel.type !== 'text') return;
if(message.content.length >= 5) {

const chat = await data.fetch(`chat.${message.guild.id}`);
if(!chat) return;

let kontrol = message.content.toUpperCase()
if(message.content === kontrol) {

if(message.member.permissions.has('BAN_MEMBERS')) return;
if(message.mentions.users.first()) return;

return message.delete();

}}});
//Chat Guard Son
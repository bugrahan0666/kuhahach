const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('MOVE_MEMBERS')) return message.channel.send(embed.setColor('#36393e').setTitle(`Hata!`).setTimestamp().setDescription(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`))

if(!args[0]) return message.channel.send
(embed.setColor('#36393e')
 .setTimestamp()
.setDescription(`Chat guard sistemi açılmamış .hat aç yazarak açabilirsiniz.`))
if(args[0] === 'aç') {
data.set(`chat.${message.guild.id}`, true);
return message.channel.send
(embed.setColor('#36393e')
 .setTimestamp()
 .setThumbnail(message.author.avatarURL({ dynamic: true, }))
.setDescription(`Chat guard sistemi başarıyla açıldı.
\n**Açılan sistemler**
\`\`\`\n• Reklam engel sistemi
• Küfür engel sistemi
• Spam engel sistemi
• Capslock engel sistemi\n\`\`\`
**Not** Bu sistem belirli permler yani izinlere sahip olan kişilere etki etmeyecektir! (Yönetici)`))
} else if(args[0] === 'kapat') {
data.delete(`chat.${message.guild.id}`);
return message.channel.send
(embed.setColor('#36393e')
 .setTimestamp()
.setThumbnail(message.author.avatarURL({ dynamic: true, }))
.setDescription(`Chat guard sistemi başarıyla kapatıldı.
  \n**Kapatılan sistemler**
\`\`\`\n• Reklam engel sistemi
• Küfür engel sistemi
• Spam engel sistemi
• Capslock engel sistemi\n\`\`\`
**Not** Bu sistem belirli permler yani izinlere sahip olan kişilere etki etmeyecektir! (Yönetici)`))
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'chat'
};
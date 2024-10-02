const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
const { ActivityType } = require("discord.js"); // Bu satırı ekledim, ActivityType doğru kullanılacak.
const allah = require("../../config.json");

client.on('ready', async () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);

  // Sunucuyu ve üyeleri fetch etme
  let guild = client.guilds.cache.get(allah.GuildID);
  if (!guild) {
    console.error("Sunucu bulunamadı!");
    return;
  }
  await guild.members.fetch();

  // Ses kanalına katılma
  const connection = getVoiceConnection(allah.GuildID);
  if (!connection) {
    const VoiceChannel = client.channels.cache.get(allah.BotSesKanal);
    if (VoiceChannel && VoiceChannel.isVoiceBased()) { // Ses kanalı olduğundan emin olun
      joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true
      });
      console.log(`Bot başarıyla ${VoiceChannel.name} kanalına katıldı.`);
    } else {
      console.error("Ses kanalı bulunamadı veya geçersiz.");
    }
  }

  // Aktivite ayarlama
  let activities = allah.BotDurum, i = 0;
  setInterval(() => {
    client.user.setActivity({
      name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/PapazChavo"
    });
  }, 10000);
});

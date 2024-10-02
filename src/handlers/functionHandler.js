const { GuildMember, TextChannel, EmbedBuilder } = require("discord.js");
const client = global.bot;

module.exports = function (client) {
  // Kullanıcıyı fetch etme fonksiyonu
  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch {
      return undefined;
    }
  };

  // Kullanıcının ban bilgilerini fetch etme fonksiyonu
  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.bans.fetch(userID);
    } catch {
      return undefined;
    }
  };

  // Belirli bir süre bekleme fonksiyonu
  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Rolleri ayarlayan işlev
  GuildMember.prototype.setRoles = function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

  // Embed gönderme işlevi
  TextChannel.prototype.sendEmbed = function (embed) {
    if (!embed || !embed.description) return;
    const text = embed.description;
    for (let i = 0; i < Math.floor(text.length / 2048) + 1; i++) {
      this.send(embed.setDescription(text.slice(i * 2048, (i + 1) * 2048)));
    }
  };

  // Webhook ile mesaj gönderme işlevi
  TextChannel.prototype.wsend = async function (message) {
    const hooks = await this.fetchWebhooks();
    let webhook = hooks.find(a => a.name === client.user.username && a.owner.id === client.user.id);
    if (!webhook) {
      webhook = await this.createWebhook({ name: client.user.username, avatar: client.user.avatarURL() });
    }
    return webhook.send(message);
  };


  // Kullanıcının belirli bir role sahip olup olmadığını kontrol etme işlevi
  GuildMember.prototype.hasRole = function (role, every = true) {
    return (Array.isArray(role) && (every ? role.every(x => this.roles.cache.has(x)) : role.some(x => this.roles.cache.has(x))) || this.roles.cache.has(role));
  };

  // Dizi içerisinden rastgele bir öğe seçme işlevi
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
};

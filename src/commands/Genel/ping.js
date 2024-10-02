const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["ping"],  // Komutun alternatif isimleri
    name: "ping",       // Asıl komut adı
  },

  run: async (client, message, args) => {
    // Ping hesaplama
    const msg = await message.channel.send("🏓 Ping hesaplanıyor...");
    const latency = msg.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);

    // Buton oluşturma
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('pingButton')
          .setLabel('Tekrar Ping')
          .setStyle(ButtonStyle.Primary)
      );

    // Mesajın düzenlenmesi ve buton eklenmesi
    await msg.edit({
      content: `🏓 Pong! Gecikme: ${latency}ms. API gecikmesi: ${apiLatency}ms.`,
      components: [row],
    });

    // Buton etkileşimi için event dinleyicisi
    const filter = (interaction) => interaction.customId === 'pingButton' && interaction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'pingButton') {
        // Tekrar ping hesaplayıp kullanıcıya gösterme
        const newLatency = Date.now() - message.createdTimestamp;
        const newApiLatency = Math.round(client.ws.ping);
        await interaction.update({
          content: `🏓 Pong! Yeniden Gecikme: ${newLatency}ms. API Gecikmesi: ${newApiLatency}ms.`,
        });
      }
    });

    collector.on('end', () => {
      // Butonun kullanım süresi sona erdiğinde butonu devre dışı bırakma
      row.components[0].setDisabled(true);
      msg.edit({ components: [row] });
    });
  },
};

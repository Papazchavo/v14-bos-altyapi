const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')  // Komut adı
        .setDescription('Botun gecikme süresini gösterir.'),  // Komut açıklaması
    async execute(interaction) {
        // Komut tetiklendiğinde kullanıcıya yanıt verir
        const sent = await interaction.reply({ content: 'Ping hesaplanıyor...', fetchReply: true });

        // Ping değerini hesaplar ve güncellenmiş bir yanıt gönderir
        const ping = sent.createdTimestamp - interaction.createdTimestamp;
        const apiPing = Math.round(interaction.client.ws.ping);

        await interaction.editReply(`🏓 Pong! Gecikme: ${ping}ms, API gecikmesi: ${apiPing}ms`);
    },
};

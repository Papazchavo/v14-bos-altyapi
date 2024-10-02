const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageReactions, 
        GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.User]
});
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const allah = require("./config.json");

// Komutları yükleme
client.commands = new Collection();
client.slashcommands = new Collection();
const slashcommands = [];

fs.readdirSync('./src/Commands/').forEach(category => {
    const commandFiles = fs.readdirSync(`./src/Commands/${category}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./src/Commands/${category}/${file}`);
        client.commands.set(command.conf.name, command);
        command.conf.aliases.forEach(alias => client.commands.set(alias, command));
    }
});

fs.readdirSync('./src/Slashcommands/').forEach(category => {
    const slashFiles = fs.readdirSync(`./src/Slashcommands/${category}`).filter(file => file.endsWith('.js'));
    for (const file of slashFiles) {
        const command = require(`./src/Slashcommands/${category}/${file}`);
        client.slashcommands.set(command.data.name, command);
        slashcommands.push(command.data.toJSON());
    }
});

// Slash komutlarını Discord API'ye yükleme
const rest = new REST({ version: '10' }).setToken(allah.token);
(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(allah.BotClientID, allah.GuildID),
            { body: slashcommands }
        );
        console.log('[Bot] Slash komutları yüklendi.');
    } catch (error) {
        console.error('Slash komutları yüklenirken hata oluştu:', error);
    }
})();

// Slash komutlarının çalıştırılması
client.on('interactionCreate', async (interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand || interaction.user.bot) return;
    const command = client.slashcommands.get(interaction.commandName);
    if (!command) return interaction.reply({ content: "Bu komut kullanılamıyor.", ephemeral: true });

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error('Komut çalıştırılırken hata oluştu:', error);
        await interaction.reply({ content: "Komut çalıştırılırken bir hata meydana geldi!", ephemeral: true });
    }
});

// Botu başlatma
client.login(allah.token)
    .then(() => console.log("Bot başarıyla bağlandı!"))
    .catch(() => console.log("Bot bağlanamadı!"));

process.on("uncaughtException", (err) => {
    console.error("Beklenmedik bir hata oluştu:", err.stack);
});

process.on("unhandledRejection", (err) => {
    console.error("Promise hatası:", err);
});

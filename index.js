const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const config = require("./config");
const connectMongo = require("./database/mongoose");
const autoClose = require("./utils/autoClose");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("messageCreate", (message) => {
    require("./events/messageCreate")(message);
});

client.on("interactionCreate", (interaction) => {
    require("./events/interactionCreate")(interaction);
});


client.once("ready", async () => {
    await connectMongo();

    autoClose(client);

    console.log(`${client.user.tag} ist online.`);
});

client.login(config.token);
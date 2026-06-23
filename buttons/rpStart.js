const fs = require("fs");

const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction) => {

    const data = JSON.parse(
        fs.readFileSync("./data/status.json")
    );

    if (data.status === "started") {
        return interaction.reply({
            content: "❌ Das RP läuft bereits.",
            ephemeral: true
        });
    }

    const channel =
        interaction.client.channels.cache.get(
            config.statusChannelId
        );

    if (data.messageId) {
        try {
            const oldMessage =
                await channel.messages.fetch(data.messageId);

            await oldMessage.delete();
        } catch {}
    }

    const embed = new EmbedBuilder()
        .setTitle("🟢 RP Gestartet")
        .setDescription(config.startMessage)
        .setColor("Green")
        .setTimestamp();

    const msg = await channel.send({
        content: `<@&${config.pingRoleId}>`,
        embeds: [embed]
    });

    data.status = "started";
    data.messageId = msg.id;

    fs.writeFileSync(
        "./data/status.json",
        JSON.stringify(data, null, 2)
    );

    await interaction.reply({
        content: "✅ RP gestartet.",
        ephemeral: true
    });
};
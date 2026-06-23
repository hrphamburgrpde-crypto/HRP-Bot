const fs = require("fs");

const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");

module.exports = async (interaction) => {

    const data = JSON.parse(
        fs.readFileSync("./data/status.json")
    );

    if (data.status === "stopped") {
        return interaction.reply({
            content: "❌ Das RP ist bereits gestoppt.",
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
        .setTitle("🔴 RP Gestoppt")
        .setDescription(config.stopMessage)
        .setColor("Red")
        .setTimestamp();

    const msg = await channel.send({
        embeds: [embed]
    });

    data.status = "stopped";
    data.messageId = msg.id;

    fs.writeFileSync(
        "./data/status.json",
        JSON.stringify(data, null, 2)
    );

    await interaction.reply({
        content: "✅ RP gestoppt.",
        ephemeral: true
    });
};
const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = async (interaction) => {

    const channel = interaction.client.channels.cache.get(
        config.raidChannelId
    );

    const embed = new EmbedBuilder()
        .setTitle("✅ Raid Beendet")
        .setDescription(config.raidEndMessage)
        .setColor("Green")
        .setTimestamp();

    await channel.send({
        embeds: [embed]
    });

    await interaction.reply({
        content: "✅ Raid-Ende gesendet.",
        ephemeral: true
    });
};
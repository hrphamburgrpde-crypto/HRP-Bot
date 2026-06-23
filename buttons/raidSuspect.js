const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = async (interaction) => {

    const channel = interaction.client.channels.cache.get(
        config.raidChannelId
    );

    const embed = new EmbedBuilder()
        .setTitle("⚠️ Raid Verdacht")
        .setDescription(config.raidSuspectMessage)
        .setColor("Yellow")
        .setTimestamp();

    await channel.send({
        content: `<@&${config.raidPingRoleId}>`,
        embeds: [embed]
    });

    await interaction.reply({
        content: "✅ Raid-Verdacht gesendet.",
        ephemeral: true
    });
};
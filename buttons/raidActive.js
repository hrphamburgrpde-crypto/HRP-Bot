const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = async (interaction) => {

    const channel = interaction.client.channels.cache.get(
        config.raidChannelId
    );

    const embed = new EmbedBuilder()
        .setTitle("🚨 Aktiver Raid")
        .setDescription(config.raidActiveMessage)
        .setColor("Red")
        .setTimestamp();

    await channel.send({
        content: `<@&${config.raidPingRoleId}>`,
        embeds: [embed]
    });

    await interaction.reply({
        content: "✅ Aktiver Raid gemeldet.",
        ephemeral: true
    });
};
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()
        .setTitle("HRP In-Game Panel")
        .setDescription("Verwalte Raid- und Hilferufe über die Buttons.")
        .setColor("Orange");

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("raid_suspect")
                .setLabel("Raid Verdacht")
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("raid_active")
                .setLabel("Aktiver Raid")
                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
                .setCustomId("raid_end")
                .setLabel("Raid Ende")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId("ingame_help")
                .setLabel("Ingame Hilfe")
                .setStyle(ButtonStyle.Primary)
        );

    await message.channel.send({
        embeds: [embed],
        components: [row]
    });
};
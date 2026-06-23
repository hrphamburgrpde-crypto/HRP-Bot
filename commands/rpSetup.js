const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()
        .setTitle("🚔 HRP RP Verwaltung")
        .setDescription("Verwalte das RP über die Buttons.")
        .setColor("Blue");

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("rp_start")
                .setLabel("RP Start")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId("rp_stop")
                .setLabel("RP Stop")
                .setStyle(ButtonStyle.Danger)
        );

    await message.channel.send({
        embeds: [embed],
        components: [row]
    });
};
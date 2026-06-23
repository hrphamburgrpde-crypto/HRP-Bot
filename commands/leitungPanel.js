const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()
        .setTitle("HRP Leitungs Panel")
        .setDescription("Verwaltung für die Serverleitung.")
        .setColor("Gold");

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("team_meeting")
                .setLabel("Team Meeting")
                .setStyle(ButtonStyle.Primary)
        );

    await message.channel.send({
        embeds: [embed],
        components: [row]
    });
};
const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()
        .setCustomId("team_meeting_modal")
        .setTitle("Team Meeting");

    const title = new TextInputBuilder()
        .setCustomId("meeting_title")
        .setLabel("Titel")
        .setStyle(TextInputStyle.Short);

    const date = new TextInputBuilder()
        .setCustomId("meeting_date")
        .setLabel("Datum")
        .setStyle(TextInputStyle.Short);

    const time = new TextInputBuilder()
        .setCustomId("meeting_time")
        .setLabel("Uhrzeit")
        .setStyle(TextInputStyle.Short);

    const place = new TextInputBuilder()
        .setCustomId("meeting_place")
        .setLabel("Ort")
        .setStyle(TextInputStyle.Short);

    const info = new TextInputBuilder()
        .setCustomId("meeting_info")
        .setLabel("Informationen")
        .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
        new ActionRowBuilder().addComponents(title),
        new ActionRowBuilder().addComponents(date),
        new ActionRowBuilder().addComponents(time),
        new ActionRowBuilder().addComponents(place),
        new ActionRowBuilder().addComponents(info)
    );

    await interaction.showModal(modal);
};
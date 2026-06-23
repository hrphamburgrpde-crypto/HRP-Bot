const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()
        .setCustomId("training_modal")
        .setTitle("Admin-Ausbildung");

    const title = new TextInputBuilder()
        .setCustomId("training_title")
        .setLabel("Titel")
        .setStyle(TextInputStyle.Short);

    const date = new TextInputBuilder()
        .setCustomId("training_date")
        .setLabel("Datum")
        .setStyle(TextInputStyle.Short);

    const from = new TextInputBuilder()
        .setCustomId("training_from")
        .setLabel("Von")
        .setStyle(TextInputStyle.Short);

    const to = new TextInputBuilder()
        .setCustomId("training_to")
        .setLabel("Bis")
        .setStyle(TextInputStyle.Short);

    const max = new TextInputBuilder()
        .setCustomId("training_max")
        .setLabel("Max Teilnehmer")
        .setStyle(TextInputStyle.Short);

    modal.addComponents(
        new ActionRowBuilder().addComponents(title),
        new ActionRowBuilder().addComponents(date),
        new ActionRowBuilder().addComponents(from),
        new ActionRowBuilder().addComponents(to),
        new ActionRowBuilder().addComponents(max)
    );

    await interaction.showModal(modal);
};
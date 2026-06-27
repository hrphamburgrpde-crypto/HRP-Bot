const { EmbedBuilder } = require("discord.js");
const Training = require("../models/Training");

module.exports = async (interaction) => {

    const trainings = await Training.find().sort({
        date: 1
    });

    if (trainings.length === 0) {
        return interaction.reply({
            content: "❌ Es sind aktuell keine Admin-Ausbildungen eingetragen.",
            ephemeral: true
        });
    }

    const embed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle("📚 Anstehende Admin-Ausbildungen")
        .setDescription(
            "Hier findest du alle offenen Admin-Ausbildungen."
        );

    trainings.forEach(training => {

        embed.addFields({
            name: `📚 ${training.title}`,
            value:
`📅 **Datum:** ${training.date}
🕒 **Zeit:** ${training.from} - ${training.to}
👥 **Teilnehmer:** ${training.participants.length}/${training.max}`,
            inline: false
        });

    });

    await interaction.reply({
        embeds: [embed],
        ephemeral: true
    });

};
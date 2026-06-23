const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

module.exports = async (interaction) => {

    const trainings = JSON.parse(
        fs.readFileSync("./data/trainings.json")
    );

    if (Object.keys(trainings).length === 0) {
        return interaction.reply({
            content: "❌ Keine Ausbildungen vorhanden.",
            ephemeral: true
        });
    }

    let text = "";

    for (const id in trainings) {

        text +=
            `📚 ${trainings[id].title}\n` +
            `👥 ${trainings[id].participants.length}/${trainings[id].max}\n\n`;
    }

    const embed = new EmbedBuilder()
        .setTitle("📅 Anstehende Ausbildungen")
        .setDescription(text)
        .setColor("Blue");

    await interaction.reply({
        embeds: [embed],
        ephemeral: true
    });
};
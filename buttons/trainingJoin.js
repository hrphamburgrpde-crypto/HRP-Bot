const fs = require("fs");
const { EmbedBuilder } = require("discord.js");

module.exports = async (interaction) => {

    const trainings = JSON.parse(
        fs.readFileSync("./data/trainings.json")
    );

    const trainingId = interaction.message.id;

    if (!trainings[trainingId]) {
        return interaction.reply({
            content: "❌ Ausbildung nicht gefunden.",
            ephemeral: true
        });
    }

    const userId = interaction.user.id;

    if (trainings[trainingId].participants.includes(userId)) {
        return interaction.reply({
            content: "❌ Du bist bereits angemeldet.",
            ephemeral: true
        });
    }

    if (
        trainings[trainingId].participants.length >=
        trainings[trainingId].max
    ) {
        return interaction.reply({
            content: "❌ Ausbildung ist bereits voll.",
            ephemeral: true
        });
    }

    trainings[trainingId].participants.push(userId);

    fs.writeFileSync(
        "./data/trainings.json",
        JSON.stringify(trainings, null, 2)
    );

    const participantList =
        trainings[trainingId].participants
            .map(id => `• <@${id}>`)
            .join("\n");

    const embed = EmbedBuilder.from(
        interaction.message.embeds[0]
    );

    embed.data.fields[4].value =
        `${trainings[trainingId].participants.length} / ${trainings[trainingId].max}`;

    embed.data.fields[5].value =
        participantList;

    const current =
    trainings[trainingId].participants.length;

const max =
    trainings[trainingId].max;

if (current >= max) {

    const row =
        interaction.message.components[0];

    row.components[0].data.disabled = true;
    row.components[0].data.label =
        "❌ Ausbildung voll";

    await interaction.message.edit({
        embeds: [embed],
        components: [row]
    });

} else {

    await interaction.message.edit({
        embeds: [embed]
    });

}
const config = require("../config");

const logChannel =
    interaction.client.channels.cache.get(
        config.ausbildungLogChannelId
    );

if (logChannel) {

    const { EmbedBuilder } = require("discord.js");

    const logEmbed = new EmbedBuilder()
        .setTitle("📚 Neue Ausbildungsanmeldung")
        .setColor("Green")
        .addFields(
            {
                name: "👤 Benutzer",
                value: `${interaction.user}`,
                inline: true
            },
            {
                name: "📖 Ausbildung",
                value: trainings[trainingId].title,
                inline: true
            }
        )
        .setTimestamp();

    await logChannel.send({
        embeds: [logEmbed]
    });
}
    await interaction.reply({
        content: "✅ Du wurdest angemeldet.",
        ephemeral: true
    });
};
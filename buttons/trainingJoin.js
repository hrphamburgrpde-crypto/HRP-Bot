const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const Training = require("../models/Training");
const config = require("../config");

module.exports = async (interaction) => {

    const training = await Training.findOne({
        messageId: interaction.message.id
    });

    if (!training) {
        return interaction.reply({
            content: "❌ Diese Ausbildung wurde nicht gefunden.",
            ephemeral: true
        });
    }

    const userId = interaction.user.id;

    if (training.participants.includes(userId)) {
        return interaction.reply({
            content: "❌ Du bist bereits angemeldet.",
            ephemeral: true
        });
    }

    if (training.participants.length >= training.max) {
        return interaction.reply({
            content: "❌ Diese Ausbildung ist bereits voll.",
            ephemeral: true
        });
    }

    training.participants.push(userId);

    await training.save();

    const participantList =
        training.participants
            .map(id => `• <@${id}>`)
            .join("\n");

    const embed = EmbedBuilder.from(
        interaction.message.embeds[0]
    );

    embed.data.fields[4].value =
        `${training.participants.length} / ${training.max}`;

    embed.data.fields[5].value =
        participantList;

    let row;

    if (training.participants.length >= training.max) {

        row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("training_full")
                    .setLabel("❌ Ausbildung voll")
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true)
            );

    } else {

        row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("training_join")
                    .setLabel("✅ Anmelden")
                    .setStyle(ButtonStyle.Success)
            );

    }

    await interaction.message.edit({
        embeds: [embed],
        components: [row]
    });

    const logChannel =
        interaction.client.channels.cache.get(
            config.ausbildungLogChannelId
        );

    if (logChannel) {

        const logEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("📚 Neue Ausbildungsanmeldung")
            .addFields(
                {
                    name: "👤 Benutzer",
                    value: `${interaction.user}`,
                    inline: true
                },
                {
                    name: "📖 Ausbildung",
                    value: training.title,
                    inline: true
                }
            )
            .setTimestamp();

        await logChannel.send({
            embeds: [logEmbed]
        });

    }

    return interaction.reply({
        content: "✅ Du wurdest erfolgreich angemeldet.",
        ephemeral: true
    });

};
const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");
const Meeting = require("../models/Meeting");

module.exports = async (interaction) => {

    const meeting = await Meeting.findOne({
        messageId: interaction.message.id
    });

    if (!meeting) {
        return interaction.reply({
            content: "❌ Meeting nicht gefunden.",
            ephemeral: true
        });
    }

    if (meeting.participants.includes(interaction.user.id)) {
        return interaction.reply({
            content: "❌ Du bist bereits angemeldet.",
            ephemeral: true
        });
    }

    meeting.participants.push(interaction.user.id);

    await meeting.save();

    const embed = EmbedBuilder.from(
        interaction.message.embeds[0]
    );

    embed.data.fields[4].name =
        `👥 Teilnehmer (${meeting.participants.length})`;

    embed.data.fields[4].value =
        meeting.participants
            .map(id => `• <@${id}>`)
            .join("\n");

    await interaction.message.edit({
        embeds: [embed]
    });

    const logChannel =
        interaction.client.channels.cache.get(
            config.meetingLogChannelId
        );

    if (logChannel) {

        await logChannel.send({

            embeds: [

                new EmbedBuilder()

                    .setColor("Green")

                    .setTitle("📋 Neue Meeting-Anmeldung")

                    .addFields(

                        {
                            name: "👤 Benutzer",
                            value: `${interaction.user}`,
                            inline: true
                        },

                        {
                            name: "📢 Meeting",
                            value: meeting.title,
                            inline: true
                        }

                    )

                    .setTimestamp()

            ]

        });

    }

    return interaction.reply({

        content: "✅ Du wurdest erfolgreich angemeldet.",

        ephemeral: true

    });

};
const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = async (interaction) => {

    const meetings = JSON.parse(
        fs.readFileSync("./data/meetings.json")
    );

    const meetingId = interaction.message.id;

    if (!meetings[meetingId]) {
        return interaction.reply({
            content: "❌ Meeting nicht gefunden.",
            ephemeral: true
        });
    }

    const userId = interaction.user.id;

    if (meetings[meetingId].participants.includes(userId)) {
        return interaction.reply({
            content: "❌ Du bist bereits angemeldet.",
            ephemeral: true
        });
    }

    meetings[meetingId].participants.push(userId);

    fs.writeFileSync(
        "./data/meetings.json",
        JSON.stringify(meetings, null, 2)
    );

    const participantList = meetings[meetingId].participants
        .map(id => `• <@${id}>`)
        .join("\n");

    const embed = EmbedBuilder.from(
        interaction.message.embeds[0]
    );

    embed.data.fields[4].name =
    `👥 Teilnehmer (${meetings[meetingId].participants.length})`;

embed.data.fields[4].value =
    participantList || "Keine Teilnehmer";

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
                    .setTitle("📋 Neue Meeting-Anmeldung")
                    .setColor("Green")
                    .addFields(
                        {
                            name: "👤 Benutzer",
                            value: `${interaction.user}`,
                            inline: true
                        },
                        {
                            name: "📢 Meeting",
                            value: meetings[meetingId].title,
                            inline: true
                        }
                    )
                    .setTimestamp()
            ]
        });
    }

    await interaction.reply({
        content: "✅ Du wurdest erfolgreich angemeldet.",
        ephemeral: true
    });
};
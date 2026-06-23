const fs = require("fs");
const config = require("../config");

const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const rpStart = require("../buttons/rpStart");
const rpStop = require("../buttons/rpStop");

const raidSuspect = require("../buttons/raidSuspect");
const raidActive = require("../buttons/raidActive");
const raidEnd = require("../buttons/raidEnd");
const ingameHelp = require("../buttons/ingameHelp");

const teamMeeting = require("../buttons/teamMeeting");
const meetingJoin = require("../buttons/meetingJoin");

module.exports = async (interaction) => {

    try {

        // TEAM MEETING MODAL
        if (interaction.isModalSubmit()) {

            if (interaction.customId === "team_meeting_modal") {

                const title =
                    interaction.fields.getTextInputValue("meeting_title");

                const date =
                    interaction.fields.getTextInputValue("meeting_date");

                const time =
                    interaction.fields.getTextInputValue("meeting_time");

                const place =
                    interaction.fields.getTextInputValue("meeting_place");

                const info =
                    interaction.fields.getTextInputValue("meeting_info");

                const channel =
                    interaction.client.channels.cache.get(
                        config.leitungChannelId
                    );

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("meeting_join")
                            .setLabel("✅ Anmelden")
                            .setStyle(ButtonStyle.Success)
                    );

                const embed = new EmbedBuilder()
    .setTitle(`📢 TEAM MEETING | ${title}`)
    .setColor("#0099ff")
    .setThumbnail(interaction.guild.iconURL())
    .setAuthor({
        name: "HRP Hamburg RP",
        iconURL: interaction.guild.iconURL()
    })
    .setDescription(
`━━━━━━━━━━━━━━━━━━━━━━

📢 **Ein neues Team Meeting wurde angekündigt**

Bitte melde dich über den Button unten an.

━━━━━━━━━━━━━━━━━━━━━━`
    )
    .addFields(
        {
            name: "📅 Datum",
            value: `>>> ${date}`,
            inline: true
        },
        {
            name: "🕒 Uhrzeit",
            value: `>>> ${time}`,
            inline: true
        },
        {
            name: "🎤 Ort",
            value: `>>> ${place}`,
            inline: true
        },
        {
            name: "📝 Informationen",
            value: `>>> ${info}`,
            inline: false
        },
        {
            name: "👥 Teilnehmer (0)",
            value: ">>> Noch keine Teilnehmer",
            inline: false
        }

    )
    .setImage(
        "https://cdn.discordapp.com/attachments/1519042587976007751/1519049105840803908/file_00000000d784720aa41c483a0b5e5279.png?ex=6a3c2439&is=6a3ad2b9&hm=77db128798f90e1698ff9cf6900e38d59742419722b687ffb9de58eab7df3449&"
    )
    .setFooter({
        text: `HRP Leitung • ${interaction.guild.name}`
    })
    .setTimestamp();

                const msg = await channel.send({
    content: `<@&${config.raidPingRoleId}>`,
    embeds: [embed],
    components: [button]
});

                const meetings =
                    JSON.parse(
                        fs.readFileSync(
                            "./data/meetings.json"
                        )
                    );

                meetings[msg.id] = {
                    title,
                    participants: []
                };

                fs.writeFileSync(
                    "./data/meetings.json",
                    JSON.stringify(meetings, null, 2)
                );

                return interaction.reply({
                    content: "✅ Meeting erstellt.",
                    ephemeral: true
                });
            }
        }

        // BUTTONS
        if (!interaction.isButton()) return;

        if (interaction.customId === "rp_start") {
            return rpStart(interaction);
        }

        if (interaction.customId === "rp_stop") {
            return rpStop(interaction);
        }

        if (interaction.customId === "raid_suspect") {
            return raidSuspect(interaction);
        }

        if (interaction.customId === "raid_active") {
            return raidActive(interaction);
        }

        if (interaction.customId === "raid_end") {
            return raidEnd(interaction);
        }

        if (interaction.customId === "ingame_help") {
            return ingameHelp(interaction);
        }

        if (interaction.customId === "team_meeting") {
            return teamMeeting(interaction);
        }

        if (interaction.customId === "meeting_join") {
            return meetingJoin(interaction);
        }

    } catch (err) {
        console.error(err);
    }
};
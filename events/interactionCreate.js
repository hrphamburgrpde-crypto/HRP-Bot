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

const createTraining = require("../buttons/createTraining");
const trainingList = require("../buttons/trainingList");
const trainingJoin = require("../buttons/trainingJoin");

module.exports = async (interaction) => {

    try {

        // MODALS
        if (interaction.isModalSubmit()) {

            // TRAINING MODAL
            if (interaction.customId === "training_modal") {

    const title =
        interaction.fields.getTextInputValue("training_title");

    const date =
        interaction.fields.getTextInputValue("training_date");

    const from =
        interaction.fields.getTextInputValue("training_from");

    const to =
        interaction.fields.getTextInputValue("training_to");

    const max =
        interaction.fields.getTextInputValue("training_max");

    const channel =
        interaction.client.channels.cache.get(
            config.ausbildungChannelId
        );

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("training_join")
                .setLabel("✅ Anmelden")
                .setStyle(ButtonStyle.Success)
        );

    const embed = new EmbedBuilder()
        .setTitle("👨‍💼 ADMIN-AUSBILDUNG")
        .setColor("Orange")
        .setThumbnail(interaction.guild.iconURL())
        .addFields(
            {
                name: "📚 Titel",
                value: title,
                inline: false
            },
            {
                name: "📅 Datum",
                value: date,
                inline: true
            },
            {
                name: "🕒 Zeit",
                value: `${from} - ${to}`,
                inline: true
            },
            {
                name: "👤 Ausbilder",
                value: `${interaction.user}`,
                inline: false
            },
            {
                name: "👥 Plätze",
                value: `0 / ${max}`,
                inline: false
            },
            {
                name: "📋 Teilnehmer",
                value: "Keine Teilnehmer",
                inline: false
            }
        )
        .setFooter({
            text: "HRP Admin Ausbildung"
        })
        .setTimestamp();

    const msg = await channel.send({
        embeds: [embed],
        components: [row]
    });

    const trainings =
        JSON.parse(
            fs.readFileSync("./data/trainings.json")
        );

    trainings[msg.id] = {
        title,
        max: Number(max),
        participants: []
    };

    fs.writeFileSync(
        "./data/trainings.json",
        JSON.stringify(trainings, null, 2)
    );

    return interaction.reply({
        content: "✅ Ausbildung erstellt.",
        ephemeral: true
    });
}

            // TEAM MEETING MODAL
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
                        "https://cdn.discordapp.com/attachments/1519042587976007751/1519049105840803908/file_00000000d784720aa41c483a0b5e5279.png"
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

                const meetings = JSON.parse(
                    fs.readFileSync("./data/meetings.json")
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

        console.log("Button:", interaction.customId);

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

        if (interaction.customId === "training_create") {
            return createTraining(interaction);
        }

        if (interaction.customId === "training_list") {
            return trainingList(interaction);
        }

        if (interaction.customId === "training_join") {
            return trainingJoin(interaction);
        }

    } catch (err) {
        console.error(err);
    }

};
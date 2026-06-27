const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const Training = require("../models/Training");
const Meeting = require("../models/Meeting");

module.exports = (client) => {

    setInterval(async () => {

        const trainings =
            await Training.find({
                status: "open"
            });

        const now = new Date();

        for (const training of trainings) {
const meetings = await Meeting.find({
    status: "open"
});

for (const meeting of meetings) {

    const [day, month, year] =
        meeting.date.split(".");

    const [hour, minute] =
        meeting.time.split(":");

    const meetingDate = new Date(
        year,
        month - 1,
        day,
        hour,
        minute
    );

    if (now < meetingDate)
        continue;

    meeting.status = "closed";

    await meeting.save();

    try {

        const channel =
            await client.channels.fetch(
                meeting.messageChannelId
            );

        const message =
            await channel.messages.fetch(
                meeting.messageId
            );

        const embed =
            EmbedBuilder.from(
                message.embeds[0]
            );

        embed.setColor("Red");

        embed.addFields({

            name: "🔒 Status",

            value: "Meeting beendet",

            inline: false

        });

        const row =
            new ActionRowBuilder()

                .addComponents(

                    new ButtonBuilder()

                        .setCustomId("meeting_closed")

                        .setLabel("🔒 Anmeldung geschlossen")

                        .setDisabled(true)

                        .setStyle(ButtonStyle.Secondary)

                );

        await message.edit({

            embeds: [embed],

            components: [row]

        });

        console.log(
            `${meeting.title} geschlossen`
        );

    } catch (err) {

        console.log(err);

    }

}

            const [day, month, year] =
                training.date.split(".");

            const [hour, minute] =
                training.to.split(":");

            const endDate = new Date(
                year,
                month - 1,
                day,
                hour,
                minute
            );

            if (now < endDate)
                continue;

            training.status = "closed";

            await training.save();

            try {

                const channel =
                    await client.channels.fetch(
                        training.messageChannelId
                    );

                const message =
                    await channel.messages.fetch(
                        training.messageId
                    );

                const embed =
                    EmbedBuilder.from(
                        message.embeds[0]
                    );

                embed.setColor("Red");

                embed.addFields({
                    name: "🔒 Status",
                    value: "Beendet",
                    inline: false
                });

                const row =
                    new ActionRowBuilder()

                        .addComponents(

                            new ButtonBuilder()

                                .setCustomId("training_closed")

                                .setLabel("🔒 Anmeldung geschlossen")

                                .setDisabled(true)

                                .setStyle(ButtonStyle.Secondary)

                        );

                await message.edit({

                    embeds: [embed],

                    components: [row]

                });

                console.log(
                    `${training.title} geschlossen`
                );

            } catch (err) {

                console.log(err);

            }

        }

    }, 60000);

};
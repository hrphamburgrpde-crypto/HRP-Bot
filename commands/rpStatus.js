const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");
const statusEmbed = require("../embeds/statusEmbed");

module.exports = async (message) => {

    const data = JSON.parse(
        fs.readFileSync("./data/status.json")
    );

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("rp_start")
                .setLabel("RP Start")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId("rp_stop")
                .setLabel("RP Stopp")
                .setStyle(ButtonStyle.Danger)
        );

    await message.channel.send({
        embeds: [statusEmbed(data.status)],
        components: [row]
    });
};
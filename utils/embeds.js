const { EmbedBuilder } = require("discord.js");

function createStatusEmbed(status) {
    return new EmbedBuilder()
        .setTitle("🚔 HRP RP Status")
        .setDescription(`Status: **${status}**`);
}

module.exports = { createStatusEmbed };
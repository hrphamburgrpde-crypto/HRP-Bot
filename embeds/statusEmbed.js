const { EmbedBuilder } = require("discord.js");

module.exports = (status) => {
    return new EmbedBuilder()
        .setTitle("🚔 HRP RP Status")
        .setDescription(`Aktueller Status: **${status}**`)
        .setColor(status === "Aktiv" ? "Green" : "Red")
        .setTimestamp();
};
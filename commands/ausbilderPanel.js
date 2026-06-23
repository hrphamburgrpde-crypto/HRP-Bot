const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()
        .setTitle("👨‍💼 HRP Admin-Ausbilder Panel")
        .setDescription(
            "Verwaltung von Admin-Ausbildungen.\n\n" +
            "Nutze die Buttons unten."
        )
        .setColor("Orange");

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("training_create")
                .setLabel("📚 Ausbildung Eintragen")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("training_list")
                .setLabel("📅 Anstehende Ausbildungen")
                .setStyle(ButtonStyle.Secondary)
        );

    await message.channel.send({
        embeds: [embed],
        components: [row]
    });
};
const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = async (interaction) => {

    const channel = interaction.client.channels.cache.get(
        config.raidChannelId
    );

    const embed = new EmbedBuilder()
        .setTitle("🆘 In-Game Hilfe")
        .setDescription(`
Ingame Hilfe wurde angefordert.

Bitte komme, wenn du kannst und reagiere unten.

✅ = Ich kann kommen

❌ = Ich kann nicht kommen

❓ = Ich kann vielleicht kommen

**HRP**
`)
        .setColor("Blue")
        .setTimestamp();

    const msg = await channel.send({
        content: `<@&${config.raidPingRoleId}>`,
        embeds: [embed]
    });

    await msg.react("✅");
    await msg.react("❌");
    await msg.react("❓");

    await interaction.reply({
        content: "✅ Hilfeanfrage gesendet.",
        ephemeral: true
    });
};
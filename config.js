require("dotenv").config();

module.exports = {
    token: process.env.TOKEN,

    statusChannelId: process.env.RP_STATUS_CHANNEL_ID,
    pingRoleId: process.env.RP_PING_ROLE_ID,

    raidChannelId: process.env.RAID_CHANNEL_ID,
    raidPingRoleId: process.env.RAID_PING_ROLE_ID,

    leitungChannelId: process.env.LEITUNG_CHANNEL_ID,
    meetingLogChannelId: process.env.MEETING_LOG_CHANNEL_ID,

    startMessage: `
🚔 Das RP wurde gestartet!

joint gerne dem Server.
Join Code:eawmpf85

Viel Spaß beim Roleplay!
`,

    stopMessage: `
🔴 Das RP wurde beendet.

Vielen Dank fürs Mitspielen!
`,

    raidSuspectMessage: `
⚠️ Es besteht ein Raid-Verdacht.

Bitte aufmerksam bleiben und Regelverstöße melden.
`,

    raidActiveMessage: `
🚨 AKTIVER RAID

Das Team untersucht aktuell die Situation.
Bitte Ruhe bewahren.
`,

    raidEndMessage: `
✅ Raid beendet.

Die Situation wurde geklärt.
`
};
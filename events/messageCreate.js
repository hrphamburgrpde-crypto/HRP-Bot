const rpSetup = require("../commands/rpSetup");
const codeSetup = require("../commands/codeSetup");
const leitungPanel = require("../commands/leitungPanel");
const ausbilderPanel = require("../commands/ausbilderPanel");

module.exports = async (message) => {

    if (message.author.bot) return;

    console.log(message.content);

    try {

        if (message.content === "!rp_setup") {
            await rpSetup(message);
        }

        if (message.content === "!code_setup") {
            await codeSetup(message);
        }

        if (message.content === "!leitung_panel") {
            await leitungPanel(message);
        }

        if (message.content === "!ausbilder_panel") {
            console.log("Ausbilder Panel erkannt");
            await ausbilderPanel(message);
        }

    } catch (err) {
        console.error(err);
    }
};
const mongoose = require("mongoose");
const config = require("../config");

module.exports = async () => {
    try {
console.log(config.mongoUri);
        await mongoose.connect(config.mongoUri);

        console.log("✅ MongoDB verbunden");
    } catch (err) {
        console.error("MongoDB Fehler:");
        console.error(err);
    }
};
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({

    messageId: String,
    messageChannelId: String,

    title: String,
    date: String,
    from: String,
    to: String,

    max: Number,

    creatorId: String,

    status: {
        type: String,
        default: "open"
    },

    participants: {
        type: [String],
        default: []
    },

    reminders: {
        hour: {
            type: Boolean,
            default: false
        },
        halfHour: {
            type: Boolean,
            default: false
        },
        tenMinutes: {
            type: Boolean,
            default: false
        }
    }

});

module.exports = mongoose.model("Training", trainingSchema);
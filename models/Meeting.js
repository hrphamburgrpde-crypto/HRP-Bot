const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({

    messageId: String,
    messageChannelId: String,

    title: String,
    date: String,
    time: String,
    place: String,
    info: String,

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

module.exports = mongoose.model("Meeting", meetingSchema);
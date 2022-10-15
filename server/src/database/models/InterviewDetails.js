const mongoose = require("mongoose")

const InterviewDetails = mongoose.Schema({
    title : String,
    date : String,
    position: String,
    start_time : String,
    end_time : String,
    candidates : Array,
    send : Boolean
});

module.exports = mongoose.model("InterviewDetails", InterviewDetails);
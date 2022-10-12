const mongoose = require("mongoose")

const InterviewDetails = mongoose.Schema({
    title : String,
    date : String,
    start_time : String,
    end_time : String,
    candidates : Array
});

module.exports = mongoose.model("InterviewDetails", InterviewDetails);
const mongoose = require('mongoose')

const Candidate = {
    _id : {
        type : String,
        required : true
    },
    name : String,
    college : String,
    position : String
}

module.exports = mongoose.model("Candidate", Candidate);
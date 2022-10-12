const mongoose = require('mongoose')

const Candidate = {
    _id : {
        type : String,
        required : true
    },
    name : String
}

module.exports = mongoose.model("Candidate", Candidate);
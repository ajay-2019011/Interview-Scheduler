const constants = require('../constants/constants')
const {connect, disconnect} = require('../database/dbservice/dbservice.js')
const Candidate = require('../database/models/Candidate')
const emailer = require('nodemailer');
const InterviewDetails = require('../database/models/InterviewDetails')
const convertToMinutes = require('../utils/helpers/convertToMinutes')

class Candidates
{
    static async sendEmails(req, res, next)
    {
        if(req.body.send){
            var action;
            if(req.opcode === constants.opcode.CREATE_MEETING)
                action = 'scheduled'
            else if(req.opcode === constants.opcode.UPDATE_MEETING)
                action = 'rescheduled'
            else if(req.opcode === constants.opcode.DELETE_MEETING) 
                action = 'cancelled'
            
            console.log("Credentials ",process.env.SENDER_EMAILID,process.env.SENDER_PASSWORD)

            var transporter = emailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_EMAILID,
                    pass: process.env.SENDER_PASSWORD
                }
            })

            req.body.candidates.forEach(async(candidate) => {
                var mailOptions = {
                    from: process.env.SENDER_EMAILID,
                    to: candidate,
                    subject: `${req.body.title}`,
                    text: `Hello, this mail is regarding ${req.body.title} on ${req.body.date} having
                    timings from ${req.body.start_time} to ${req.body.end_time} has been ${action}.`
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    
                    }
                });
            });
        }
        
        next()
    }

    static async availableSlots(req, res, next)
    {
        req.ok = true
        req.opcode = constants.opcode.LIST_AVAILABLE_SLOTS

        var date = req.body.date
        var candidatesList = req.body.candidates

        try
        {
            if(date === null || date === undefined || candidatesList === null || candidatesList === undefined)
                throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)

            //Connect to the database
            await connect()

            var scheduledInterviews = await InterviewDetails.find({date: date});
            var booked_slots = []

            scheduledInterviews.forEach(interview => {
                for(let i=0;i<interview.candidates.length;i++)
                {
                    if(candidatesList.includes(interview.candidates[i]))
                    {
                        console.log(interview.candidates[i])
                        booked_slots.push([interview.start_time, interview.end_time])
                        break;
                    }
                }
            });

            var available_slots = [];

            if(booked_slots.length === 0){
                available_slots.push({start_time:"09:00",end_time: "23:00"});
            }
            else {
                booked_slots.sort((a, b) =>  a[0]<b[0])

                // meeting will only be scheduled between 9:00am to 11:00pm (540 min - 1380)
                

                if(convertToMinutes(booked_slots[0][0]) > convertToMinutes("09:00")){
                    available_slots.push({start_time:"09:00",end_time: booked_slots[0][0]});
                }

                let last_end_time = booked_slots[0][1], n = booked_slots.length;

                for(let i = 1; i < n; i++) {
                    if(convertToMinutes(booked_slots[i][0]) > convertToMinutes(last_end_time)){
                        available_slots.push({start_time: last_end_time, end_time : booked_slots[i][0]})
                    }
                    if(convertToMinutes(booked_slots[i][1]) > convertToMinutes(last_end_time)){
                        last_end_time = booked_slots[i][1]
                    }
                }

                if(convertToMinutes(last_end_time) < convertToMinutes("23:00"))
                    available_slots.push({start_time: last_end_time, end_time: "23:00"})

            }
            
            console.log("Available slots", available_slots)
            console.log("Previously Booked Slots", booked_slots)

            req.available_slots = available_slots;

            next();
        }
        catch(err)
        {
            req.ok = false;
            req.error = {}
            console.log(err)

            if(err.code === constants.INVALID_REQUEST.Code || err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code)
                req.error = err
            else
            {
                req.error.status = constants.FAILURE;
                req.error.code = constants.SERVER_ERROR.Code;
                req.error.message = constants.SERVER_ERROR.Message;
            }

            next();
        }
    }

    static async listCandidates(req, res, next)
    {
        req.ok = true
        req.opcode = constants.opcode.LIST_USERS
        try
        {
            //Connect to the database
            await connect()

            var queryResult = await Candidate.find({})

            console.log(queryResult)
            req.queryResult = queryResult

            next();
        }
        catch(err)
        {
            req.ok = false;
            console.log(err)
            req.error = {}

            if(err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code)
                req.error = err
            else
            {
                req.error.status = constants.FAILURE;
                req.error.code = constants.SERVER_ERROR.Code;
                req.error.message = constants.SERVER_ERROR.Message;
            }

            next();
        }
    }
}

module.exports = Candidates
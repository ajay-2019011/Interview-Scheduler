const constants = require('../constants/constants')
const {connect, disconnect} = require('../database/dbservice/dbservice.js')
const Candidate = require('../database/models/Candidate')
class Candidates
{
    static async sendEmails(req, res, next)
    {
        next()
    }

    static async availableSlots(req, res, next)
    {
        req.ok = true
        req.opcode = constants.opcode.LIST_AVAILABLE_SLOTS

        var date = req.body.date
        var candidateList = req.body.candidates

        try
        {
            if(date === null || date === undefined || candidateList === null || candidateList === undefined)
                throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)

            //Connect to the database
            connect();

            var scheduledInterviews = await MeetingDetails.find({date: date});
            var booked_slots = []

            scheduledInterviews.forEach(interview => {
                for(let i=0;i<interview.candidates.length;i++)
                {
                    if(participantList.includes(interview.participants[i]))
                    {
                        console.log(interview.participants[i])
                        booked_slots.push([interview.start_time, interview.end_time])
                        break;
                    }
                }
            });

            booked_slots.sort((a, b) =>  a[0]<b[0])

            // meeting will only be scheduled between 9:00am to 11:00pm (540 min - 1380)
            var available_slots = [];

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

            if(convertToMinutes(booked_slots[n-1][1]) < convertToMinutes("23:00"))
                available_slots.push({start_time: booked_slots[n-1][1], end_time: "23:00"})

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
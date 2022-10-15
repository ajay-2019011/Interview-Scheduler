const constants = require('../constants/constants.js')
const {connect, disconnect} = require('../database/dbservice/dbservice.js.js')
const InterviewDetails = require('../database/models/InterviewDetails')
const Exception = require('../utils/classes/Exception.js')

class Interview
{
    static async all(req, res, next)
    {
        req.ok=true
        req.opcode=constants.opcode.ALL_MEETING_DETAILS

        try
        {
            //Connect to the database
            connect()

            var allInterviewDetails = await InterviewDetails.find({})
            console.log(allInterviewDetails);

            req.allInterviewDetails = allInterviewDetails;

            next();
        }
        catch(err)
        {   
            req.ok=false;
            console.log(err)
            req.error={};

            if(err.code === constants.DB_CONNECTION_ERROR || err.code === constants.DB_DISCONNECT_ERROR)
                req.error=err
            else
            {
                req.error.status = constants.FAILURE;
                req.error.code = constants.SERVER_ERROR.Code;
                req.error.message = constants.SERVER_ERROR.Message;
            }

            next();
        }
    }

    static async create(req, res, next)
    {
        req.ok = true;
        req.opcode = constants.opcode.CREATE_MEETING

        var title = req.body.title
        var date = req.body.date
        var position = req.body.position
        var start_time = req.body.start_time
        var end_time = req.body.end_time
        var participants = req.body.candidates

        try
        {

            //Connect to the Database
            await connect();

            if(title===null || title===undefined || date===null || date===undefined || position===null || position===undefined || start_time===null || start_time===undefined
                || end_time===null || end_time===undefined || participants===null || participants===undefined)
                throw new Error(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)
            
            var interviewDetailsObj = {
                title : title,
                date : date,
                position : position,
                start_time : start_time,
                end_time : end_time,
                candidates : participants
            }

            var interviewDetails = new InterviewDetails(interviewDetailsObj);

            var saveResult = await interviewDetails.save();

            console.log(saveResult);
            req.saveData = saveResult

            next();
        }
        catch(err)
        {
            req.ok = false;
            req.error = {};
            console.log(err)

            if(err.code===constants.DB_CONNECTION_ERROR.Code || err.code===constants.DB_DISCONNECT_ERROR.Code || err.code===constants.INVALID_REQUEST.Code)
                req.error = err;
            else
            {
                req.error.status = constants.FAILURE;
                req.error.code = constants.SERVER_ERROR.Code;
                req.error.message = constants.SERVER_ERROR.Message;
            }

            next();
        }
    }

    static async update(req, res, next)
    {
        req.ok = true;
        req.opcode = constants.opcode.UPDATE_MEETING


        var id = req.body._id
        var title = req.body.title
        var date = req.body.date
        var position = req.body.position
        var start_time = req.body.start_time
        var end_time = req.body.end_time
        var participants = req.body.candidates

        try
        {
            //Connect to the Database
            connect();

            if(id===null || id===undefined || title===null || title===undefined || date===null || date===undefined 
                || position===null || position===undefined || start_time===null || start_time===undefined || end_time===null || end_time===undefined || participants===null || participants===undefined)
                throw new Exception(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)
            
            var interviewDetailsObj = {
                title : title,
                date : date,
                position : position,
                start_time : start_time,
                end_time : end_time,
                candidates : participants
            }

            var updateResult = await InterviewDetails.updateOne({_id : id},interviewDetailsObj);

            console.log(updateResult);
            req.updateData = updateResult

            next();
        }
        catch(err)
        {
            req.ok = false;
            req.error = {};
            console.log(err)

            if(err.code===constants.DB_CONNECTION_ERROR.Code || err.code===constants.DB_DISCONNECT_ERROR.Code || err.code===constants.INVALID_REQUEST.Code)
                req.error = err;
            else
            {
                req.error.status = constants.FAILURE;
                req.error.code = constants.SERVER_ERROR.Code;
                req.error.message = constants.SERVER_ERROR.Message;
            }

            next();
        }
    }

    static async delete(req, res, next)
    {
        req.ok = true;
        req.opcode = constants.opcode.DELETE_MEETING
        try
        {

            var id = req.body._id

            console.log("Id is ", id)

            connect()

            if(id===null || id===undefined)
                throw new Exception(constants.INVALID_REQUEST.Code, constants.INVALID_REQUEST.Message)

            var interviewDetails = await InterviewDetails.find({_id:id});
            interviewDetails = interviewDetails[0]

            req.interviewDetails = interviewDetails

            var deleteResult = await InterviewDetails.deleteOne({_id : id});

            console.log(deleteResult);
            req.deleteData = deleteResult

            next();
        }
        catch(err)
        {
            req.ok = false;
            req.error = {};
            console.log(err)

            if(err.code===constants.DB_CONNECTION_ERROR.Code || err.code===constants.DB_DISCONNECT_ERROR.Code || err.code===constants.INVALID_REQUEST.Code)
                req.error = err;
            else
            {
                req.error.status = constants.FAILURE;
                req.error.code = constants.SERVER_ERROR.Code;
                req.error.message = constants.SERVER_ERROR.Message;
            }

            next();
        }
    }

    static async queryDetails(req, res, next)
    {
        req.ok = true;
        req.opcode = constants.opcode.GET_DETAILS
        var id = req.query.id;
        console.log(id)
        try
        {
            //Connect to database
            await connect();

            req.ok = true;

            //Retreive the data from the Database
            let interviewDetails = await InterviewDetails.find({_id:id});

            console.log(interviewDetails);

            if(interviewDetails.length === 0)
            {
                throw new Exception(constants.INVALID_MEETING_ERROR.Code, constants.INVALID_MEETING_ERROR.Message)
            }

            req.interviewDetails = interviewDetails[0];

            next();
        }
        catch(err)
        {
            req.ok = false;
            req.error = {};
            console.log(err)
            if(err.code === constants.DB_CONNECTION_ERROR.Code || err.code === constants.DB_DISCONNECT_ERROR.Code
                || err.code === constants.INVALID_MEETING_ERROR.Code)
                req.error = err;
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

module.exports = Interview
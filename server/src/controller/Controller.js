const constants = require('../constants/constants')

class Controller
{
    static async candidateController(req, res)
    {
        if(req.ok)
        {
            if(req.opcode === constants.opcode.LIST_USERS)
            {
                responseData = {
                    opcode : constants.opcode.LIST_USERS,
                    status : constants.SUCCESS,
                    Users : req.queryResult
                }

                res.status(200).json(responseData)
            }
            else if(req.opcode === constants.opcode.LIST_AVAILABLE_SLOTS)
            {
                responseData = {
                    opcode : constants.opcode.LIST_AVAILABLE_SLOTS,
                    status : constants.SUCCESS,
                    available_slots : req.available_slots
                }

                res.status(200).json(responseData)
            }
        }
        else
        {
            var responseData = {
                opcode : req.opcode,
                status : constants.FAILURE,
                error : {
                    code : req.error.code,
                    message : req.error.message
                }
            }
            if(req.error.code === constants.INVALID_REQUEST.Code)
            {
                res.status(400).json(responseData);   
            }
            else
            {
                res.status(500).json(responseData);
            }
        }
    }

    static async interviewController(req, res)
    {
        if(req.ok)
        {
            if(req.opcode == constants.opcode.GET_DETAILS)
            {
                var responseData = {
                    opcode : constants.opcode.GET_DETAILS,
                    status : constants.SUCCESS,
                    id : req.interviewDetails._id,
                    title : req.interviewDetails.title,
                    date : req.interviewDetails.date,
                    position : req.interviewDetails.position,
                    start_time : req.interviewDetails.start_time,
                    end_time : req.interviewDetails.end_time,
                    participants : req.interviewDetails.participants,
                    send : req.interviewDetails.send
                }

                res.status(200).json(responseData);
            }
            else if(req.opcode === constants.opcode.CREATE_MEETING)
            {
                var responseData = {
                    opcode : constants.opcode.CREATE_MEETING,
                    status : constants.SUCCESS,
                    meeting_details : {
                        meeting_id : req.saveData._id,
                        title : req.saveData.title,
                        date : req.saveData.date,
                        position : req.saveData.position,
                        start_time : req.saveData.start_time,
                        end_time : req.saveData.end_time,
                        participants : req.saveData.participants,
                        send : req.saveData.send
                    },
                    message : constants.message.MEETING_SCHEDULED_SUCCESS
                }

                res.status(200).json(responseData);
            }
            else if(req.opcode === constants.opcode.UPDATE_MEETING)
            {
                var responseData = {
                    opcode : constants.opcode.UPDATE_MEETING,
                    status : constants.SUCCESS,
                    meeting_details : {
                        id : req.body._id,
                        title : req.body.title,
                        date : req.body.date,
                        position : req.body.position,
                        start_time : req.body.start_time,
                        end_time : req.body.end_time,
                        candidates : req.body.candidates,
                        send : req.body.send
                    },
                    message : constants.message.MEETING_UPDATED
                }

                res.status(200).json(responseData);
            }   
            else if(req.opcode === constants.opcode.DELETE_MEETING)
            {
                var responseData = {
                    opcode : constants.opcode.DELETE_MEETING,
                    status : constants.SUCCESS,
                    interview_details : {
                        interview_id : req.body._id,
                        date : req.interviewDetails.date,
                        title : req.interviewDetails.title,
                        position : req.interviewDetails.position,
                        start_time : req.interviewDetails.start_time,
                        end_time : req.interviewDetails.end_time,
                        candidates : req.interviewDetails.candidates,
                        send : req.interviewDetails.send
                    },
                    message : constants.message.MEETING_CANCELLED
                }

                res.status(200).json(responseData);
            }
            else if(req.opcode === constants.opcode.ALL_MEETING_DETAILS)
            {
                var responseData = {
                    opcode : constants.opcode.ALL_MEETING_DETAILS,
                    status : constants.SUCCESS,
                    all_interview_details : req.allInterviewDetails
                }

                res.status(200).json(responseData)
            }
        }
        else
        {
            var responseData = {
                opcode : req.opcode,
                status : constants.FAILURE,
                error : {
                    code : req.error.code,
                    message : req.error.message
                }
            }
            if(req.error.code === constants.INVALID_REQUEST.Code)
            {
                res.status(400).json(responseData);   
            }
            else
            {
                res.status(500).json(responseData);
            }
        }
    }
}

module.exports = Controller
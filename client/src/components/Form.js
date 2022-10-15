import React, {useEffect, useState} from "react"
import DatePicker from 'react-date-picker'
import { TimePicker } from 'react-ios-time-picker';
import Multiselect from 'multiselect-react-dropdown';
import '../styles/Form.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'

export default function Form(props) {
    
    const interviewDetails = props.interviewDetails
    // Converting Date in String "12-10-2022" to Date() object
    var dateObj = null;
    console.log(interviewDetails.length !== 0)
    if(interviewDetails.length !== 0){
        const dateStr = interviewDetails.date
        const [day, month, year] = dateStr.split('-')
        dateObj  = new Date(+year, +month - 1, +day)
        console.log(dateObj)
    }

    const candidatesData = props.candidatesData
    const candidatesEmails = candidatesData.map( (candidate) => candidate.email)
    
    const [candidates, setCandidates] = React.useState(candidatesEmails)
    const [selectedCandidates, setSelectedCandidates] = useState(interviewDetails ? interviewDetails.candidates : [])
    const [title, setTitle] = React.useState(interviewDetails ? interviewDetails.title : "");
    const [position, setPosition] = React.useState(interviewDetails ? interviewDetails.position : "");
    const [date, setDate] = React.useState(interviewDetails ? dateObj : null);
    const [startTime, setStartTime] = React.useState(interviewDetails ? interviewDetails.start_time :"00:00");
    const [endTime, setEndTime] = React.useState(interviewDetails ? interviewDetails.end_time : "00:00");
    const [toSend, setToSend] = React.useState(false);
    const [alertMessage, setAlertMessage] = useState(' ')
    
    function handleTitleChange(event){
        setTitle(event.target.value)
    }
    function handlePositionChange(event){
        setPosition(event.target.value)
    }
    function handleSendChange(event){
        setToSend(event.target.checked)
    }
    function handleDateChange(event){
        //console.log(JSON.stringify(event))
        setDate(new Date(event))
    }
    function handleStartTimeChange(event){
        setStartTime(event)
    }
    function handleEndTimeChange(event){
        setEndTime(event)
    }

    const modifyParticipantsList = (selectedList, selectedItem) => {
        setSelectedCandidates(selectedList);
        console.log(selectedCandidates)
    }
    
    
    function handleReset(){
        setTitle("")
        setSelectedCandidates([])
        setPosition("")
        setDate(null)
        setStartTime(null)
        setEndTime(null)
        setToSend(false)
        
        console.log("Reset Done", selectedCandidates, title, position, toSend, date, startTime, endTime);
    }

    async function handleSubmit(event){
        event.preventDefault()
        
        console.log("Submitting...")
        if(title.trim()==='' || selectedCandidates.length===0 || startTime === "00:00"
            || endTime ==="00:00")
            setAlertMessage("Please fill in all the details")
        else if(props.formState === "edit"){
            console.log('Changing...')
            var requestBody = {
                _id : interviewDetails._id,
                title : title,
                date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
                position : position,
                start_time : startTime,
                end_time : endTime,
                candidates : selectedCandidates
            }
            console.log(requestBody)
            var response = await InvokeAPI.post(urls.UPDATE_INTERVIEW, requestBody)
            handleReset()
        }
        else
        {
            setAlertMessage(' ')
            
            var requestBody = {
                title : title,
                date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
                position : position,
                start_time : startTime,
                end_time : endTime,
                candidates : selectedCandidates
            }

            var response = await InvokeAPI.post(urls.SCHEDULE_INTERVIEW, requestBody)
        }
        console.log(response)

        if(response.status==="SUCCESS")
            window.location.reload()
        
    }

    function handleCancel(idx, formState){
        props.goToForm(idx, formState)
        props.handleClick(0)
    }

    return (
        <div className="form-wrapper">
            <h1 id="form-heading">Fill the given Form</h1>
            <form 
                id="form"
            >
                <div>
                    <label htmlFor="title">Title </label>
                    <input
                        type="text"
                        placeholder="Meeting Title"
                        onChange={handleTitleChange}
                        name="title"
                        value={title}
                    />
                </div>
                    {/* <label htmlFor="Candidates">Select Candidates  </label> */}
                    <Multiselect
                        isObject={false}
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={modifyParticipantsList}
                        onSearch={function noRefCheck(){}}
                        onSelect={modifyParticipantsList}
                        selectedValues={interviewDetails && interviewDetails.candidates}
                        placeholder = 'Add Candidates'
                        options={candidates}
                        showCheckbox
                        className='selectedList'
                    />
               
                <div>
                    <label htmlFor="position">What position is the the interview applied for?</label>
                    <br />
                    <select 
                        id="position" 
                        value={position}
                        onChange={handlePositionChange}
                        name="position"
                    >
                        <option value="">--Available Positions--</option>
                        <option value="Front-End Developer">Front-End Developer</option>
                        <option value="Back-End Developer">Back-End Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="SDE-1">SDE-1</option>
                        <option value="SDE-2">SDE-2</option>
                        <option value="SDE-3">SDE-3</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Human Resources">Human Resources</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date for Interview   </label>
                    <DatePicker 
                        id="date"
                        name="date"
                        value={date}
                        onChange={handleDateChange} 
                    />
                </div>
                <div>
                    <label htmlFor="startTime">Start time for Interview   </label>
                    <TimePicker 
                        id="startTime"
                        name="startTime"
                        onChange={handleStartTimeChange} 
                        value={startTime} 
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End time for Interview   </label>
                    <TimePicker 
                        id="endTime"
                        name="endTime"
                        onChange={handleEndTimeChange} 
                        value={endTime} 
                    />
                </div>
                <div id="checkbox">
                    <input 
                        type="checkbox" 
                        id="toSend" 
                        checked={toSend}
                        onChange={handleSendChange}
                        name="toSend"
                    />
                    <label htmlFor="toSend">Do you want to notify the candidate by E-mail?</label>
                </div>
                <div id='alert'>{alertMessage}</div>
                <div className="btns">
                    <button id="form-cancel" onClick={() => handleCancel(-1, "reset")}>Cancel</button>
                    <button onClick={handleSubmit} id="submit">Submit</button>
                </div>
        </form>
    </div>
    )
}
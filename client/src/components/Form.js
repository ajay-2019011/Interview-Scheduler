import React, {useEffect, useState} from "react"
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import Multiselect from 'multiselect-react-dropdown';
import '../styles/Form.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'

export default function Form(props) {
    
    const interviewDetails = props.interviewDetails
    // Converting Date in String "12-10-2022" to Date() object
    var dateObj = null;
    var prevTitle, prevPosition, prevDate, prevSelectedCandidates, prevStartTime, prevEndTime
    // console.log(interviewDetails.length !== 0)
    if(interviewDetails.length !== 0){
        const dateStr = interviewDetails.date
        const [day, month, year] = dateStr.split('-')
        dateObj  = new Date(+year, +month - 1, +day)
        console.log("prev values are there", dateObj)
        
        prevTitle = interviewDetails.title
        prevPosition = interviewDetails.position
        prevDate = dateObj
        prevSelectedCandidates = interviewDetails.selectedCandidates
        prevStartTime = interviewDetails.start_time
        prevEndTime = interviewDetails.end_time
    }

    const candidatesData = props.candidatesData
    const candidatesEmails = candidatesData.map( (candidate) => candidate.email)
    
    const [candidates, setCandidates] = React.useState(candidatesEmails)
    const [selectedCandidates, setSelectedCandidates] = useState(interviewDetails ? interviewDetails.candidates : [])
    const [title, setTitle] = React.useState(interviewDetails ? interviewDetails.title : "");
    const [position, setPosition] = React.useState(interviewDetails ? interviewDetails.position : "");
    const [date, setDate] = React.useState(interviewDetails ? dateObj : null);
    const [startTime, setStartTime] = React.useState(interviewDetails ? interviewDetails.start_time :null);
    const [endTime, setEndTime] = React.useState(interviewDetails ? interviewDetails.end_time : null);
    const [toSend, setToSend] = React.useState(interviewDetails ? interviewDetails.send : false);
    const [alertMessage, setAlertMessage] = useState(' ')
    const [minTime, setMinTime] = useState(null)
    const [maxTime, setMaxTime] = useState(null)
    const [availableTimeSlots, setAvailableTimeSlots] = useState([])
    
    function handleTitleChange(event){
        setTitle(event.target.value)
    }
    function handlePositionChange(event){
        setPosition(event.target.value)
    }
    function handleSendChange(event){
        setToSend(event.target.checked)
    }
    // function handleDateChange(event){
    //     //console.log(JSON.stringify(event))
    //     setDate(new Date(event))
    // }
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

    const updateTimeRange = (selectedList, selectedItem) => {
        console.log(selectedItem)
        console.log("Min-time", selectedItem.substring(0,5))
        console.log("Max-time",selectedItem.substring(8,13))
        setMinTime(selectedItem.substring(0,5))
        setMaxTime(selectedItem.substring(8,13))
    }

    const handleMouseEnter = async() => {

        var requestBody = {
          date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
          candidates : selectedCandidates
        }
    
        var response = await InvokeAPI.post(urls.AVAILABLE_TIMESLOTS, requestBody)
    
        console.log(response)
        var timeslots = []
        response.available_slots.forEach((slot) => {
          timeslots.push(slot.start_time + " - " + slot.end_time)
        })
        setAvailableTimeSlots(timeslots)
      }

    async function handleSubmit(event){
        event.preventDefault()
        // console.log("Submitting...")
        // console.log(title)
        // console.log(selectedCandidates)
        // console.log(date)
        // console.log(startTime)
        // console.log(endTime)
        // console.log(position)
        if(title === undefined || selectedCandidates === undefined || date === null || startTime === undefined
            || endTime === undefined || position === undefined || startTime<minTime 
            || endTime>maxTime || startTime>endTime)
        {
            setAlertMessage("Please fill all the fields with * mark")
        }
        else if(props.formState === "edit"){
            console.log(prevTitle === title && prevSelectedCandidates === selectedCandidates && prevDate === date
                && prevStartTime === startTime && prevEndTime === endTime && prevPosition === position)
            if(prevTitle === title && prevSelectedCandidates === selectedCandidates && prevDate === date
                && prevStartTime === startTime && prevEndTime === endTime && prevPosition === position)
            {
                setAlertMessage('Meeting data same as previous one. Want to Cancel?')
            }
            else
            {
                setAlertMessage(' ')
                console.log('Changing...')
                var requestBody = {
                    _id : interviewDetails._id,
                    title : title,
                    date : `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
                    position : position,
                    start_time : startTime,
                    end_time : endTime,
                    candidates : selectedCandidates,
                    send : toSend
                }
                console.log(requestBody)
                var response = await InvokeAPI.post(urls.UPDATE_INTERVIEW, requestBody)
            }
            // handleReset()
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
                candidates : selectedCandidates,
                send : toSend
            }
            console.log(requestBody)
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
                <div className="form-div">
                    <label htmlFor="title">Title* </label>
                    <input
                        type="text"
                        placeholder="Meeting Title"
                        onChange={handleTitleChange}
                        name="title"
                        value={title}
                        id="title"
                    />
                </div>
                <div className="form-div">
                    <label htmlFor="position">What position is the the interview applied for?*</label>
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
                </div >
                    {/* <label htmlFor="Candidates">Select Candidates  </label> */}
                    <Multiselect
                        isObject={false}
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={modifyParticipantsList}
                        onSearch={function noRefCheck(){}}
                        onSelect={modifyParticipantsList}
                        selectedValues={interviewDetails && interviewDetails.candidates}
                        placeholder = 'Add Candidates*'
                        options={candidates}
                        showCheckbox
                        className="selectedList"
                    />
                <div className="form-div">
                    <label htmlFor="date">Select Date for Interview*   </label>
                    <DatePicker 
                        id="date"
                        name="date"
                        value={date}
                        onChange={setDate} 
                    />
                </div>
                <div onMouseEnter={()=>handleMouseEnter()} onMouseLeave={()=>console.log("Focus Lost")}>
                    <Multiselect
                        isObject={false}
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={updateTimeRange}
                        onSearch={function noRefCheck(){}}
                        onSelect={updateTimeRange}
                        placeholder = 'Available Time slots*'
                        options={availableTimeSlots}
                        showCheckbox
                        singleSelect
                    />
                </div>

                <div className="form-div">
                    <label htmlFor="startTime">Start time for Interview*   </label>
                    <TimePicker 
                        onChange={setStartTime} 
                        value={startTime}  
                        disableClock 
                        hourPlaceholder="hh" 
                        minutePlaceholder="mm" 
                        locale='hu-HU'
                        // format='HH:mm'
                        minTime={minTime} maxTime={maxTime}
                        id="startTime"
                        name="startTime"
                        />
                </div>
                <div className="form-div">
                    <label htmlFor="endTime">End time for Interview*   </label>
                    <TimePicker 
                        onChange={setEndTime} 
                        value={endTime} 
                        disableClock 
                        hourPlaceholder="hh" 
                        minutePlaceholder="mm"
                        locale='hu-HU' 
                        // format='HH:mm'
                        minTime={minTime} maxTime={maxTime}
                        id="endTime"
                        name="endTime"
                    />
                </div >
                {/* <div>
                    <label htmlFor="startTime">Start time for Interview*   </label>
                    <TimePicker 
                        id="startTime"
                        name="startTime"
                        onChange={handleStartTimeChange} 
                        value={startTime} 
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End time for Interview*   </label>
                    <TimePicker 
                        id="endTime"
                        name="endTime"
                        onChange={handleEndTimeChange} 
                        value={endTime} 
                    />
                </div> */}
                <div className="form-div" id="checkbox">
                    <input 
                        type="checkbox" 
                        id="toSend" 
                        checked={toSend}
                        onChange={handleSendChange}
                        name="toSend"
                    />
                    <label htmlFor="toSend">Do you want to notify the candidates by E-mail?</label>
                </div>
                <div className="form-div" id="alert">{alertMessage}</div>
                <div className="btns">
                    <button id="form-cancel" onClick={() => handleCancel(-1, "reset")}>Cancel</button>
                    <button onClick={handleSubmit} id="submit">Submit</button>
                </div>
        </form>
    </div>
    )
}
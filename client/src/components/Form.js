import React from "react"
import DatePicker from 'react-date-picker'
import { TimePicker } from 'react-ios-time-picker';
import '../styles/Form.css'

export default function Form() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [college, setCollege] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState("14:04");
    const [endTime, setEndTime] = React.useState("17:23");
    const [toSend, setToSend] = React.useState(false);
    // const [formData, setFormData] = React.useState(
    //     {
    //         name: "", 
    //         email: "", 
    //         mobile: "",
    //         college: "", 
    //         position: "",
    //         date: "",
    //         toSend: false
    //     }
    // )
    // function handleChange(event) {
    //     const {name, value, type, checked} = event.target
    //     console.log(event.target)
    //     setFormData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             [name]: type === "checkbox" ? checked : value
    //         }
    //     })
    // }
    function handleNameChange(event){
        setName(event.target.value)
    }
    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handleMobileChange(event){
        setMobile(event.target.value)
    }
    function handleCollegeChange(event){
        setCollege(event.target.value)
    }
    function handlePositionChange(event){
        setPosition(event.target.value)
    }
    function handleSendChange(event){
        setToSend(event.target.checked)
    }
    function handleDateChange(event){
        console.log(JSON.stringify(event))
        setDate(new Date(event))
    }
    function handleStartTimeChange(event){
        setStartTime(event.value)
    }
    function handleEndTimeChange(event){
        setEndTime(event.value)
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        console.log(name, email, mobile, college, position, toSend, date, startTime)
    }
    return (
        <div className="form-wrapper">
            <h1 id="form-heading">Fill the given Form</h1>
            <form 
                onSubmit={handleSubmit}
                id="form"
            >
                <div>
                    <label htmlFor="name">Candidate Name:  </label>
                    <input
                        type="text"
                        placeholder="Candidate Name"
                        onChange={handleNameChange}
                        name="name"
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail:  </label>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        name="email"
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile No:  </label>
                    <input
                        type="text"
                        placeholder="98456XXXXX"
                        onChange={handleMobileChange}
                        name="mobile"
                        value={mobile}
                    />
                </div>
                <div>
                    <label htmlFor="college">College/University :  </label>
                    <input
                        type="text"
                        placeholder="College Name"
                        onChange={handleCollegeChange}
                        name="college"
                        value={college}
                    />
                </div>
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
                        <option value="front">Front-End Developer (Intern)</option>
                        <option value="back">Back-End Developer (Intern)</option>
                        <option value="full">Full Stack Developer (Intern)</option>
                        <option value="sde1">Software Development Engineer - 1</option>
                        <option value="sde2">Software Development Engineer - 2</option>
                        <option value="sde3">Software Development Engineer - 3</option>
                        <option value="manager">Product Manager</option>
                        <option value="hr">Human Resources</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date for Interview :  </label>
                    <DatePicker 
                        id="date"
                        name="date"
                        value={date}
                        onChange={handleDateChange} 
                    />
                </div>
                <div>
                    <label htmlFor="startTime">Start time for Interview :  </label>
                    <TimePicker 
                        id="startTime"
                        name="startTime"
                        onChange={handleStartTimeChange} 
                        value={startTime} 
                    />
                    <label htmlFor="endTime">End time for Interview :  </label>
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
                <button id="submit">Submit</button>
        </form>
    </div>
    )
}
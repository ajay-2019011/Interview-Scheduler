import React from "react"
import '../styles/Form.css'

export default function Form() {
    const [formData, setFormData] = React.useState(
        {
            firstName: "", 
            lastName: "", 
            email: "", 
            mobile: "",
            college: "", 
            position: "",
            toSend: false,
            comments: ""
        }
    )
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        console.log(formData)
    }
    
    return (
        <div class="form-wrapper">
            <h1 id="form-heading">Fill the given Form</h1>
            <form 
                onSubmit={handleSubmit}
                id="form"
            >
                <div>
                    <label htmlFor="firstName">First Name:  </label>
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange}
                        name="firstName"
                        value={formData.firstName}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:  </label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange}
                        name="lastName"
                        value={formData.lastName}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail:  </label>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                    />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile No:  </label>
                    <input
                        type="text"
                        placeholder="98456XXXXX"
                        onChange={handleChange}
                        name="mobile"
                        value={formData.mobile}
                    />
                </div>
                <div>
                    <label htmlFor="college">College/University :  </label>
                    <input
                        type="text"
                        placeholder="College Name"
                        onChange={handleChange}
                        name="college"
                        value={formData.college}
                    />
                </div>
                <div>
                    <label htmlFor="position">What position is the the interview applied for?</label>
                    <br />
                    <select 
                        id="position" 
                        value={formData.position}
                        onChange={handleChange}
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
                <div id="checkbox">
                    <input 
                        type="checkbox" 
                        id="toSend" 
                        checked={formData.toSend}
                        onChange={handleChange}
                        name="toSend"
                    />
                    <label htmlFor="toSend">  Do you want to notify the candidate by E-mail?</label>
                </div>
                <div>
                    <label htmlFor="comments">Comments:  </label>
                    <textarea 
                        value={formData.comments}
                        placeholder="Any Comments"
                        onChange={handleChange}
                        name="comments"
                    />
                </div>
                <button>Submit</button>
        </form>
    </div>
    )
}
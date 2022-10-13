import React, { useEffect,useState } from 'react'
import '../styles/List.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'

export default function List(){
    const [interviewsData, setInterviewsData] = useState([])

        async function fetchAllInterviewsData()
        {
            var response = await InvokeAPI.get(urls.ALL_INTERVIEWS)
            console.log(response.all_interview_details)
            setInterviewsData(response.all_interview_details)
        }

        useEffect(()=>{
            fetchAllInterviewsData();
        },[])
    return(
        <div className="interview-list">
            <table>
                <caption><h1>List of Interviews Scheduled</h1></caption>
                <thead>
                    <tr>
                        <th>Interview Title</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Candidate Email</th>
                    </tr>  
                </thead>
                <tbody>
                {interviewsData.map((interview) => {
                        return (
                            <tr>
                                <td>{interview.title}</td>
                                <td>{interview.date}</td>
                                <td>{interview.start_time}</td>
                                <td>{interview.end_time}</td>
                                <td>
                                    {interview.candidates.map((candidate) => {
                                            return (
                                                candidate= candidate + ", "
                                            )
                                        }
                                    )}
                                {/* {interview.candidates} */}
                                </td>
                                <td><button>Edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
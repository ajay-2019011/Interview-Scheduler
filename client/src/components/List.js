import React, { useEffect, useState, useMemo } from 'react'
import '../styles/List.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'
import Pagination from './Pagination';
import TextField from "@mui/material/TextField";

let PageSize = 3

export default function List(props){
        const [currentPage, setCurrentPage] = useState(1);
        const [inputText, setInputText] = useState("");
        console.log(inputText==="")
        let inputHandler = (e) => {
            //convert input text to lower case
            var lowerCase = e.target.value.toLowerCase();
            setInputText(lowerCase);
        };
        const interviewsData = props.interviewsData
        const filteredData = interviewsData.filter((interview) => {
                return interview.title.toLowerCase().includes(inputText)
            }
        )
        // console.log(filteredData)
        // console.log(interviewsData)
        var toBeUsedData
        if(inputText===""){
            toBeUsedData=interviewsData
        }
        else{
            toBeUsedData=filteredData
        }

        const currentInterviewsData = useMemo(() => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return toBeUsedData.slice(firstPageIndex, lastPageIndex);
          }, [currentPage, inputText]);

        function handleEdit(interviewIdx, formState){
            props.goToForm(interviewIdx, formState)
            props.handleClick(1);
        }
        async function handleCancel(interviewIdx, formState){
            const interviewDetails = interviewsData[interviewIdx]
            const propDate = interviewDetails.date
            var requestBody  = {
                _id : interviewDetails._id,
                title : interviewDetails.title,
                date : propDate,
                position : interviewDetails.position,
                start_time : interviewDetails.start_time,
                end_time : interviewDetails.end_time,
                candidates : interviewDetails.candidates,
                send : interviewDetails.send 
            }
            props.handleLoading(true)
            var response = await InvokeAPI.post(urls.CANCEL_INTERVIEW, requestBody)
            props.handleLoading(false)
            console.log(response)
            props.handleClick(0);
        }
    
    return(
        <div className="interview-list">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search by title...."
                />
            </div>
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
                {currentInterviewsData.map((interview, idx) => {
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
                                <td><button onClick={() => handleEdit(idx, "edit")}>Edit</button></td>
                                <td><button id="cancel" onClick={() => handleCancel(idx, "cancel")}>Cancel</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={toBeUsedData.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}
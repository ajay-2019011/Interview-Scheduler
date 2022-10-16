import React, { useEffect, useState, useMemo } from 'react'
import '../styles/List.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'
import Pagination from './Pagination';

let PageSize = 3

export default function List(props){
        const [currentPage, setCurrentPage] = useState(1);

        const interviewsData = props.interviewsData
        console.log(interviewsData)
        const currentInterviewsData = useMemo(() => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return interviewsData.slice(firstPageIndex, lastPageIndex);
          }, [currentPage]);

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
    
            var response = await InvokeAPI.post(urls.CANCEL_INTERVIEW, requestBody)
            console.log(response)
            props.handleClick(0);
        }
    
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
                totalCount={interviewsData.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}
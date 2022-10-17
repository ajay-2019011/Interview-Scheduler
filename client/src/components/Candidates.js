import React, { useEffect,useState, useMemo } from 'react'
import '../styles/Candidates.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'
import Pagination from './Pagination';
import TextField from "@mui/material/TextField";

let PageSize = 4

export default function List(props){
    const [currentPage, setCurrentPage] = useState(1);
    const [inputText, setInputText] = useState("");
    console.log(inputText==="")
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const candidatesData = props.candidatesData
    const filteredData = candidatesData.filter((candidate) => {
            return candidate.name.toLowerCase().includes(inputText)
        }
    )
    console.log(filteredData)
    var toBeUsedData
    if(inputText===""){
        toBeUsedData=candidatesData
    }
    else{
        toBeUsedData=filteredData
    }
    const currentCandidatesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return toBeUsedData.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, inputText]);

    return(
        <div className="candidate-list">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search by name...."
                />
            </div>
            <table>
                <caption><h1>List of Candidates eligible for Interview</h1></caption>
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Email</th>
                        <th>College</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {currentCandidatesData.map((candidate) => {
                        return (
                            <tr>
                                <td>{candidate.name}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.college}</td>
                                <td>{candidate.position}</td>
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
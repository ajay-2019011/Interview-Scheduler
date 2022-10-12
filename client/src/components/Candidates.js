import React, { useEffect,useState } from 'react'
import '../styles/Candidates.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'

export default function List(){

    const [candidatesData, setCandidatesData] = useState([])
    const [candidateNames, setCandidateNames] = useState([])
    const [candidateEmails, setCandidateEmails] = useState([])

    async function fetchAllCandidatesData()
    {
        var response = await InvokeAPI.get(urls.ALL_CANDIDATES)
        setCandidatesData(response.Users)
        var names = [], emails = []

        candidatesData.forEach((candidate)=>{
            names.push(candidate.name)
            emails.push(candidate.email)
        })
    }

    useEffect(()=>{
        fetchAllCandidatesData();
    },[])
    return(
        <div className="candidate-list">
            <table>
                <caption><h1>List of Candidates eligible for Interview</h1></caption>
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Email</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}
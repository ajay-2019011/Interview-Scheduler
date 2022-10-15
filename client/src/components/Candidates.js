import React, { useEffect,useState } from 'react'
import '../styles/Candidates.css'
import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'

export default function List(props){

    return(
        <div className="candidate-list">
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
                    
                    {props.candidatesData.map((candidate) => {
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
        </div>
    )
}
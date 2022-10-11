import React from 'react'
import '../styles/Candidates.css'

export default function List(){
    return(
        <div className="candidate-list">
            <table>
                <caption><h1>List of Candidates eligible for Interview</h1></caption>
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Position</th>
                        <th>College</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Khan Academy</td>
                        <td>The Coding Train</td>
                        <td>Solo learn</td>
                        <td>W3Schools</td>
                        <td>Academind</td>
                    </tr>
                    <tr>
                        <td>Khan Academy</td>
                        <td>The Coding Train</td>
                        <td>Solo learn</td>
                        <td>W3Schools</td>
                        <td>Academind</td>
                    </tr>
                    <tr>
                        <td>Khan Academy</td>
                        <td>The Coding Train</td>
                        <td>Solo learn</td>
                        <td>W3Schools</td>
                        <td>Academind</td>
                    </tr>
                    <tr>
                        <td>W3Schools</td>
                        <td>Academind</td>
                        <td>Programming Hero</td>
                        <td>Academind</td>
                        <td>Programming Hero</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
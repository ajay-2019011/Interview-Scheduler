import React from 'react'
import '../styles/List.css'

export default function List(){
    return(
        <div className="interview-list">
            <table>
                <caption><h1>List of Interviews Scheduled</h1></caption>
                <tr>
                    <th>Candidate Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Date</th>
                    <th>Timings</th>
                    
                </tr>
                <tr>
                    <td>Khan Academy</td>
                    <td>The Coding Train</td>
                    <td>Solo learn</td>
                    <td>W3Schools</td>
                    <td>Academind</td>
                    <td><button>Edit</button></td>
                </tr>
                <tr>
                    <td>Khan Academy</td>
                    <td>The Coding Train</td>
                    <td>Solo learn</td>
                    <td>W3Schools</td>
                    <td>Academind</td>
                    <td><button>Edit</button></td>
                </tr>
                <tr>
                    <td>Khan Academy</td>
                    <td>The Coding Train</td>
                    <td>Solo learn</td>
                    <td>W3Schools</td>
                    <td>Academind</td>
                    <td><button>Edit</button></td>
                </tr>
                <tr>
                    <td>W3Schools</td>
                    <td>Academind</td>
                    <td>Programming Hero</td>
                    <td>Academind</td>
                    <td>Programming Hero</td>
                    <td><button>Edit</button></td>
                </tr>
            </table>
        </div>
    )
}
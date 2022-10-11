import React from 'react';
import '../styles/Navbar.css'

export default function Navbar(props){
    return(
        <nav className='navbar'>
            <button id="headerBtn" onClick={() => props.handleClick(0)}><h2>Interview Scheduler</h2></button>
            <div className="nav-btns">
                <button id="interviewBtn" onClick={() => props.handleClick(2)}>Interviews List</button>
                <button id="candidateBtn" onClick={() => props.handleClick(3)}>Candidates Info</button>
            </div>
        </nav>
    )
}
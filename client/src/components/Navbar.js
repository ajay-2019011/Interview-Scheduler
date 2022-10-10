import React from 'react';
import '../styles/Navbar.css'

export default function Navbar(){
    return(
        <nav className='navbar'>
            <button className="header-btn"><h2>Interview Scheduler</h2></button>
            <div className="nav-btns">
                <button id="interviews-btn">Interviews List</button>
                <button id="company-btn">Companies Info</button>
                <button id="candidate-btn">Candidates Profiles</button>
            </div>
        </nav>
    )
}
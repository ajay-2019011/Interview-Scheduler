import React from 'react';
import '../styles/Content.css'

export default function Content(){
    return(
        <div className='content'>
            <h1>Welcome to Interview Scheduler! Here are some tips!!</h1>
            <p>To access and use Interview Scheduler, please frst go through the infos of both the candidates and 
                companies. Also schedule the time in reasonable hours and under the treshold number of students. One
                of the most important thing to keep in mind, kindly schedule an interview in a way such that there 
                is no clash in interview timings for any student.
            </p>
            <button id="schedule-btn">Schedule Interview</button>
        </div>
    )
}
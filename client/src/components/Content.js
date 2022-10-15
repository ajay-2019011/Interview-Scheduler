import React from 'react';
import '../styles/Content.css'



export default function Content(props){
    return(
        <div className='content'>
            <h1>Welcome to Interview Scheduler! Here are some tips!!</h1>
            <p>To schedule an interview or meeting, please first go through the candidates information and already  
                scheduled meetings. The interview details can be changed or the meeting itself can be cancelled if needed.
                The candidates added to a meeting can be notified using mail. If the meeting is cancelled or rescheduled, the
                same will be communicated to the candidates. Candidates having applied to relevant positions can be selected 
                for the interview of a specific position.
            </p>
            <p id="instruct">Click the button below to schedule an interview</p>
            <button id="scheduleBtn" onClick={() => {props.goToForm(-1, "schedule"); props.handleClick(1)}}>Schedule Interview</button>
        </div>
    )
}
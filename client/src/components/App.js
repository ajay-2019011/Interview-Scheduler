import React, { useEffect,useState } from 'react'
import '../styles/App.css';
import Navbar from './Navbar'
import Content from './Content'
import Form from './Form'
import List from './List'
import Candidates from './Candidates'

import { urls } from '../urls/urls'
import InvokeAPI from '../api/InvokeAPI'

function App() {
  const buttons = ["headerButton", "scheduleButton", "interviewButton", "candidateButton"]
  const intialState = {
    headerButton:false,
    scheduleButton: false,
    interviewButton: false,
    candidateButton: false
  }
  const [buttonState, setButtonState] = useState({
    ...intialState,
    headerButton: true
  });
  function handleClick(id){
      setButtonState({
        ...intialState,
        [buttons[id]]: true
      })
  }

  const [candidatesData, setCandidatesData] = useState([])
  async function fetchAllCandidatesData()
  {
      var response = await InvokeAPI.get(urls.ALL_CANDIDATES)
      setCandidatesData(response.Users)
  }
  useEffect(()=>{
      fetchAllCandidatesData();
  },[])

  const [interviewsData, setInterviewsData] = useState([])        
  async function fetchAllInterviewsData()
  {
    var response = await InvokeAPI.get(urls.ALL_INTERVIEWS)
    // console.log(response.all_interview_details)
    setInterviewsData(response.all_interview_details)
  }
  useEffect(()=>{
    fetchAllInterviewsData();
  },[])

  const [interviewDetails, setInterviewDetails] = useState([])
  const [formState, setFormState] = useState('');
  function goToForm(interviewIdx, formState){
      if(interviewIdx === -1){
        setInterviewDetails([])
      }
      else{
        setInterviewDetails(interviewsData[interviewIdx])
        setFormState(formState)
      }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <Navbar handleClick={handleClick}/>
        {buttonState.headerButton && <Content handleClick={handleClick} goToForm={goToForm}/>}
        {buttonState.scheduleButton && <Form 
                                          candidatesData={candidatesData} 
                                          handleClick={handleClick} 
                                          interviewDetails={interviewDetails}
                                          formState={formState}
                                          goToForm={goToForm}
                                          />}
        {buttonState.interviewButton && <List handleClick={handleClick} goToForm={goToForm}/>}
        {buttonState.candidateButton && <Candidates candidatesData={candidatesData}/>}
      </header>
      <footer></footer>
    </div>
  );
}

export default App;

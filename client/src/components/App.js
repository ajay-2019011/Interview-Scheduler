import React, { useEffect,useState } from 'react'
import '../styles/App.css';
import Navbar from './Navbar'
import Content from './Content'
import Form from './Form'
import List from './List'
import Candidates from './Candidates'
import { StyledEngineProvider } from "@mui/material/styles";
import Progress from "./Progress";

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
  const [loading, setLoading] = useState(true);
  function handleLoading(load){
    setLoading(load)
  }

  const [candidatesData, setCandidatesData] = useState([])
  const [interviewsData, setInterviewsData] = useState([])
  async function fetchAllData()
  {
      handleLoading(true);
      var response1 = await InvokeAPI.get(urls.ALL_CANDIDATES)
      var response2 = await InvokeAPI.get(urls.ALL_INTERVIEWS)
      setCandidatesData(response1.Users)
      setInterviewsData(response2.all_interview_details)
      handleLoading(false);
  }
  useEffect(()=>{
      fetchAllData();
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
        {loading && <StyledEngineProvider injectFirst> <Progress /> </StyledEngineProvider>}
        <Navbar handleClick={handleClick}/>
        {buttonState.headerButton && <Content handleClick={handleClick} goToForm={goToForm}/>}
        {buttonState.scheduleButton && <Form 
                                          candidatesData={candidatesData} 
                                          handleClick={handleClick} 
                                          interviewDetails={interviewDetails}
                                          formState={formState}
                                          goToForm={goToForm}
                                          handleLoading={handleLoading}
                                          />}
        {buttonState.interviewButton && <List 
                                          handleClick={handleClick} 
                                          goToForm={goToForm} 
                                          interviewsData={interviewsData} 
                                          handleLoading={handleLoading}
                                          />}
        {buttonState.candidateButton && <Candidates candidatesData={candidatesData}/>}
      </header>
      <footer></footer>
    </div>
  );
}

export default App;

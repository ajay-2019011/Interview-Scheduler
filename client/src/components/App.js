import React from 'react'
import '../styles/App.css';
import Navbar from './Navbar'
import Content from './Content'
import Form from './Form'
import List from './List'
import Candidates from './Candidates'

function App() {
  const buttons = ["headerButton", "scheduleButton", "interviewButton", "candidateButton"]
  const intialState = {
    headerButton:false,
    scheduleButton: false,
    interviewButton: false,
    candidateButton: false
  }
  const [buttonState, setButtonState] = React.useState({
    ...intialState,
    headerButton: true
  });
  function handleClick(id){
      setButtonState({
        ...intialState,
        [buttons[id]]: true
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <Navbar handleClick={handleClick}/>
        {buttonState.headerButton && <Content handleClick={handleClick}/>}
        {buttonState.scheduleButton && <Form />}
        {buttonState.interviewButton && <List />}
        {buttonState.candidateButton && <Candidates />}
      </header>
      <footer></footer>
    </div>
  );
}

export default App;

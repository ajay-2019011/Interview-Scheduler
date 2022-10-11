import React from 'react'
import '../styles/App.css';
import Navbar from './Navbar'
import Content from './Content'
import Form from './Form'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Content />
        <Form />
      </header>
      <footer></footer>
    </div>
  );
}

export default App;

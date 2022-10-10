import React from 'react'
import '../styles/App.css';
import Navbar from './Navbar'
import Content from './Content'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Content />
      </header>
      <footer></footer>
    </div>
  );
}

export default App;

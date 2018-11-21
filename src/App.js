import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Screen from './Screen';
import Keyboard from './Keyboard';
import Expression from './Expression'


const NB_ERRORS = 0;
const NB_ATTEMPTS = 10;
const AVAILABLE_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class App extends Component {
  handleKeyClick() {
  }
  render() {
    const keysArray = ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ']
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Application créée avec <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
          </p>
        </header>
        
        <Screen
          nbAttempts={NB_ATTEMPTS} 
          nbErrors={NB_ERRORS}
        />

        <Expression 
          word = 'Exemple'
        />

        <Keyboard 
          keyList = {keysArray[0]}
        />
        <Keyboard 
          keyList = {keysArray[1]}
        />
        
        

      </div>

    );
  }
}

export default App;

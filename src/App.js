import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Screen from './Screen';
import Key from './Key'


const NB_ERRORS = 0;
const NB_ATTEMPTS = 10;

class App extends Component {
  handleKeyClick() {
  }
  render() {
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

        <Key
          letter="M"
          feedback="unclicked"
          clickEvent= {this.handleKeyClick}
        />
        <Key
          letter="N"
          feedback="success"
          clickEvent= {this.handleKeyClick}
        />
        <Key
          letter="O"
          feedback="failure"
          clickEvent= {this.handleKeyClick}
        />
        
      </div>

    );
  }
}

export default App;

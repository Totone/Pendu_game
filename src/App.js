import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Screen from './Screen';


const NB_ERRORS = 0;
const NB_ATTEMPTS = 10;

class App extends Component {
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
          nbErrors={3}
        />
        
      </div>

    );
  }
}

export default App;

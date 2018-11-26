import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Screen from './Screen';
import './Keyboard.css';
import Expression from './Expression'
import Key from './Key'


let NB_ERRORS = 0;
const NB_ATTEMPTS = 10;

class App extends Component {
  handleKeyClick = (letter, feedback, index) => {
    console.log (`Clic sur la lettre ${letter} à l'index ${index} en position ${feedback}`); 
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

        <div className="keyboard">
        { Array.from(keysArray[0]).map((letter, index) => (    
          <Key
          key={letter}
          index={index}
          letter={letter} 
          feedback="unclicked"
          clickEvent={this.handleKeyClick}
          />
          ))
        }
        </div>
        <div className="keyboard">
        {
          Array.from(keysArray[1]).map((letter, index) => (    
            <Key
            key={letter}
            index={index+13}
            letter={letter} 
            feedback="unclicked"
            clickEvent={this.handleKeyClick}
            />
            ))
          }
        </div>
      </div>

    );
  }
}

export default App;

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
  state = {
    nbErrors: 0,
    triedIndices: [],
    goodIndicies: [],
  }

  handleKeyClick = (letter, feedback, index) => {
    console.log (`Clic sur la lettre ${letter} à l'index ${index} en position ${feedback}`); 
  /*
    Si index est dans triedKeys
      -> return
    Sinon
      triedKeys.push(index)
  */
  }

  /**
   * Afficher les buttons correspondant aux lettres
   * 
   */
  getFeedbackForKey() {
    /* 
      Si l'index de la key est dans triedKeys:
        - Si l'index est dans goodKeys
          -> return "success"
        -> Sinon
          -> return "failure"
      Sinon
        -> return "unclicked"
    */
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
        { Array.from(keysArray[0]).map((value, index) => (    
          <Key
          key={value}
          index={index}
          letter={value} 
          feedback="unclicked"
          clickEvent={this.handleKeyClick}
          />
          ))
        }
        </div>
        <div className="keyboard">
        {
          Array.from(keysArray[1]).map((value, index) => (    
            <Key
            key={value}
            index={index+13}
            letter={value} 
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

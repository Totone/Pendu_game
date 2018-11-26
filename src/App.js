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
    triedIndices: [2,5,8,12,15,22,1, 4,9,14],
    goodIndices: [2,5,12,14],
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
   * s
   */
  getFeedbackForKey(index) {
    /* 
      Si l'index de la key est dans triedKeys:
        - Si l'index est dans goodKeys
          -> return "success"
        -> Sinon
          -> return "failure"
      Sinon
        -> return "unclicked"
    */
   const {triedIndices, goodIndices} = this.state;

    for (var val1 in triedIndices) {
        if (index === triedIndices[val1]) {
            for (var val2 in goodIndices) {
                if (index === goodIndices[val2]) 
                    return 'success';
            }
            return 'failure';
        }
    }
    return 'unclicked';
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
        { 
          Array.from(keysArray[0]).map((value, index) => (    
            <Key
            key={index}
            index={index}
            letter={value} 
            feedback={this.getFeedbackForKey(index)}
            clickEvent={this.handleKeyClick}
            />
          ))
        }
        </div>
        <div className="keyboard">
        {
          Array.from(keysArray[1]).map((value, index) => (    
            <Key
            key={index+13}
            index={index+13}
            letter={value} 
            feedback={this.getFeedbackForKey(index+13)}
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

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
    triedIndices: [2,5,8,12,15,23, 22,1, 4,9,14],
    goodIndices: [2,5,12,14, 23],
    triedLetters: ['B', 'L', 'E', 'U', 'X'],
    goodLetters: ['B', 'L', 'E', 'S'],
    keysArray: ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'],
  }

  handleKeyClick = (letter, feedback, index) => {
      const {triedIndices, goodIndices, goodLetters, triedLetters, nbErrors} = this.state;
    console.log (`Clic sur la lettre ${letter} à l'index ${index} en position ${feedback}`); 
  /*
    Si index est dans triedKeys
      -> return
    Sinon
      triedKeys.push(index)
  */

    if (feedback === 'unclicked') {

        const newArray = triedLetters;
        newArray.push(letter);
        this.setState({triedLetters: newArray});
        
        for (var val in goodIndices) {
            if (letter === goodIndices[val]) {

            }
        }
    }
  }

  /**
   * Afficher les buttons correspondant aux lettres
   */
  getFeedbackForKey(letter, index) {
   const {triedIndices, goodIndices, triedLetters, goodLetters} = this.state;

    for (var val1 in triedLetters) {
        if (letter === triedLetters[val1]) {
            for (var val2 in goodLetters) {
                if (letter === goodLetters[val2]) 
                    return 'success';
            }
            return 'failure';
        }
    }
    return 'unclicked';
}

  render() {
    const { keysArray } = this.state;
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
          word = 'Exemples'
        />

        <div className="keyboard">
        { 
          Array.from(keysArray[0]).map((value, index) => (    
            <Key
            key={index}
            index={index}
            letter={value} 
            feedback={this.getFeedbackForKey(value, index)}
            clickEvent={this.handleKeyClick}
            />
          ))//
        }
        </div>
        <div className="keyboard">
        {
          Array.from(keysArray[1]).map((value, index) => (    
            <Key
            key={index+13}
            index={index+13}
            letter={value} 
            feedback={this.getFeedbackForKey(value, index+13)}
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

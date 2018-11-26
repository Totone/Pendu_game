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
        triedLetters: ['S', 'X'],
        goodLetters: ['B', 'L', 'E', 'S'],
        keysArray: ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'],
    }

    /*
    Réagir au clic de la souris
    */
    handleKeyClick = (letter, feedback, index) => {
        const { goodLetters, triedLetters, nbErrors } = this.state;

        if (feedback === 'unclicked') {

            const newArray = triedLetters;
            newArray.push(letter);
            //let newErrors = nbErrors;

            let isGood = false;
            for (var id in goodLetters){
                if (letter === goodLetters[id])
                isGood = true;
            }
            const newErrors = isGood ? nbErrors : nbErrors + 1;

            this.setState({
                triedLetters: newArray.sort(),
                nbErrors: newErrors,
            });

            console.log(triedLetters, newErrors)
        }
    }

    /**
     * Afficher les buttons correspondant aux lettres
     */
    getFeedbackForKey(letter, index) {
        const {triedLetters, goodLetters} = this.state;

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
                  nbErrors={this.state.nbErrors}
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

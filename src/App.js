import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import shuffle from 'lodash.shuffle';

import Screen from './Screen';
import './Keyboard.css';
import Key from './Key';
import Letter from './Letter';


const NB_ATTEMPTS = 10;
const WORDS = [
    'PARI', 
    'JUVENILE', 
    'TOXICO', 
    'PHILANTROPIQUE', 
    'BAZAR', 
    'DJORKAEFF']

class App extends Component {    
    state = {
        nbErrors: 0,
        triedLetters: ['S', 'X'],
        goodLetters: ['B', 'L', 'E', 'S'],
        keysArray: ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'],
        actualWord: 'ZEUBI'
    }

    initState() {
        const newWord = WORDS[Math.ceil(Math.random*100*WORDS.length)];
        const arrayWord = Array.from(newWord);
        this.setState({
            nbErrors: 0,
            triedLetters: [],
            goodLetters: arrayWord,
            keysArray: ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'],
            actualWord: newWord
            }); 
            
    }

    /**
     * Transformer l'expression à trouver en tableau
     */ 
    getGoodLettersArray(expression) {
        return Array.from(expression);
    }

    /**
     * Réaction au clic d'une key
     * 
     * Si la key est déjà cliquée y'a rien à faire 
     * Sinon on ajoute la key dans triedLetters[]
     * et on ajoute une erreur si la key n'est pas dans goodLetters[]
     * 
     * A faire:
     * - état du jeu (gagné?perdu?) à la fin
     *      appeler une nouvelle fonction et faire tous les bails de vérif
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
     * 
     * 3 possibilités:
     *  - si la valeur du button n'est pas dans triedLetters[] 
     *      on return 'unclicked'
     *  - sinon:
     *      - si la valeur du button est dans goodLetters[]
     *          on return 'success'
     *      - sinon on return 'failure'
     */
    getFeedbackForKey(letter) {
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

    /**
     * Donner le feedback de chaque lettre du mot à trouver
     */
    getFeedbackForLetter

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

                <div className="expression">
                    {
                        Array.from(this.state.actualWord).map((letter, index, feedbackFunc) => (
                            <Letter
                              key={index}
                              letter={letter}
                              feedback={feedbackFunc}
                            />
                        ))
                    }
                </div>

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

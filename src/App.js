import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import logo from './logo.svg';
import './App.css';

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
    'ZIDAAAANE',
    'FOLKLORE', 
    'PARASITE', 
    'GENIE'
]

class App extends Component {   
    constructor(props) {
        super(props);
        const newWord = WORDS[Math.floor(Math.random()*WORDS.length)];

        this.state = {
            nbErrors: 0,
            gameState: 'PLAY',
            triedLetters: [],
            goodLetters: Array.from(newWord),
            keysArray: ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'],
        }
    }

    /**
     * Réinitialiser le state en cas de victoire ou de défaite
     */
    initState = () => {
        const newWord = WORDS[Math.floor(Math.random()*WORDS.length)];
        const arrayWord = Array.from(newWord);
        this.setState({
            nbErrors: 0,
            triedLetters: [],
            goodLetters: arrayWord,
            gameState: 'PLAY',
            }); 
            
    }

    /**
     * Vérifier l'état du jeu
     * Envoie une popup qui dit si t'as perdu ou gagné selon le cas
     * 
     * 3 cas
     *      Le nombre d'erreurs est supérieur ou égal à 10
     *          Faire une popup pour dire "perdu"
     *      On vérifie pour chaque letter si sa valeur est dans triedLetters
     *          Si c'est bon on fait une popup pour dire "gagné"
     *      Sinon ya R on continue
     */
    isFinished() {
        const {nbErrors, triedLetters, goodLetters} = this.state;
        if (nbErrors >= 10) {
            this.setState({gameState: 'LOSE'});
            alert("T'as perdu t'es nul");
        }
        
        var valid = 0;
        for (var x in goodLetters) {
            for(var y in triedLetters) {
                if (goodLetters[x] === triedLetters[y]) {
                    valid++;
                }
            }
        }
        console.log(`${valid} réussites sur ${goodLetters.length}`);
        if (valid === goodLetters.length) {
            this.setState({gameState: 'WIN'});
            alert("T'as gagné t'es trop fort");
        }
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
    handleKeyClick = (letter, feedback) => {
        const { gameState, goodLetters, triedLetters, nbErrors } = this.state;

        if (gameState === 'PLAY' && feedback === 'unclicked') {
            // ajout de la lettre à triedLetters[]
            const newArray = triedLetters;
            newArray.push(letter);

            // vérif si la lettre est bonne ou pas
            let isGood = false;
            for (var id in goodLetters){
                if (letter === goodLetters[id])
                isGood = true;
            }
            // ajout d'une erreur si nécessaire
            const newErrors = isGood ? nbErrors : nbErrors + 1;

            // setState
            this.setState({
                triedLetters: newArray.sort(),
                nbErrors: newErrors,
            });

            console.log(triedLetters, this.state.nbErrors)
            this.isFinished();
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
     * 
     * 2 possibilités
     *      La lettre est dans triedLetters[]
     *          return "known"
     *      La lettre n'y est pas
     *          return "unknown"
     */
    getFeedbackForLetter(letter) {
        const {triedLetters} = this.state;

        for (var value in triedLetters) {
            if (letter === triedLetters[value]) {
                return "known";
            }
        }
        return "unknown";
    }

    render() {
        const { keysArray, nbErrors, goodLetters, gameState } = this.state;
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

                <h1>Trouvez le bon mot !</h1>

                <article id="wrapper">
                    <section>
                        <Screen
                        nbAttempts={NB_ATTEMPTS} 
                        nbErrors={nbErrors}
                        gameState={gameState}
                        />

                        <div className="expression">
                            {
                                goodLetters.map((letter, index) => (
                                    <Letter
                                    key={index}
                                    letter={letter}
                                    feedback={this.getFeedbackForLetter(letter)}
                                    />
                                ))
                            }
                        </div>
                    </section>
                    
                    <section>
                        <div className="keyboard">
                            { 
                                Array.from(keysArray[0]).map((value) => (    
                                    <Key
                                    key={value}
                                    letter={value} 
                                    feedback={this.getFeedbackForKey(value)}
                                    clickEvent={this.handleKeyClick}
                                    />
                                ))
                            }
                        </div>
                        <div className="keyboard">
                            {
                                Array.from(keysArray[1]).map((value) => (    
                                    <Key
                                    key={value}
                                    letter={value} 
                                    feedback={this.getFeedbackForKey(value)}
                                    clickEvent={this.handleKeyClick}
                                />
                                ))
                            }
                        </div>
                        
                        <button 
                        className={gameState === 'PLAY' ? 'restart' : 'restartFinished'}
                        onClick={this.initState}
                        >
                            Recommencer
                        </button>
                    </section>
                </article>
            </div>
        );
    }
}

export default App;

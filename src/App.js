import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Screen from './Screen';
import Key from './Key';
import Letter from './Letter';


class App extends Component {   
    constructor(props) {
        super(props);
        const words = [
            'PARI', 
            'JUVENILE', 
            'TOXICO', 
            'PHILANTROPIQUE', 
            'BAZAR', 
            'ZIDAAAANE',
            'FOLKLORE', 
            'PARASITE', 
            'GENIE',
            'MALSAIN', 
            'PURIFIER',
            'CRISTALINE',
            'SOURCE',
            'TAMBOURINNER'
        ]
        const newWord = words[Math.floor(Math.random()*words.length)];

        this.state = {
            nbTries: 0,
            nbErrors: 0,
            gameState: 'PLAY',
            triedLetters: [],
            goodLetters: Array.from(newWord),

            keysArray: ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'],
            nbAttempts: 10,
            words: words,

        }
    }

    /**
     * Réinitialiser le state en cas de victoire, défaite ou pour recommencer une partie
     * Fonction fléchée pour garantir le bon comportement (event)
     */
    initState = () => {
        const {words} = this.state;
        const newWord = words[Math.floor(Math.random()*words.length)];
        const arrayWord = Array.from(newWord);
        this.setState({
            nbTries: 0,
            nbErrors: 0,
            triedLetters: [],
            goodLetters: arrayWord,
            gameState: 'PLAY',
            }); 
            
    }

    /**
     * Vérifier l'état du jeu
     * Bloquer l'avancement du jeu et envoyer une popup en cas de défaite ou de victoire
     */
    isFinished() {
        const {nbErrors, nbTries, triedLetters, goodLetters} = this.state;

        // vérification de la défaite
        if (nbErrors >= 10) {
            this.setState({gameState: 'LOSE'});
            alert(`Vous avez perdu! Le mot à trouver était ${goodLetters.join('')}, vous aurez plus de chance à la prochaine partie!`);
        }
        
        // incrémentation d'une variable à chaque bonne lettre dans triedLetters[] pour valider la victoire
        let valid = 0;
        for (var x in goodLetters) {
            for(var y in triedLetters) {
                if (goodLetters[x] === triedLetters[y]) {
                    valid++;
                }
            }
        }
        if (valid === goodLetters.length) {
            this.setState({gameState: 'WIN'});
            alert(`Vous avez réussi! Vous avez trouvé le mot ${goodLetters.join('')} en ${nbTries} tentatives. Félicitations!`);
        }
    }
    /**
     * Réaction au clic d'une key
     * Fonction fléchée pour garantir le bon comportement (event)
     */
    handleKeyClick = (letter, feedback) => {
        const { gameState, goodLetters, triedLetters, nbErrors, nbTries } = this.state;

        //produit un effet seulement si on joue et qu'on clique sur une key non cliquée
        if (gameState === 'PLAY' && feedback === 'unclicked') {
            // incrémentation du compteur de tentatives
            const newNbTries = nbTries+1;
            this.setState({nbTries: newNbTries});

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

            // update
            this.setState({
                triedLetters: newArray.sort(),
                nbErrors: newErrors,
            });

            // vérification de l'état du jeu
            this.isFinished();
        }
    }

    /**
     * Récupérer le feedback des lettres pour savoir comment les afficher
     * @param letter: key ciblée
     */
    getFeedbackForKey(letter) {
        const {triedLetters, goodLetters} = this.state;

        for (var val1 in triedLetters) {
            if (letter === triedLetters[val1]) {
                // Si la lettre est dans triedLetters[]
                for (var val2 in goodLetters) {
                    if (letter === goodLetters[val2]) 
                    // ET dans goodLetters[] -> success
                        return 'success';
                }
                // Si elle n'est que dans triedLetters[] -> failure
                return 'failure';
            }
        }
        // Si elle n'est dans aucun tableau -> unclicked
        return 'unclicked';
    }

    /**
     * Donner le feedback des lettres du mot à trouver pour savoir comment les afficher
     * @param letter: lettre ciblée
     */
    getFeedbackForLetter(letter) {
        const {triedLetters} = this.state;

        for (var value in triedLetters) {
            if (letter === triedLetters[value]) {
                // Si la lettre est dans triedLetters[] -> known
                return "known";
            }
        }
        // Si elle n'y est pas -> unknown
        return "unknown";
    }

    render() {
        const { keysArray, nbErrors, nbAttempts, goodLetters, gameState } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img 
                        src={logo} 
                        className="App-logo" 
                        alt="logo" 
                    />
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
                            nbAttempts={nbAttempts} 
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

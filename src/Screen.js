import React from 'react';
import PropTypes from 'prop-types';
import './Screen.css'

const Screen = ({nbAttempts, nbErrors, gameState}) => (
    <section className="Screen">
        <p>
            {
                gameState === 'WIN' || gameState === 'LOSE' ?
                    gameState === 'WIN' ?
                        'Vous avez gagné!'
                    :
                        'Vous avez perdu...'
                :
                    nbAttempts - nbErrors === 0 ?
                        "Vous n'avez plus le droit à l'erreur!"
                    :
                        `Vous pouvez vous tromper encore ${nbAttempts - nbErrors} fois!`
            }
        </p>
        <img
            src= {require(`./images/state${nbErrors}.png`)}
            className="RoundState" 
            alt= {`Encore ${nbAttempts - nbErrors} tentatives!`}
        />
    </section>
)

Screen.propTypes = {
    nbErrors: PropTypes.number.isRequired,
}

export default Screen;
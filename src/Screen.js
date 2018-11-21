import React from 'react';
import PropTypes from 'prop-types';
import './Screen.css'

const Screen = ({nbAttempts, nbErrors}) => (
    <section className="Screen">
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
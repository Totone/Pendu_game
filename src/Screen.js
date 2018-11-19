import React from 'react';
import PropTypes from 'prop-types';

const Screen = ({nbAttempts, nbErrors}) => (
    <section>
        <img
            src={require(`../images/state${nbErrors}.png`)} 
            className="RoundState" 
            alt= {`Encore ${nbAttempts - nbErrors} tentatives!`}
        />
    </section>
)

Screen.PropTypes = {
    nbErrors: PropTypes.number.isRequired,
}

export default Screen
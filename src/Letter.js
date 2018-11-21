import React from "react";
import PropTypes from 'prop-types';

const UNKNOWN_LETTER = '_';

const Letter = ({letter, feedback}) => (
    <span className="">
        {
            feedback === 'unkown' ?
                UNKNOWN_LETTER                
            :
                letter
        }
    </span>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'known',
        'unknown', 
    ]).isRequired
}

export default Letter;
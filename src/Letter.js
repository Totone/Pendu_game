import React from "react";
import PropTypes from 'prop-types';
import './Letter.css';


const UNKNOWN_LETTER = '_';

const Letter = ({letter, feedback}) => (
    <span className="letter">
        {
            feedback === 'unknown' ?
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

Letter.defaultProps = {
    feedback: "unknown"
}

export default Letter;
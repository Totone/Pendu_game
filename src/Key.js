import React from "react";
import PropTypes from 'prop-types';
import './Key.css'

const Key = ({letter, index, feedback, clickEvent}) => (
    <span 
        className={`key-${feedback}`}
        onClick={() => clickEvent(letter, feedback, index)}
    >
        {letter}
    </span>
)

Key.propTypes = {
    letter: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    feedback: PropTypes.oneOf([
        'unclicked',
        'success',
        'failure'
    ]).isRequired,
    clickEvent: PropTypes.func.isRequired
}

export default Key;
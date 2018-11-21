import React from "react";
import PropTypes from 'prop-types';
import Key from './Key'
import './Keyboard.css'


const Keyboard = ({ keyList, keysClickEvent }) => (
    <div className="keyboard">
        {
            Array.from(keyList).map((letter) => (    
                <Key
                    key={letter}
                    letter={letter} 
                    feedback="unclicked"
                    clickEvent={() => keysClickEvent(Key.letter, Key.feedback)}
                />
            ))
        }
    </div>
)

Keyboard.propTypes = {
    keyList: PropTypes.string.isRequired,
}

export default Keyboard;
import React from "react";
import PropTypes from 'prop-types';
import Key from './Key'
import './Keyboard.css'


const Keyboard = ({ keyList }) => (
    <div className="keyboard">
        {
            Array.from(keyList).map((letter, index) => (    
                <Key
                    key={index}
                    letter={letter} 
                    feedback="unclicked"
                />
            ))
        }
    </div>
)

Keyboard.propTypes = {
    keyList: PropTypes.string.isRequired,
}

export default Keyboard;
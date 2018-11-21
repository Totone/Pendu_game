import React from "react";
import PropTypes from 'prop-types';
import Letter from './Letter';

const Expression = ({word}) => (
    <div className="expression">
        {
            Array.from(word).map((letter, index) => (
                <Letter
                    key={index}
                    letter={letter}
                />
            ))
        }
    </div>
)

Expression.propTypes = {
    word: PropTypes.string.isRequired
}

export default Expression;
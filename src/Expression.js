import React from "react";
import PropTypes from 'prop-types';
import Letter from './Letter';

const Expression = ({word}) => (
    <div className="expression">
        {
            Array.from(word).map((letter, index, feedbackFunc) => (
                <Letter
                    key={index}
                    letter={letter}
                    feedback={feedbackFunc}
                />
            ))
        }
    </div>
)

Expression.propTypes = {
    word: PropTypes.string.isRequired,
    feedbackFunc: PropTypes.func.isRequired,
}

export default Expression;
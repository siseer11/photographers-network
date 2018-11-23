import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({clickHandler, classes, children}) => {
    return (
        <p onClick={clickHandler} className={classes}>{children}</p>
    );
};

Button.propTypes = {
    classes: PropTypes.string.isRequired
};
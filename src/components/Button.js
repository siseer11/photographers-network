import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({clickHandler, classes, children}) => {
    return (
        <a onClick={clickHandler} className={classes}>{children}</a>
    );
};

Button.propTypes = {
    classes: PropTypes.string.isRequired
};
import React from 'react';

const Button = ({text, onClick, style}) => {
    return(
        <button className={style} onClick={onClick}>{text}</button>
    );
};

export default Button;
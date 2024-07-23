import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.js'
import pstyle from './EntrancePage.module.css'
import bstyle from '../Button/Button.module.css'

const EntrancePage = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin');
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className={pstyle.back}>
            <div className={pstyle.buttonsContainer}>
                <Button text={"Sign In"} onClick={handleSignInClick} style={bstyle.entrancePageButton}></Button>
                <Button text={"Sign Up"} onClick={handleSignUpClick} style={bstyle.entrancePageButton}></Button>
            </div>
            <div className={pstyle.container}>
                <h1>Welcome to AUT Messenger!</h1>
            </div>
        </div>

    );
};

export default EntrancePage;
import React, {useState} from 'react';
import pstyle from './SignInPage.module.css'
import Button from '../Button/Button.js'
import bstyle from '../Button/Button.module.css'
import axios from "axios";



const SignInPage = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleSignInClick = async (event) => {
        if (!inputs.username || !inputs.password) {
            alert("Please fill both username and password");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/login/', {
                user_name: inputs.username,
                password: inputs.password
            });

            console.log(response.data);
            const access = response.data.data.access
            const refresh = response.data.data.refresh

            // Save tokens in local storage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Update the state with the API response
            // setApiResponse(JSON.stringify(response.data));
            //
            // // Show the API response in an alert
            // alert(JSON.stringify(access));
            // alert(JSON.stringify(refresh));
        } catch (error) {
            console.error(error);
            alert('An error occurred during sign-in.');
        }
    };
    return(
        <div className={pstyle.background}>
            <div className={pstyle.signinpage}>
            <h1 className={pstyle.signinheading}>Sign in</h1>
            <form className={pstyle.signinform}>
                <label htmlFor="username">Username</label>
                <input value={inputs.username} type="text" required id="username" onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />

                <label htmlFor="password">Password</label>
                <input value={inputs.password} type="password" required id="password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            </form>
            <Button text={"Login"} style={bstyle.loginButton} onClick={handleSignInClick}></Button>
            <p>Have not account yet?</p>
            <a href={"http://localhost:3000/signup"}>Sign Up</a>
            </div>
        </div>
    );
};

export default SignInPage;
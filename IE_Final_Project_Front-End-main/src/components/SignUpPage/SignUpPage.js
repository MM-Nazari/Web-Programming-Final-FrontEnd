import React, {useRef, useState} from 'react';
import Button from '../Button/Button.js'
import bstyle from '../Button/Button.module.css'
import pstyle from "./SignUpPage.module.css";
import profile_placeholder from '../../Assets/profile_place_holder.png'
import axios from 'axios'


const SignUpPage = () => {
    const [selectedImage, setSelectedImage] = useState(profile_placeholder);
    const fileInputRef = useRef(null);
    const [inputs, setInputs] = useState({
        fname: '',
        lname: '',
        phone: '',
        username: '',
        password: '',
        bio: ''
    });

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          setSelectedImage(reader.result);
        };

        if (file) {
          reader.readAsDataURL(file);
        }
    }

    const handleSignUpClick = (event) => {
        if (!inputs.username || !inputs.password || !inputs.phone){
            alert("please fill required inputs");
            return;
        }
        if (!inputs.lname && !inputs.fname){
            alert("please fill at least one of the names");
            return;
        }
        /*
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                // Handle the response data here
                console.log(response.data);
            })
            */


        axios.post('http://localhost:8000/api/v1/register/',
            {
                'first_name': inputs.fname,
                'last_name': inputs.lname,
                'phone': inputs.phone,
                'user_name': inputs.username,
                'password': inputs.password,
                'bio': inputs.bio,
                'profile_image' : selectedImage
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }

    return(
        <div className={pstyle.backgournd}>
            <div className={pstyle.signUpPage}>
            <h1 className={pstyle.signUpHeading}>Sign Up</h1>
            <div className={pstyle.profileImgCont}>
                <img className={pstyle.profileImg} src={selectedImage} alt="profile"/>
                <input type="file" style={{ display: 'none' }} accept={"image/*"} ref={fileInputRef} onChange={handleFileChange} />
                <Button style={bstyle.addPhotoButton} onClick={handleButtonClick}></Button>
            </div>
            <form className={pstyle.signUpForm}>
                <label htmlFor="FirstName">First Name</label>
                <input value={inputs.fname} type="text" id="FirstName" onChange={(e) => setInputs({ ...inputs, fname: e.target.value })}/>

                <label htmlFor="LastName">Last Name</label>
                <input value={inputs.lname} type="text" id="LastName" onChange={(e) => setInputs({ ...inputs, lname: e.target.value })} />

                <label className={pstyle.reqStar} htmlFor="Phone">Phone</label>
                <input value={inputs.phone} type="text" required id="Phone" onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}/>

                <label className={pstyle.reqStar} htmlFor="Username">Username</label>
                <input value={inputs.username} type="text" required id="Username" onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>

                <label className={pstyle.reqStar} htmlFor="Password">Password</label>
                <input value={inputs.password} type="password" required id="Password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>

                <label htmlFor="Bio">Bio</label>
                <input value={inputs.bio} type="text" id="Bio" onChange={(e) => setInputs({ ...inputs, bio: e.target.value })} />
            </form>
            <Button style={bstyle.signupButton} text={"Sign Up"} onClick={handleSignUpClick}></Button>
        </div>
        </div>
    );
};

export default SignUpPage;
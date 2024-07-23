import React, {useEffect, useRef, useState} from 'react'
import pstyle from './ProfilePage.module.css'
import Button from "../Button/Button";
import bstyle from "../Button/Button.module.css";
import axios from "axios";
// import jwt-decode;

const ProfilePage = () => {

    // // Extract user ID from the access token in local storage
    // const accessToken = localStorage.getItem('accessToken');
    // const tokenParts = accessToken.split('.');
    //
    // // Check if the token has the expected format
    // if (tokenParts.length === 3) {
    //     const payload = JSON.parse(atob(tokenParts[1]));
    //     const userId = payload.user_id;
    //     // Construct the API URL with the user ID
    //     const apiUrl = `http://localhost:8000/api/v1/users/${userId}/`;
    //     let fname = '';
    //
    //     // Send the delete request with the JWT token in the Authorization header
    //     axios.get(apiUrl, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             fname = response.data.data.first_name;
    //
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             if (error.response.status === 401) {
    //                 // Handle unauthorized access (e.g., redirect to login page)
    //                 alert('Unauthorized access. Please log in.');
    //             } else {
    //                 // Handle other errors
    //                 alert('An error occurred while deleting.');
    //             }
    //         });
    // }
    //
    // const [inputs, setInputs] = useState({
    //     fname: '',
    //     lname: '',
    //     phone: '',
    //     username: '',
    //     password: '',
    //     bio: ''
    // });

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        user_name: '',
        password: '',
        bio: '',
        profile_image : ''
    });

    const accessToken = localStorage.getItem('accessToken');
    const tokenParts = accessToken.split('.');

    useEffect(() => {
        // Check if the token has the expected format
        if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            const userId = payload.user_id;

            // Construct the API URL with the user ID
            const apiUrl = `http://localhost:8000/api/v1/users/${userId}/`;

            // Send the GET request with the JWT token in the Authorization header
            axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    console.log(response.data);
                    // Update the state with user data
                    setUserData(response.data.data);

                })
                .catch(error => {
                    console.error(error);
                    if (error.response.status === 401) {
                        // Handle unauthorized access (e.g., redirect to login page)
                        alert('Unauthorized access. Please log in.');
                    } else {
                        // Handle other errors
                        alert('An error occurred while retrieving user data.');
                    }
                });
        }
    }, []);
    const fileInputRef = useRef(null);
    /*TODO: receive image from server and place it as initial value instead of null*/
    const [selectedImage, setSelectedImage] = useState(null);


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

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleSaveClick = (event) =>{
        // Extract user ID from the access token in local storage
        const accessToken = localStorage.getItem('accessToken');
        const tokenParts = accessToken.split('.');

        // Check if the token has the expected format
        if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            const userId = payload.user_id;
            // Construct the API URL with the user ID
            const apiUrl = `http://localhost:8000/api/v1/users/${userId}/`;

            // Send the delete request with the JWT token in the Authorization header
            axios.patch(apiUrl, {
                'first_name': userData.first_name,
                'last_name': userData.last_name,
                'phone': userData.phone,
                'user_name': userData.user_name,
                'password': userData.password,
                'bio': userData.bio,
                'profile_image' : userData.profile_image

            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                    if (error.response.status === 401) {
                        // Handle unauthorized access (e.g., redirect to login page)
                        alert('Unauthorized access. Please log in.');
                    } else {
                        // Handle other errors
                        alert('An error occurred while deleting.');
                    }
                });
        }
    }

    const handleLogoutClick = (event) =>{
        // Clear authentication tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Redirect the user to the login page
        // You can use your preferred routing library or window.location
        // For example, using React Router:
        // import { useHistory } from 'react-router-dom';
        // const history = useHistory();
        // history.push('/login');
        window.location.href = '/signin';

    }

    const handleDeleteClick = () => {
        // Extract user ID from the access token in local storage
        const accessToken = localStorage.getItem('accessToken');
        const tokenParts = accessToken.split('.');

        // Check if the token has the expected format
        if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            const userId = payload.user_id;
            // Construct the API URL with the user ID
            const apiUrl = `http://localhost:8000/api/v1/users/${userId}/`;

            // Send the delete request with the JWT token in the Authorization header
            axios.delete(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                    if (error.response.status === 401) {
                        // Handle unauthorized access (e.g., redirect to login page)
                        alert('Unauthorized access. Please log in.');
                    } else {
                        // Handle other errors
                        alert('An error occurred while deleting.');
                    }
                });
        }
    }



    // const handleDeleteClick = (event) => {
    //     const id = 4
    //     axios.delete('http://localhost:8000/api/v1/users/$id/')
    //         .then(response => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    return(
        <div className={pstyle.background}>
            <div className={pstyle.profilePage}>
                <h1 className={pstyle.profileHeading}>Profile</h1>
             <div className={pstyle.profileImgCont}>
                <img className={pstyle.profileImg} src={userData.profile_image} alt="profile"/>
                <input type="file" style={{ display: 'none' }} accept={"image/*"} ref={fileInputRef} onChange={handleFileChange} />
                <Button style={bstyle.addPhotoButton} onClick={handleButtonClick}></Button>
            </div>
            <form className={pstyle.profileForm}>
                <label htmlFor="FirstName">First Name</label>
                <input value={userData.first_name} type="text" id="FirstName" onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}/>

                <label htmlFor="LastName">Last Name</label>
                <input value={userData.last_name/*TODO: fill with received information*/} type="text" id="LastName" onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} />

                <label className={pstyle.reqStar} htmlFor="Phone">Phone</label>
                <input value={userData.phone/*TODO: fill with received information*/} type="text" required id="Phone" onChange={(e) => setUserData({ ...userData, phone: e.target.value })}/>

                <label className={pstyle.reqStar} htmlFor="Username">Username</label>
                <input value={userData.user_name/*TODO: fill with received information*/} type="text" required id="Username" onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}/>

                <label className={pstyle.reqStar} htmlFor="Password">Password</label>
                <input value={userData.password/*TODO: fill with received information*/} type="password" required id="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })}/>

                <label htmlFor="Bio">Bio</label>
                <input value={userData.bio/*TODO: fill with received information*/} type="text" id="Bio" onChange={(e) => setUserData({ ...userData, bio: e.target.value })} />
            </form>
            <Button style={bstyle.saveButton} text={"Save"} onClick={handleSaveClick}></Button>
            <Button style={bstyle.logoutButton} text={"Log out"} onClick={handleLogoutClick}></Button>
            <Button style={bstyle.deleteAccButton} text={"Delete Account"} onClick={handleDeleteClick}></Button>
            </div>
        </div>
    );
}

export default ProfilePage;

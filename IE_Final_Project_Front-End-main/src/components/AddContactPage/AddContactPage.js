import React from 'react'
import {useState} from "react";
import pstyle from './AddContactPage.module.css';
import searchButton from "../../Assets/search.png";
import User from "../User/User.js"
import Button from "../Button/Button.js";
import bstyle from '../Button/Button.module.css'
import axios from "axios";


const AddContactPage = ({onClose}) => {
    const [searchText, setSearchText] = useState(null);
    const [showSearchResult, setShowSearchResult] = useState(false);


        const result =[
        {id: 1, name: "Ali", username: 'ali_nrb', photo: ''},
        {id: 2, name: "Alireza", username: 'alireza', photo: ''},
        {id: 3, name: "Amirali", username: 'ali_sotoon', photo: ''},
    ]

    const handleSearch = () => {

            const accessToken = localStorage.getItem('accessToken');
            const tokenParts = accessToken.split('.');

            // Check if the token has the expected format
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                const userId = payload.user_id;
                // Construct the API URL with the user ID
                const apiUrl = `http://localhost:8000/api/v1/users/?user_name=${searchText}`;

                // Send the delete request with the JWT token in the Authorization header
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(response => {
                        console.log(response.data);
                        const result = response.data.results;
                        // alert(JSON.stringify(result, null, 2));
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
            setShowSearchResult(true);
        }
        const handleClose = () => {
            onClose();
        }


    return(
        <div className={pstyle.mainContainer}>
            <div className={pstyle.innerContainer}>
                <Button onClick={handleClose} style={bstyle.closeButton} text={'X'}></Button>
                <div className={pstyle.topBar}>
                    <input placeholder={'search for contact'} type={"text"} value={searchText} onChange={(e) => setSearchText(e.target.value)} className={pstyle.searchBox}/>
                    <img src={searchButton} alt={"search"} className={pstyle.searchButton} onClick={handleSearch}/>
                </div>
                {showSearchResult && <div>
                    {
                        result.map((r) => (
                            <User key={r.id} name={r.name} photo={r.photo} username={r.username} isContact={false}></User>
                        ))
                    }
                </div>}
            </div>
        </div>
    );
}
export default AddContactPage;
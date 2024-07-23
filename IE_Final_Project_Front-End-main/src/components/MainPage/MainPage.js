import React, {useState} from 'react'
import pstyle from './MainPage.module.css'
import searchButton from '../../Assets/search.png'
import {useNavigate} from "react-router-dom";
import Chat from '../Chat/Chat.js'
import cstyle from '../Chat/Chat.module.css'
import ChatPage from "../ChatPage/ChatPage.js";
import send_button from '../../Assets/send_button.png'
import ContactInfoPage from "../ContactInfoPage/ContactInfoPage.js";
import addContact from '../../Assets/add_contact.png';
import contactsIcon from '../../Assets/contacts.png';
import AddContactPage from "../AddContactPage/AddContactPage.js";
import User from "../User/User.js";
import RightClick from "../RightClick/RightClick.js";
import axios from "axios";

const MainPage = () => {
    const navigate = useNavigate();
    {/*TODO: First use jwt to request for user information
       TODO: then set image of user to profile image*/}

    const [profileImage, setProfileImage] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [clickedChat, setClickedChat] = useState({
        id: 0,
        photo: '',
        name: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const [messageText, setMessageText] = useState(null);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [showAddContact, setShowAddContact] = useState(false);
    const [showContactList, setShowContactList] = useState(false);
    const [showRightClickMenu, setShowRightClickMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0, type:''});

    const handleProfileClick = () => {
        navigate("/profile");
    }

    // Extract user ID from the access token in local storage
    const accessToken = localStorage.getItem('accessToken');
    const tokenParts = accessToken.split('.');

    // Check if the token has the expected format
    if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const userId = payload.user_id;
        // Construct the API URL with the user ID
        const apiUrl = `http://localhost:8000/api/v1/chats/`;

        // Send the delete request with the JWT token in the Authorization header
        axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                console.log(response.data);
                const chats = response.data.results;
                // alert(JSON.stringify(chats, null, 2));
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


        const apiUrl2 = `http://localhost:8000/api/v1/users/${userId}/contacts/`;

        // Send the delete request with the JWT token in the Authorization header
        axios.get(apiUrl2, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                console.log(response.data);
                const contacts = response.data.results;
                // alert(JSON.stringify(contacts, null, 2));
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



    const chats = [
        {id: 1, photo: "", name: "Ali"},
        {id: 2, photo: "", name: "Reza"},
        {id: 3, photo: "", name: "Javad"},
    ]




    const contacts = [
        {id:1, name: 'Ali', username: 'ali', photo: ''},
        {id:2, name: 'Reze', username: 'reza', photo: ''},
        {id:3, name: 'Javad', username: 'javad', photo: ''},
    ]

    const handleChatClick =(id, photo, name) =>{
        setClickedChat({...clickedChat, id: id, photo: photo, name: name});
        setIsVisible(true);
        setShowContactInfo(false);
        console.log(`Chat ${id} clicked!`);
    }

    const handleContactClick =(photo, name) =>{
        /*TODO: get chat id first, if any*/
        const id = 3;
        setClickedChat({...clickedChat, id: id, photo: photo, name: name});
        setIsVisible(true);
        setShowContactInfo(false);
        console.log(`Chat ${id} clicked!`);
    }

    const handleContactInfoClick = () =>{
        setShowContactInfo(true);
    }

    const handleAddContactClick = () => {
        setShowAddContact(true);
    }

    const handleContactsClick = () => {
        setShowContactList(true);
    }

    const handleBackToChatClick = () => {
        setShowContactList(false);
    }

    const handleRightClick = (event, type) => {
        event.preventDefault();
        console.log(type);
        setContextMenuPosition({ x: event.clientX, y: event.clientY, type: type })
        setShowRightClickMenu(true);
    }

    return (
        <div className={pstyle.mainPage} onClick={() => setShowRightClickMenu(false)}>
            {showRightClickMenu && <RightClick y={contextMenuPosition.y} x={contextMenuPosition.x} deleteType={contextMenuPosition.type}></RightClick>}
            <div className={pstyle.leftSide}>
                <div className={pstyle.topBar}>
                    <img src={profileImage} alt="profile" className={pstyle.profileImage} onClick={handleProfileClick}/>
                    <input type={"text"} value={searchText} onChange={(e) => setSearchText(e.target.value)} className={pstyle.searchBox}/>
                    <img src={searchButton} alt={"search"} className={pstyle.searchButton}/>
                </div>
                {!showContactList && <div className={pstyle.chatList}>
                    {
                        chats.map((chat) => (
                            <Chat key={chat.id} photo={chat.photo} name={chat.name} onContextMenu={(e)=>handleRightClick(e, 'chat')}
                                  style={clickedChat === chat.id ? cstyle.clicked : cstyle.chat}
                                  onClick={() => handleChatClick(chat.id, chat.photo, chat.name)}></Chat>
                        ))
                    }
                </div>
                }
                {
                    /*TODO: request to get list of user's contacts*/
                    showContactList && <div className={pstyle.contactList}>
                        <button onClick={handleBackToChatClick}>back</button>
                        {
                            contacts.map((contact) => (
                                <User key={contact.id} name={contact.name} photo={contact.photo} username={contact.username} isContact={true} onContextMenu={(e) => handleRightClick(e,'contact')} onClick={()=> handleContactClick(contact.photo, contact.name)}></User>
                            ))
                        }
                    </div>
                }
                <div className={pstyle.contactContainer}>
                    <img src={addContact} alt={'add contact'} className={pstyle.contactIcons} onClick={handleAddContactClick}/>
                    <img src={contactsIcon} alt={'contacts'} className={pstyle.contactIcons} onClick={handleContactsClick}/>
                </div>
                {showAddContact && <AddContactPage onClose={() => setShowAddContact(false)}></AddContactPage>}
            </div>
            {isVisible && <div className={pstyle.rightSide}>
                <div className={pstyle.contactInfo} onClick={handleContactInfoClick}>
                    <img src={clickedChat.photo} alt={'contact'} className={pstyle.contactPhoto}/>
                    <h2 className={pstyle.contactName}>{clickedChat.name}</h2>
                    <label className={pstyle.status}>unknown</label>
                </div>
                <div className={pstyle.messageList}>
                    <ChatPage chat_id={clickedChat.id} contact_name={clickedChat.name} onRightClick={(e)=>handleRightClick(e, 'message')}></ChatPage>
                    {showContactInfo && <ContactInfoPage name={clickedChat.name} photo={clickedChat.photo} status={clickedChat} other_user_id={2} onClose={()=>setShowContactInfo(false)}></ContactInfoPage>}
                </div>
                <div className={pstyle.sendPanel}>
                    <textarea rows={'3'} cols={'70'} value={messageText} placeholder={'type your message'} className={pstyle.inputMessage} onChange={(e) => setMessageText(e.target.value)}></textarea>
                    <img src={send_button} className={pstyle.sendButton} alt={"send_button"}/>
                </div>
            </div>
            }
        </div>
    );
}

export default MainPage;
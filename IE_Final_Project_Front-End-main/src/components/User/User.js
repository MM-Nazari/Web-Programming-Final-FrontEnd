import React from "react";
import addContact from '../../Assets/add_contact.png'
import style from './User.module.css'

const User = ({name, photo, username, isContact, onContextMenu, onClick}) => {
    const handleAddContactClick = () =>{
        {/*TODO: make a request to add the user as contact*/}
        console.log("Yo Bitch");
    }

    return(
        <div onContextMenu={onContextMenu} onClick={onClick} className={style.container}>
            <div className={style.photoSide}>
                <img src={photo} alt={'photo'}/>
            </div>
            <div className={style.infoSide}>
                <label>{name}</label>
                <label>{'@' + username}</label>
                {!isContact && <img src={addContact} alt={'contact'} onClick={handleAddContactClick} className={style.addButton}/>}
            </div>
        </div>
    );
}
export default User;
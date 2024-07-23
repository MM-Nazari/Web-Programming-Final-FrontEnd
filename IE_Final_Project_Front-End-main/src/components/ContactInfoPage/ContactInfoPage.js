import React from 'react'
import style from './ContactInfoPage.module.css'

const ContactInfoPage = ({other_user_id, name, photo, status, onClose}) => {
    {/*TODO: make a request to server to get contact phone using other_user_id*/}
    const contact = {name: name, phone: '1234', photo: photo, status:status}

    const handleClose = () => {
        onClose();
    }

    return(
        <div className={style.contactInfo}>
            <div className={style.content}>
                <button onClick={handleClose}>close</button>
                <img src={contact.photo} alt={'photo'} className={style.contactImage}/>
                <label>{contact.name}</label>
                <label>{contact.phone}</label>
            </div>
        </div>
    );
}
export default ContactInfoPage;
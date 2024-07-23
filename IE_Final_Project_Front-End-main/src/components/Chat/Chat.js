import React from 'react'
import cstyle from './Chat.module.css'

const Chat = ({photo, name, onClick, style, onContextMenu}) => {
    return(
        <div className={style} onClick={onClick} onContextMenu={onContextMenu}>
            <img src={photo} className={cstyle.profile} alt={name}/>
            <label className={cstyle.name}>{name}</label>
        </div>
    );
}

export default Chat;

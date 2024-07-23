import React from 'react';
import style from './Message.module.css'

const Message = ({name, content, time, asSender, onContextMenu}) => {
    return(<div className={asSender?style.messageAsSender:style.messageAsReceiver} onContextMenu={onContextMenu}>
        <div className={style.name}>{name}</div>
        <div className={style.content}>{content}</div>
        <div className={style.time}>{time}</div>
    </div>);
}

export default Message;
import React from 'react'
import Message from '../Message/Message.js'

const ChatPage = ({chat_id, contact_name, onRightClick}) => {
    {/*TODO: retrieve all the messages inside the chat using chat_id*/}
    {/*TODO: retrieve user_id from storage in order to distinguish between sender and receiver*/}

    let user_id = 1;
    const messages =[
        {id: 1, sender_id: 1, receiver_id: 2, content: 'Hello, Whats up?', time: '12:15'},
        {id: 2, sender_id: 2, receiver_id: 1, content: 'Hi! Nothing specific', time: '12:18'},
        {id: 3, sender_id: 1, receiver_id: 2, content: 'Hello, Whats up?', time: '12:15'},
        {id: 4, sender_id: 2, receiver_id: 1, content: 'Hi! Nothing specific', time: '12:18'},
        {id: 5, sender_id: 1, receiver_id: 2, content: 'Hello, Whats up?', time: '12:15'},
        {id: 6, sender_id: 2, receiver_id: 1, content: 'Hi! Nothing specific', time: '12:18'},
        {id: 7, sender_id: 1, receiver_id: 2, content: 'Hello, Whats up?', time: '12:15'},
        {id: 8, sender_id: 2, receiver_id: 1, content: 'Hi! Nothing specific', time: '12:18'},
        {id: 9, sender_id: 1, receiver_id: 2, content: 'Hello, Whats up last?', time: '12:15'},
        {id: 10, sender_id: 2, receiver_id: 1, content: 'Hi! Nothing specific last', time: '12:18'}
    ]

    const handleRightClick=() =>{
        console.log("FUCK");
        onRightClick();
    }

    return (
        messages.map((message) => (
            <Message key={message.id} name={user_id===message.sender_id?'you':contact_name} time={message.time} content={message.content} asSender={user_id===message.sender_id} onContextMenu={onRightClick}></Message>
        ))
    );
}

export default ChatPage;

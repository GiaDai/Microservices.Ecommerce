import React from 'react'
import Message from './Message'

const ChatBox = () => {

    const messages = [
        {
            id: 1,
            message: 'Hello'
        },
        {
            id: 2,
            message: 'Hi'
        }
    ]

    return (
        <div className='pb-44 pt-20 containerWrap'>
            <Message message={messages[0]} />
        </div>
    )
}

export default ChatBox
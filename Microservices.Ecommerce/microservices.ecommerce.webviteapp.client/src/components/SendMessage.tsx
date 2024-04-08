import { useState } from 'react'

const SendMessage = () => {
    const [message, setMessage] = useState('');

    const handleMessageSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(message);
        setMessage('');
    }
    return (
        <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
            <form onSubmit={handleMessageSubmit} className="px-2 containerWrap flex">
                <input value={message} onChange={e => setMessage(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" placeholder="Type a message" />
                <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
            </form>
        </div>
    )
}

export default SendMessage
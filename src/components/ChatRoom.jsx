import React, {useState} from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useChatSocket from "../hooks/useChatSocket";
import "../styles/chatroom.css"


const ChatRoom = () =>{
    const defaultRoom = "room1";
    const [room, setRoom] = useState(defaultRoom);
    const [pendingRoom, setPendingRoom] = useState(room)

    const WS_URL = import.meta.env.VITE_WS_URL.replace('roomname', room);
    const { messages, sendMessage } = useChatSocket(WS_URL);
    
    // const handleSendMessage = (msg)=>{
    //     setMessages(prev=>[...prev, msg]);
    // };

    const handleRoomChange = (e) => {
        e.preventDefault();
        setRoom(pendingRoom);
    };

    return(
        <div className="chat-room">
            <form onSubmit={handleRoomChange} style={{marginBottom: "1em"}}>
                <label>
                    Room:{" "}
                    <input
                        value={pendingRoom} 
                        onChange= {e => setPendingRoom(e.target.value)}
                        placeholder="Enter room name"
                        style={{width:100}}
                    />
                </label>
                <button type="submit">Join</button>
            </form>
            <h2>Chat Room: {room}</h2>
            <MessageList messages={messages}></MessageList>
            <MessageInput onSend={sendMessage}></MessageInput>
        </div>
    );
};

export default ChatRoom;
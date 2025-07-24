import React, {useState} from "react";
import PropTypes from "prop-types";

const MessageInput = ({onSend}) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [file, setFile] = useState(null);

    const uploadUrl = import.meta.env.VITE_API_BASE + "upload/"

    const handleSumbit = async (e) => {
        e.preventDefault();
        if(!input.trim() && !file){
            alert("Message cannot be empty!")
            return;
        }

        let file_url = null;
        let file_name = null;

        if(file){
            const formData = new FormData();
            formData.append("file",file);
            const res = await fetch(uploadUrl,{
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            file_url = data.file_url;
            file_name = data.file_name;
        }


        setError(null);
        onSend({
            text: input,
            username : username.trim() ? username : "Anonymous",
            file_url,
            file_name,
        });
        setInput("");
        setFile(null);
    };
    return(
        <form className="message-input" onSubmit={handleSumbit} style={{display:'flex',gap:8}}>
            <input
                style={{flex:1}}
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Type name (optional)"
            />
            <input 
            style={{flex:3}}
            type="text" 
            value={input} 
            onChange={e => {
                setInput(e.target.value);
                setError(null);
            }}
            placeholder="Type..."
            autoFocus
            />
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
                accept="image/*,application/pdf,application/msword"
            />
            {file && <span style={{maxWidth:100, textOverflow: "ellipsis", whiteSpace:"nowrap", overflow: "hidden"}}>{file.name}</span>}
            <button type="submit">Send</button>   
            {error && <span className="error" style={{color: 'red'}}>{error}</span>}             
        </form>
    );
};

MessageInput.PropTypes = {
        onSend: PropTypes.func.isRequired
};

export default MessageInput;
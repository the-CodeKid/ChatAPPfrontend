import React from "react";

const MessageList = ({messages}) =>(
    <div className="message-list">
        {messages.map((msg, idx)=>(
            <div key={idx} className="message">
                <strong>{msg.username+":" || "Anonymous"}</strong> {msg.text}
                {msg.file_url && (
                    <>
                        <br />
                        {msg.file_url.match(/\.(jpg|jpeg|png|git)$/i) ?
                            (<img src={msg.file_url} alt={msg.file_name || "file"} style={{maxHeight: 200}}/>):
                            (<a href={msg.file_url} target="_blank" rel="noopener noreferrer">{msg.file_name || "Download file"}</a>)
                        }
                    </>
                )}
            </div>
        )
    )}
    </div>
);

export default MessageList;

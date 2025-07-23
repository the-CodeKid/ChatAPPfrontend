import { useEffect, useRef, useState } from "react";


export default function useChatSocket(wsURL) {
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);

    useEffect(()=>{
            setMessages([]);
            ws.current = new WebSocket(wsURL);

            ws.current.onopen =()=>{
                console.log("WebSocket Connected!");
            };
            ws.current.onmessage = (event) =>{
                try {
                    const data = JSON.parse(event.data);
                    setMessages((prev)=>[...prev,data]);
                } catch{
                    console.error("Invalid message:", event.data);
                }
            };
            ws.current.onclose = ()=>{
                console.log("WebSocket Disconnected!")
            };
            return () => {
                ws.current.close();
            };
        }, [wsURL]);


    const sendMessage = (msg) => {
        if(ws.current && ws.current.readyState==WebSocket.OPEN){
            ws.current.send(JSON.stringify(msg));
        } else {
            alert("WenSocket not connected");
        }
    };
    return { messages, sendMessage };
}
import { useEffect, useState } from "react";
import "../App.css";
import Message from '../Components/Message';
import Sender from '../Components/Sender';
import { Route, Routes } from 'react-router-dom';



import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Chat() {
    const [username, setUsername] = useState('Anonymous');
    const [messages, setMessages] = useState([]);
    const [audienceChat, setAudienceChat] = useState(false);

    useEffect(() => {
        // Subscribe to real-time inserts
        const channels = supabase.channel('custom-inserts')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    const newMessage = {
                        message: payload.new.message,
                        sender: payload.new.sender,
                        owner: payload.new.sender === username
                    };
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                }
            )
            .subscribe();

        const controls = supabase.channel('controller')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'controls' },
                (payload) => {
                    const canChat = payload.new.audienceChat;
                    setAudienceChat(canChat);
                }
            )
            .subscribe();

        return () => {
            // Unsubscribe from channel when component unmounts
            channels.unsubscribe();
        };
    }, [username]);



    return (
        <>

            <h1 style={{
                color: 'grey',
                fontSize: '1.5rem',
                margin: '5px',
            }} onClick={() => setUsername(prompt('Enter a username'))}>{username}</h1>
            <div className="Chat" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
            }}>
                {messages.map((msg, index) => {
                    return (
                        <Message
                            key={index}
                            message={msg.message}
                            sender={msg.sender}
                            owner={msg.sender === username}
                        />
                    );
                })}
            </div>
            <Sender username={username} canChat={true} />
        </>
    )

}

export default Chat;
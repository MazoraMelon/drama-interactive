import React, { useEffect, useState } from "react";
import "../App.css";
import Message from '../Components/Message';
import Sender from '../Components/Sender';
import { Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Chat() {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [messages, setMessages] = useState([]);
    const [audienceChat, setAudienceChat] = useState(false);

    useEffect(() => {
        // Function to set the username
        async function setUserName() {
            const storedUsername = localStorage.getItem('username');
            if (!storedUsername || storedUsername === 'Anonymous' || storedUsername === null) {
                const enteredUsername = prompt('Enter a username');
                if (enteredUsername) {
                    localStorage.setItem('username', enteredUsername);
                    setUsername(enteredUsername);
                }
            }
        }
        setUserName();
    }, []);

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





        return () => {
            // Unsubscribe from channels when component unmounts
            channels.unsubscribe();
        };
    }, [username]);

    return (
        <>
            <h1
                style={{
                    color: 'grey',
                    fontSize: '1.5rem',
                    margin: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    const newUsername = prompt('Enter a new username', username);
                    if (newUsername) {
                        localStorage.setItem('username', newUsername);
                        setUsername(newUsername);
                    }
                }}
            >
                {username}
            </h1>
            <div className="Chat" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
            }}>
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        message={msg.message}
                        sender={msg.sender}
                        owner={msg.sender === username}
                    />
                ))}
            </div>
            <Sender username={username} canChat={audienceChat} />
        </>
    );
}

export default Chat;

import { useEffect, useState } from "react";
import "../App.css";
import { Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import ActButton from "../Components/ActButton";
import ActGraph from "../Components/ActGraph";

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Board(props) {
    const [message, setMessage] = useState(":)");

    useEffect(() => {
        // Join a room/topic. Can be anything except for 'realtime'.
        const channelA = supabase.channel('actorMessage');

        // Simple function to log any messages we receive
        function messageReceived(payload) {
            setMessage(payload.payload.message);
        }

        // Subscribe to the Channel
        channelA
            .on(
                'broadcast',
                { event: 'actorMessage' },
                (payload) => messageReceived(payload)
            )
            .subscribe();

        // Unsubscribe when the component unmounts
        return () => {
            channelA.unsubscribe();
        };
    }, []); // Empty dependency array means this effect runs only once, on mount



    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'black',
                color: 'darkgrey',
                alignContent: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                fontSize: '3vw',
            }}>
                <h1>{message}</h1>
            </div>
        </>
    );
}

export default Board;

import { useEffect, useState } from "react";
import "../App.css";
import Message from '../Components/Message';
import Sender from '../Components/Sender';
import { Route, Routes } from 'react-router-dom';



import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Controls() {
    async function broadcast() {
        // Join a room/topic. Can be anything except for 'realtime'.
        const channelB = supabase.channel('show')

        channelB.subscribe((status) => {
            // Wait for successful connection
            if (status !== 'SUBSCRIBED') {
                return null
            }

            // Send a message once the client is subscribed
            channelB.send({
                type: 'broadcast',
                event: 'test',
                payload: { message: 'hello, world' },
            })
        })

    }
    return (
        <>
            <div>
                <h1>Controls</h1>
                <button onClick={broadcast}>Broadcast</button>
            </div>
        </>
    );
}
export default Controls;
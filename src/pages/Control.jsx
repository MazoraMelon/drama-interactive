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

    async function signIn(e) {
        e.preventDefault()
        const { user, error } = await supabase.auth.signInWithPassword({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
        console.log(user, error)
    }
    async function broadcasturl() {
        // Join a room/topic. Can be anything except for 'realtime'.
        const nexturl = document.getElementById('url').value

        const channelB = supabase.channel('show', {
            config: {
                broadcast: {
                    self: false,
                },
            },
        })

        channelB.subscribe((status) => {
            // Wait for successful connection
            if (status !== 'SUBSCRIBED') {
                return null
            }

            // Send a message once the client is subscribed
            channelB.send({
                type: 'broadcast',
                event: 'urlchange',
                payload: { url: nexturl },
            })
        })

    }
    return (
        <>
            <h1>Controls</h1>
            <div style={{
                backgroundColor: "#1f1f1f",
                padding: "20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "fit-content",
                alignSelf: "center",
            }}>
                <h2 style={{
                    color: "white",
                }}>URL Director</h2>
                <input id="url" type="text" placeholder="URL" style={{
                    padding: "10px",
                    backgroundColor: "#1f1f1f",
                    color: "white",
                    borderRadius: "10px",
                    border: "2px solid #424242",
                    outline: "none",
                    fontSize: "20px",
                }}></input><br />
                <button onClick={broadcasturl} style={{
                    padding: "10px",
                    backgroundColor: "#1f1f1f",
                    color: "white",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "20px",
                    marginBottom: "20px",
                    border: "2px solid #424242",
                    marginTop: "20px",
                    cursor: "pointer",
                    width: "200px",
                    alignSelf: "center",
                }}>Broadcast</button>
            </div>


            <form id="signinform" onSubmit={(e) => { signIn(e) }}>
                <input type="email" placeholder="Email" name="email" id="email" /><br />
                <input type="password" placeholder="Password" name="password" id="password" /><br />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}
export default Controls;
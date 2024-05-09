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
        localStorage.setItem('controller', 'true');
    }
    async function broadcasturl() {
        // Join a room/topic. Can be anything except for 'realtime'.
        const nexturl = document.getElementById('url').value
        //Set the current page in supabase
        const { data, error } = await supabase
            .from('controller')
            .update({ currentURL: nexturl })
            .eq('id', 1)
        if (error) {
            alert(error)
        }
    }



    async function actorMessage(e) {
        e.preventDefault()
        const message = document.getElementById('message').value
        // Join a room/topic. Can be anything except for 'realtime'.
        const channelB = supabase.channel('actorMessage')

        channelB.subscribe((status) => {
            // Wait for successful connection
            if (status !== 'SUBSCRIBED') {
                return null
            }

            // Send a message once the client is subscribed
            channelB.send({
                type: 'broadcast',
                event: 'actorMessage',
                payload: { message: message },
            })
        })





    }
    useEffect(() => {

        async function changeChat(canChatTickbox) {
            const { data, error } = await supabase
                .from('controller')
                .update({ audienceChat: canChatTickbox })
                .eq('id', 1)
            if (error) {
                alert(error)
            }
        }
        document.getElementById('canChat').addEventListener('change', (e) => {
            const canChatTickbox = e.target.checked
            changeChat(canChatTickbox)
        })
    })
    return (
        <>
            <div style={{
                backgroundColor: "#1f1f1f",
                color: "white",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                width: "100vw",
            }}>
                <h1>Controls</h1>
                <div style={{
                    backgroundColor: "#1f1f1f",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "2px solid #424242",
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

                <br />
                <input id="message" type="text" placeholder="ActorMessage" autoComplete="off" style={{
                    padding: "10px",
                    backgroundColor: "#1f1f1f",
                    color: "white",
                    borderRadius: "10px",
                    border: "2px solid #424242",
                    outline: "none",
                    fontSize: "20px",
                    marginBottom: "20px",
                    width: "300px",
                    alignSelf: "center",
                }} onSubmit={actorMessage} /><button style={{
                    padding: "10px",
                    backgroundColor: "#1f1f1f",
                    color: "white",
                    borderRadius: "10px",
                    width: "fit-content",
                    fontSize: "20px",
                    marginBottom: "20px",
                    border: "2px solid #424242",
                    marginTop: "0px",
                    cursor: "pointer",
                    alignSelf: "center",
                }} onClick={actorMessage}>Send Board Message</button>

                <label for="canChat">Can Chat</label><input type="checkbox" id="canChat" style={{
                    display: "flex",
                    width: "3vw",
                    height: "3vh",
                }} /><br />


                <form id="signinform" onSubmit={(e) => { signIn(e) }}>
                    <h2 style={
                        {
                            color: "red",
                        }
                    }>You must be signed in to not change page</h2>
                    <input type="email" placeholder="Email" name="email" id="email" /><br />
                    <input type="password" placeholder="Password" name="password" id="password" /><br />
                    <input type="submit" value="Submit" />
                </form>
                <button style={{
                    display: "none",
                    width: "200px",
                    border: "2px solid #424242",
                    borderRadius: "10px",
                    backgroundColor: "#1f1f1f",
                    color: "white",
                    height: "50px",
                }} id="signout" onClick={() => { supabase.auth.signOut() }}>Sign out</button>


            </div >
        </>
    );
}
export default Controls;
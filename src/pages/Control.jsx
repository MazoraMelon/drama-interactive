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

    // let domain = "http://localhost:3000/";
    let domain = "https://mazoramelon.github.io/drama-interactive/";
    const pagesMap = new Map([
        ["Home", `${domain}`],
        ["Chat", `${domain}#chat`],
        ["Vote", `${domain}#vote`],
        ["Running", `${domain}#running`],
        ["Lost", `${domain}#lost`],
    ]);

    // Iterate over the pages map and create buttons
    async function prepareButtons() {
        const container = document.getElementById("broadcastButtons");
        container.innerHTML = '';
        for (const [page, url] of pagesMap) {
            // Create a button element
            const button = document.createElement("button");
            // Set the button's text to the page name
            button.textContent = page;

            // Add a class to the button
            button.classList.add("broadcastButton");
            // Set the button's onclick function to navigate to the corresponding URL
            button.onclick = function () {
                broadcastfromButton(url);
            };
            // Append the button to the container
            container.appendChild(button);
        }
    }

    window.addEventListener('load', prepareButtons);



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

    async function broadcastfromButton(url) {
        const confirmed = window.confirm(`Are you sure you want to change the page to ${url}?`);
        if (!confirmed) {
            return;
        }
        // Join a room/topic. Can be anything except for 'realtime'.
        const nexturl = url
        //Set the current page in supabase
        const { data, error } = await supabase
            .from('controller')
            .update({ currentURL: nexturl })
            .eq('id', 1)
        if (error) {
            alert(error)
        }
    }



    async function actorMessage(e, messageParam) {
        if (e) {
            e.preventDefault()
        }
        if (messageParam) {
            var message = messageParam
        } else {
            var message = document.getElementById('message').value
        }

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


    let data = [{}]
    useEffect(() => {
        async function getActs() {
            const { data, error } = await supabase
                .from('acts')
                .select('*')

            console.log(data)
            if (error) {
                console.error("Error fetching acts:", error);
            }
            let div = document.getElementById("votes");
            div.innerHTML = "";
            const broadcastButtons = document.getElementById("broadcastButtons");
            data.forEach((act) => {

                if (act.completed === true) { // Only make buttons for completed acts
                    return
                }


                // Make the buttons for broadcasting the story url
                const button = document.createElement("button");
                button.textContent = `Broadcast ${act.name}`;
                const oldButton = document.getElementById(`${act.name}`);
                if (oldButton) {
                    oldButton.remove();
                }
                button.classList.add("broadcastButton");
                button.id = `${act.name}`;
                button.style = "display: flex; flex-direction: column; top: 0; left: 0; width: fit-content; color: darkgrey;";
                button.onclick = function () {
                    const confirmed = window.confirm(`Are you sure you want to change to ${act.name}?`);
                    if (confirmed) {
                        broadcastfromButton(`${domain}#story/${act.name}`);
                        actorMessage(null, `The life of ${act.name}`);

                        supabase.from('acts').update({ completed: true }).match({ name: act.name }).then(() => {
                            console.log(`Updated act ${act.name} to completed`);
                            window.location.reload();
                        });
                    }

                }
                broadcastButtons.appendChild(button);

            })
        }
        getActs()

    }, [])



    window.onload = function () {
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset Acts";
        resetButton.onclick = resetActs;
        document.getElementById("resetButtonLocation").appendChild(resetButton);
    }

    async function resetActs() {
        const confirmedReset = window.confirm("Are you sure you want to reset all completed acts?");
        console.log(confirmedReset);
        if (confirmedReset == true) {
            const { data, error } = await supabase
                .from('acts')
                .update({ completed: false })
                .eq('completed', true)
                .select('*')

            if (error) {
                console.error("Error resetting acts:", error);
            } else {
                window.location.reload();
            }
        }
    }



    useEffect(() => {
        const voteChannel = supabase.channel('votes')

        function messageReceived(payload) {
            const vote = payload.payload.vote;
            const div = document.getElementById(vote);
            let count = parseInt(div.textContent.split(" ")[1]) || 0;
            count++;
            div.textContent = `${vote} ${count}`;
        }

        voteChannel
            .on(
                'broadcast',
                { event: 'vote' },
                (payload) => messageReceived(payload)
            )
            .subscribe()


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



                    <div id="broadcastButtons">
                    </div>

                </div>
                <div id="resetButtonLocation"></div>

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
                }} onSubmit={actorMessage} /><label style={{
                    alignSelf: "center",
                    marginBottom: "10px",
                    color: "orangered",
                }}>Must be signed in on board</label><button style={{
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

                <div id="votes" style={{
                    position: 'absolute',
                    top: '10',
                    marginTop: '60px',
                    width: '100vw',
                    display: 'flex',
                    float: 'left',
                    width: 'fit-content',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'darkgrey',
                }}>
                </div>
            </div >
        </>
    );
}
export default Controls;
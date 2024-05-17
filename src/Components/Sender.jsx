import React, { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Sender(props) {
    const [canChat, setChattingOn] = useState(false);
    const [placeholder, setPlaceholder] = useState("Audience Chat Disabled");

    useEffect(() => {

        const isActor = localStorage.getItem('actor') === 'true';
        setChattingOn(isActor);
        if (!isActor) {
            const controller = supabase.channel('chat-channel')
                .on(
                    'postgres_changes',
                    { event: 'UPDATE', schema: 'public', table: 'controller' },
                    (payload) => {
                        if (payload.new.audienceChat !== null) {
                            const canNowChat = payload.new.audienceChat
                            console.log(canNowChat);
                            if (canNowChat === false && !isActor) {
                                setChattingOn(canNowChat);
                                console.log("Audience chat disabled");
                                setPlaceholder("Audience chat disabled");
                            } else {
                                console.log("Audience chat enabled");
                                setPlaceholder("Send a message");
                            }
                        }
                    }
                )
                .subscribe()

        }


    }, []);

    async function sendMessage(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const message = document.getElementById('message').value;
        if (message === "") {
            return;
        }
        document.getElementById('message').value = "";
        const { data, error } = await supabase
            .from('messages')
            .insert({ sender: props.username, message: message });
        console.log("Sending message: " + message);
    }

    async function getChatAllowed() {
        const { data, error } = await supabase
            .from("controller")
            .select('audienceChat')

        const canChat = data[0].audienceChat
        const isActor = localStorage.getItem('actor') === 'true';
        setChattingOn(isActor);

        if (!isActor) {
            console.log(canChat)
            setChattingOn(canChat)
            if (canChat === false) {
                setPlaceholder("Audience chat disabled")
            } else {
                setPlaceholder("Send a message")
            }
        } else {
            setPlaceholder("Send a message as an actor")
        }
    }
    getChatAllowed();

    return (
        <form
            onSubmit={sendMessage} // Call sendMessage when form is submitted
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                alignItems: "flex-end",
                alignSelf: "flex-end",
                bottom: "10px",
                position: "fixed",
                marginTop: "10px",
                alignContent: "center",
            }}
            aria-disabled={!canChat}
        >
            <input
                id="message"
                type="text"
                placeholder={placeholder}
                autoComplete="off"
                style={{
                    padding: "5px",
                    borderRadius: "20px",
                    border: "1px solid lightgrey",
                    width: "80%",
                    height: "1.5rem",
                    fontSize: "1rem",
                    outline: "none",
                }}
                disabled={!canChat}
            />
            <button
                type="submit" // Change button type to submit
                style={{
                    marginLeft: "5px",
                    padding: "5px",
                    backgroundColor: "#218aff",
                    color: "white",
                    border: "none",
                    height: "2rem",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                }}
            >
                Send
            </button>
        </form>
    );
}


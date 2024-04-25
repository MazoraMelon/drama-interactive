import React from "react";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Sender(props) {

    let canChat = true
    canChat ? console.log("Audience chat enabled") : console.log("Audience chat disabled");
    console.log(props.audienceChat)
    let placeolder = "Send a message"
    if (!canChat) {
        placeolder = "Audience chat not enabled"
    }

    async function sendMessage(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const message = document.getElementById('message').value;
        document.getElementById('message').value = "";
        const { data, error } = await supabase
            .from('messages')
            .insert({ sender: props.username, message: message });
        console.log("Sending message: " + message);
    }

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
                placeholder={placeolder}
                autoComplete="off"
                style={{
                    padding: "5px",
                    borderRadius: "20px",
                    border: "1px solid lightgrey",
                    width: "80%",
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

import { useEffect, useState } from "react";
import "../App.css";
import Message from '../Components/Message';
import Sender from '../Components/Sender';
import { Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import ActButton from "../Components/ActButton";

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Vote(props) {
    const [acts, setActs] = useState([]);

    useEffect(() => {
        async function fetchActs() {
            const { data, error } = await supabase.from('acts').select("*");
            if (error) {
                console.error("Error fetching acts:", error);
            } else {
                setActs(data);
            }
        }
        fetchActs();
    }, []);

    async function broadcastAct(name) {
        // Join a room/topic. Can be anything except for 'realtime'.
        const channelB = supabase.channel('votes')

        channelB.subscribe((status) => {
            // Wait for successful connection
            if (status !== 'SUBSCRIBED') {
                return null
            }

            // Send a message once the client is subscribed
            channelB.send({
                type: 'broadcast',
                event: 'vote',
                payload: { vote: name },
            })
        })

    }

    return (
        <>
            <div style={{
                padding: "40px",
                backgroundColor: "#1f1f1f",
                height: "100vh",
                alignItems: "center",
                height: "100vh",
                color: "white",
            }}>
                <h1 style={{
                    textDecoration: "underline",
                }}>It's up to you</h1>
                <h3>Who's story are you watching next?</h3>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    {acts.map((act) => (
                        <ActButton key={act.id} name={act.name} completed={act.completed} whenclick={() => broadcastAct(act.name)} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Vote;

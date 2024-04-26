import { useEffect, useState } from "react";
import "../App.css";
import Message from '../Components/Message';
import Sender from '../Components/Sender';
import { Route, Routes } from 'react-router-dom';



import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() {

    return (
        <>
            <div style={{
                padding: "40px",

                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1f1f1f",
                height: "100vh",
            }}>
                <h1 style={{
                    // Gradient from orange to red
                    color: "white",
                    textAlign: "center",
                    fontSize: "50px",
                    margin: "0px",
                    backgroundColor: "#262626",
                    borderRadius: "20px",
                }}>Welcome Aboard</h1>
                <h4 style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#e3e3e3",
                }
                }>During this performace, you will be introducted to simulated real life features, these are simulated and should not be interpreted as real life. <br /><br />
                    Please use appropriate language and when asked things like your first name, please place it in correctly otherwise you will have the site revoked </h4>

                <button style={{
                    color: "white",
                    backgroundColor: "#262626",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    width: "fit-content",
                    height: "50px",
                    alignSelf: "center",
                    left: "50%",
                    transform: "translateX(-50%)",
                    position: "absolute",
                }}>Preparing Show ▶▶▶</button>
            </div>
        </>
    );
}
export default Home;
import { useEffect, useState } from "react";
import "../App.css";
import Message from '../Components/Message';
import Sender from '../Components/Sender';
import { Route, Routes } from 'react-router-dom';
import "../Overflow.css";



import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Running() {

    const colors = [
        "blue",
        "aquamarine",
        "indigo",
        "mediumspringgreen",
        "purple"
    ];
    const spheres = [];
    for (let i = 0; i < 15; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const zIndex = Math.random() * 10;
        spheres.push(
            <div key={i} style={{
                position: "absolute",
                backgroundColor: color,
                height: "200px",
                width: "200px",
                borderRadius: "50%",
                left: x + "px",
                top: y + "px",
                filter: "blur(200px)",
                WebkitBackfaceVisibility: "hidden", /* Fixes a bug in safari where the blur filter doesn't work */
                overflow: "hidden",
            }
            } />
        );
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "hidden";
        };
    }, []);

    return (
        <>
            <div style={{
                padding: "40px",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1f1f1f",
                height: "110vh",
                width: "100vw",
                color: "white",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                zIndex: "10",
            }}>
                <h1 style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "50px",
                    margin: "0px",
                    position: "absolute",
                    height: "fit-content",
                    borderRadius: "20px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "10",
                }}>You don't need a phone right now :)</h1>

                {spheres}
            </div>
        </>
    );
}
export default Running;

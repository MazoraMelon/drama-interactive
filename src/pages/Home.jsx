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
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <>
            <div style={{
                padding: "0px",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1f1f1f",
                height: "100vh",
                color: "white",
                position: "fixed",
                left: "0px",
                top: "0px",
                width: "100vw",
                zIndex: "10",
            }}>
                <h1 style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "30px",
                    margin: "0px",
                    position: "relative",
                    borderRadius: "20px",
                    top: "20%",
                    left: "50%",
                    margin: "0px",
                    padding: "20px",
                    transform: "translate(-50%, -50%)",
                    zIndex: "10",
                }}>Hi there, the show is being set up :)</h1>
                <h3 style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "lightgrey",
                    position: "relative",
                    borderRadius: "20px",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "10",
                }}>During this show, you may see simulations, these are not real but please use within the context of the show</h3>
                <h3 style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "lightgrey",
                    position: "relative",
                    borderRadius: "20px",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "10",
                }}>We also ask you to use appropriate language and when asked for things like your first name, you do not put anything else :)</h3>

                {spheres}
            </div>
        </>
    );
}
export default Running;

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
                    <ActButton text="Ella" />
                    <ActButton text="Alex" />
                    <ActButton text="Courtney" />
                    <ActButton text="Marco" />
                    <ActButton text="Steve" />
                </div>
            </div>
        </>
    );
}
export default Vote;
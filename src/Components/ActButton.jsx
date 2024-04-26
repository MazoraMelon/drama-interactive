import React from "react";
import { createClient } from '@supabase/supabase-js'
import { act } from "react-dom/test-utils";

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ActButton(props) {
    let color = "white";
    if (props.completed === true) {
        color = "#424242"
    }

    return (
        <>
            <button onClick={props.onClick} style={{
                backgroundColor: "#1f1f1f",
                color: color,
                padding: "10px",
                borderRadius: "10px",
                fontWeight: "bold",
                margin: "10px",
                border: "3px solid #424242",
                cursor: "pointer",
                fontSize: "4vw",

            }}>
                {props.name}
            </button>
        </>
    );
}

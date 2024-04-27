import { useEffect, useState } from "react";
import "../App.css";
import { Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import ActButton from "../Components/ActButton";
import ActGraph from "../Components/ActGraph";

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function Board(props) {
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

    return (
        <>
            <h1>Board</h1>
            {acts.map((act, index) => (
                <ActGraph name={act.name} />
            ))}
        </>
    );
}

export default Board;

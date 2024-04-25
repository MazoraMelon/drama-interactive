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
        
        </>
    );
}
export default Home;
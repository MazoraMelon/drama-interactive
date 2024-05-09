import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Components/Message';
import Sender from './Components/Sender';
import { Route, Routes } from 'react-router-dom';

import { createClient } from '@supabase/supabase-js';
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';
import Controls from './pages/Control.jsx';
import Vote from './pages/Vote.jsx';
import Board from './pages/Board.jsx';

const supabaseUrl = "https://jftaxymlbutkjoacvtbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdGF4eW1sYnV0a2pvYWN2dGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjkxOTMsImV4cCI6MjAyOTU0NTE5M30.2aT1UzmiN34aKLNRUXAKwhKfnuwxMoiM3eMkHs1oyZU";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [user, setUser] = useState(null);


  async function getURL() {
    const { data, error } = await supabase
      .from("controller")
      .select('currentURL')
      .limit(1)
    const url = data[0].currentURL
    console.log("URL: " + window.location.href)
    console.log("Supabase: " + url)
    if (url !== "" && url !== null && !user) {
      if (url !== window.location.href) {
        if (!window.location.pathname.toLowerCase().includes("controls")) {
          if (!window.location.pathname.toLowerCase().includes("board")) {
            window.location.href = url
          }
        }
      }
    }

  }
  getURL()

  async function getUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUser(null);
        console.log("No user");
        throw error;
      }
      if (data.user) {
        setUser(data.user);
        console.log(data.user);
      } else {
        setUser(null);
        console.log("No user");
      }
      if (document.getElementById('signinform')) {
        document.getElementById('signinform').style.display = 'none';
        document.getElementById('signout').style.display = 'flex';
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []); // Run only on component mount

  useEffect(() => {

    const urlchanges = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        (payload) => {
          const url = payload.new.currentURL
          console.log("URL: " + window.location.href)
          if (url !== "" && url !== null) {
            if (url !== window.location.href) {
              if (!window.location.pathname.toLowerCase().includes("controls")) {
                if (!window.location.pathname.toLowerCase().includes("board")) {
                  console.log("URL: " + url)
                  window.location.href = url
                }
              }
            }
          }
        }
      )
      .subscribe()
  })

  useEffect(() => {
    if (!user) {
      // REALTIME LISTENERS
      const channelA = supabase.channel('show');

      function messageReceived(payload) {
        alert("Got it");
        console.log(payload);
        const url = payload.payload.url;
        if (url !== window.location.href) {
          window.location.href = url
        }
      }


    }
  }, [user]); // Run whenever user changes

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  );
}

export default App;

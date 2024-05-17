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
import Running from './pages/Running.jsx';
import Waiting from './pages/Waiting.jsx';
import Lost from './pages/Lost.jsx';
import Story from './pages/Story.jsx';

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
    const newurl = data[0].currentURL
    console.log("Current url: " + window.location.href)
    console.log("Supabase given url: " + newurl)
    if (newurl !== "" && newurl !== null && !user) {
      if (newurl !== window.location.href) {
        if (!window.location.pathname.toLowerCase().includes("controls") && !window.location.hash.toLowerCase().includes("controls")) {
          if (!window.location.pathname.toLowerCase().includes("board") && !window.location.hash.toLowerCase().includes("board")) {
            if (!window.location.href.toLowerCase().includes("waiting")) {
              console.log("Changing to: " + newurl)
              window.location.href = newurl
            }
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
          event: 'UPDATE',
          schema: 'public',
        },
        (payload) => {
          console.log("Received Supabase update:", payload);
          const newurl = payload.new.currentURL;

          console.log("Supabase given url: " + newurl);
          console.log("User: ", user);
          console.log("Window location: ", window.location.href);
          console.log("Window pathname: ", window.location.pathname);
          console.log("Window hash: ", window.location.hash);

          if (newurl && newurl !== window.location.href && !user) {
            const pathname = window.location.pathname.toLowerCase();
            const hash = window.location.hash.toLowerCase();
            if (!pathname.includes("controls") && !hash.includes("controls")) {
              if (!pathname.includes("board") && !hash.includes("board")) {
                console.log("Changing to: " + newurl);
                window.location.href = newurl;
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
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/board" element={<Board />} />
        <Route path="/running" element={<Running />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/story/:name" element={<Story />} />
      </Routes>
    </>
  );
}

export default App;

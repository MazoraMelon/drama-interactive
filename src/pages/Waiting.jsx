import React from 'react'

export default function Waiting() {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#1f1f1f",
        }}>
            <h1 style={{
                color: "darkgrey",
                fontSize: "30px",
                margin: "0px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
            }}>Waiting for votes...<br /><br />What <span style={{ color: '#3676ff' }}>damage</span> are <span style={{ color: '#3676ff' }}>you</span> causing online?</h1>
        </div>
    )
}


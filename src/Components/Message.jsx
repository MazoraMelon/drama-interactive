import React from "react";

export default function Message(props) {
    let color = "darkgrey"
    let float = "start"
    if (props.owner === true) {
        color = "#218aff"
        float = "end"
    } else {
        color = "darkgrey"
        float = "start"
    }
    console.log(props.owner)
    return (
        <div className="Message" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "0px",
            color: "grey",
            padding: "5px",
            float: float,
            alignSelf: float,
        }}>
            <h3 style={{
                margin: "0px",
                fontSize: ".8rem",
                marginLeft: "5px",
            }}>{props.sender}</h3>

            <p style={{
                backgroundColor: color,
                color: "white",
                margin: "0px",
                fontSize: "1.2rem",
                width: "fit-content",
                height: "fit-content",
                padding: "5px",
                borderRadius: "20px",
            }}>
                {props.message}
            </p>
        </div>

    );
}
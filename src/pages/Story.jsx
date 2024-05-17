import { useParams } from "react-router-dom";

export default function Story() {
    const { name } = useParams();

    return (
        <div style={{
            padding: "40px",
            backgroundColor: "#1f1f1f",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        }}>
            <h1 style={{
                textAlign: "center",
                fontSize: "50px",
            }}>The story of {name}</h1>
        </div>
    );
}

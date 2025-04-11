import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState<string | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const socketInstance = new WebSocket("ws://localhost:8080");

    socketInstance.onopen = () => {
      console.log("✅ Connected to WebSocket server");
      setSocket(socketInstance);
    };

    socketInstance.onmessage = (message) => {
      console.log("📩 Received:", message.data);
      setLatestMessage(String(message.data)); 
    };

    socketInstance.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    socketInstance.onclose = () => {
      console.log("🔌 WebSocket connection closed");
    };

    return () => {
      socketInstance.close(); // cleanup on component unmount
    };
  }, []);

  const handleSend = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("📤 Sending:", text);
      socket.send(text);
      setText("");
    } else {
      console.warn("❗ Socket is not connected");
    }
  };

  if (!socket) {
    return <div>🔄 Connecting to the WebSocket server...</div>;
  }

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🧠 WebSocket Chat</h2>

      <div style={{ marginBottom: "10px" }}>
        <strong>Latest message:</strong>{" "}
        {latestMessage ?? <i>No messages yet</i>}
      </div>

      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={handleSend}
        style={{ padding: "8px 16px", marginLeft: "8px" }}
      >
        Send
      </button>
    </div>
  );
}

export default App;

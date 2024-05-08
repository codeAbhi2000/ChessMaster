import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onopen = () => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      setReceivedMessage(event.data);
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.onopen = () => {
      console.log('Connected to server');
      socket.send(message);
    };
  };

  return (
    <div>
      <h1>WebSocket Chat App</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <strong>Received message:</strong> {receivedMessage}
      </div>
    </div>
  );
}

export default App;

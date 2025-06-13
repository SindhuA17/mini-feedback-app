import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    await fetch("http://127.0.0.1:5000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    setName("");
    setMessage("");
    fetchFeedbacks(); // Refresh list
  };

  const fetchFeedbacks = async () => {
    const res = await fetch("http://127.0.0.1:5000/feedback");
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", margin: "5px", width: "300px" }}
        />
        <br />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            padding: "8px",
            margin: "5px",
            width: "300px",
            height: "100px",
          }}
        />
        <br />
        <button type="submit" style={{ padding: "8px 16px", margin: "5px" }}>
          Submit
        </button>
      </form>

      <hr />
      <h3>All Feedback</h3>
      <ul>
        {feedbacks.map((fb, idx) => (
          <li key={idx}>
            <strong>{fb.name}</strong>: {fb.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

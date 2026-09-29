import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! 👋 I'm your AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState("");

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;

    setMessages((previous) => [...previous, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: data.answer }
      ]);
      setConversationId(data.conversation_id);
    } catch (error) {
      console.error(error);
      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: "Sorry, I couldn't connect to the AI assistant." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") sendMessage();
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo"><span>✦</span> AI Assistant</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#chat">AI Assistant</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="badge">✨ AI Powered Assistant</div>
          <h1>Your Intelligent<br /><span>AI Companion</span></h1>
          <p>Ask questions, get instant answers and interact with an intelligent AI assistant through our modern platform.</p>
          <button className="hero-button" onClick={() => document.getElementById("chat").scrollIntoView({ behavior: "smooth" })}>
            Start Chatting →
          </button>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <div className="avatar">✦</div>
            <div><strong>AI Assistant</strong><small>Online</small></div>
          </div>
          <div className="preview-message">
            <span>AI</span><p>Hello! How can I assist you today?</p>
          </div>
          <div className="preview-input">Ask me anything...<button>→</button></div>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Powerful Features</h2>
        <p className="section-description">Everything you need for an intelligent AI experience.</p>
        <div className="feature-grid">
          <div className="feature-card"><div className="feature-icon">🤖</div><h3>AI Powered</h3><p>Intelligent responses powered by your conversational AI assistant.</p></div>
          <div className="feature-card"><div className="feature-icon">⚡</div><h3>Instant Responses</h3><p>Get quick answers to your questions through a simple chat interface.</p></div>
          <div className="feature-card"><div className="feature-icon">💬</div><h3>Natural Conversation</h3><p>Have natural conversations with an AI designed to understand your questions.</p></div>
          <div className="feature-card"><div className="feature-icon">🔒</div><h3>Secure Architecture</h3><p>API credentials are kept safely on the backend instead of being exposed to users.</p></div>
        </div>
      </section>

      <section className="chat-section" id="chat">
        <div className="chat-title">
          <div className="badge">💬 AI ASSISTANT</div>
          <h2>Talk to Your AI</h2>
          <p>Start a conversation and ask anything.</p>
        </div>

        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-profile">
              <div className="chat-avatar">✦</div>
              <div><strong>AI Assistant</strong><span><i></i> Online</span></div>
            </div>
          </div>

          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role === "user" ? "user-message" : "assistant-message"}`}>
                {message.role === "assistant" && <div className="small-avatar">✦</div>}
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message assistant-message">
                <div className="small-avatar">✦</div>
                <div className="message-bubble typing">Thinking...</div>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} disabled={loading}>{loading ? "..." : "↑"}</button>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div>
          <div className="badge">ABOUT THE PROJECT</div>
          <h2>Intelligent conversations,<br /><span>made simple.</span></h2>
          <p>This project provides a modern web interface for interacting with an AI conversational agent. The frontend communicates with a secure backend, which connects to the AI service.</p>
        </div>
      </section>

      <footer>
        <div>✦ AI Assistant</div>
        <p>AI-powered conversational platform</p>
      </footer>
    </div>
  );
}

export default App;

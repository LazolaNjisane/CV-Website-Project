require('dotenv').config();
// 1. Configuration (Top level, ready for use)
const chatSessionId = 'session_' + Math.random().toString(36).substring(2, 15);
const WEBHOOK_URL = process.env.WEBHOOK_URL_TEST;

// 2. Event Listeners (Setup phase: run as soon as page loads)
document.addEventListener("DOMContentLoaded", () => {
  const chatButton = document.getElementById('chatbot-toggle');
  const chatModal = document.getElementById('chat-modal');
  const closeChat = document.getElementById('close-chat');
  const sendBtn = document.getElementById('sendButton');

  if (chatButton && chatModal) {
    chatButton.addEventListener('click', () => chatModal.classList.add('active'));
    closeChat?.addEventListener('click', () => chatModal.classList.remove('active'));

    window.addEventListener('click', (e) => {
      if (e.target === chatModal) chatModal.classList.remove('active');
    });

    sendBtn?.addEventListener('click', sendMessage);
  }
});

// 3. Logic Functions
function sendMessage() {
  const input = document.getElementById("inputMessage");
  const messageText = input.value.trim();
  
  if (!messageText) return;

  appendMessage("You", messageText, "user-message");
  input.value = "";

  fetch(WEBHOOK_URL, {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText, sessionId: chatSessionId })
  })
    .then((res) => res.json())
    .then((data) => {
      // Read the 'reply' field returned from your Clean Output node
      appendMessage("Info Bot", data.reply, "assistant-message");
    })
    .catch((err) => {
      console.error(err);
      appendMessage("Info Bot", "Something went wrong.", "assistant-message");
    });
}

function appendMessage(sender, text, className) {
  const chatContainer = document.querySelector("#chat-messages");
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const timestamp = `${dateStr}, ${timeStr}`;

  const iconSrc = className === "user-message" 
    ? "/Users/lazolanjisane/Documents/Workspace/VS Code Projects/CV Website/Icons/User.png" 
    : "/Users/lazolanjisane/Documents/Workspace/VS Code Projects/CV Website/Icons/botmsgicon.png";

  const msg = document.createElement("div");
  msg.classList.add("message-bubble", className);

  msg.innerHTML = `
    <div class="message-content">
      <span class="sender-name">${sender}</span>
      <p class="message-text">${text}</p>
      <span class="timestamp">${timestamp}</span>
    </div>
    <img src="${iconSrc}" class="chat-icon">
  `;
  
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
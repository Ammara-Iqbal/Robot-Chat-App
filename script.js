const sendBtn = document.getElementById("send-button");
const inputField = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

window.onload = loadMessages;

sendBtn.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = inputField.value.trim();
  if (text === "") return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msg = { type: "sent", text, time };
  displayMessage(msg);
  saveMessage(msg);

  inputField.value = "";

  // Simulate chatbot response after a short delay
  setTimeout(() => {
    const reply = getBotReply(text);
    const botMsg = {
      type: "received",
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    displayMessage(botMsg);
    saveMessage(botMsg);
  }, 700);
}

function displayMessage({ type, text, time }) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerHTML = `${text}<div class="timestamp">${time}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(msg) {
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.push(msg);
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function loadMessages() {
  const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.forEach(displayMessage);
}

// Updated chatbot reply logic
function getBotReply(userText) {
  const lowerText = userText.toLowerCase();

  if (lowerText.includes("hello") || lowerText.includes("hi")) {
    return "Hey there! 👋 How can I help you today?";
  }

  if (lowerText.includes("how are you") || lowerText.includes("how's it going")) {
    return "I'm doing great! Just chilling in the browser 😎";
  }

  if (lowerText.includes("what is your name")) {
    return "I’m ChatBuddy, your virtual assistant! 🤖";
  }

  if (lowerText.includes("tell me the time plz")) {
    return `It's currently ${new Date().toLocaleTimeString()}`;
  }

  if (lowerText.includes("how's theweather today")) {
    return "I'm not connected to the internet, but I hope it's sunny where you are! ☀️";
  }

  if (lowerText.includes("ok good bye") || lowerText.includes("goodbye")) {
    return "Goodbye! Have a great day! 👋";
  }

  if (lowerText.includes("help me") || lowerText.includes("support")) {
    return "Sure! You can ask me about anything.";
  }

  return "Hmm... I didn’t quite get that. Try saying 'hello', 'time', or 'how are you'. 😊";
}

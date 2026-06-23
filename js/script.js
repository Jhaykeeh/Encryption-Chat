const hints = {
  caesar: "Shift letters using a number key.",
  vigenere: "Uses a repeating keyword.",
  railfence: "Zigzag encryption using rails.",
  playfair: "Uses 5x5 letter grid."
};

let currentCipher = "caesar";
let msgCount = 0;

const hintEl = document.getElementById("hint");
const chatArea = document.getElementById("chat-area");

hintEl.textContent = hints.caesar;

// Cipher selection
document.querySelectorAll(".cipher-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cipher-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentCipher = btn.dataset.cipher;
    hintEl.textContent = hints[currentCipher];
  });
});

// Caesar cipher only (simplified for structure)
function caesar(text, key) {
  key = parseInt(key) || 3;

  return text.toUpperCase().replace(/[A-Z]/g, c =>
    String.fromCharCode((c.charCodeAt(0) - 65 + key) % 26 + 65)
  );
}

function sendMessage() {
  const sender = document.getElementById("sender-input").value || "User A";
  const key = document.getElementById("key-input").value;
  const msg = document.getElementById("msg-input").value;

  if (!msg) return;

  const encrypted = caesar(msg, key);

  if (msgCount === 0) chatArea.innerHTML = "";

  const div = document.createElement("div");
  div.className = "msg-block";
  div.innerHTML = `
    <strong>${sender}</strong><br/>
    Plain: ${msg.toUpperCase()}<br/>
    Encrypted: ${encrypted}
  `;

  chatArea.appendChild(div);
  msgCount++;
}

function clearChat() {
  msgCount = 0;
  chatArea.innerHTML = `<div class="chat-empty">No messages yet</div>`;
}

// Events
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("clear-btn").addEventListener("click", clearChat);
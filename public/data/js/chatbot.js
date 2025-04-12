const API_KEY = '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';
async function sendMessage() {
  const inputField = document.getElementById('userInput');
  const userText = inputField.value.trim();
  if (!userText) return;
  inputField.value = "";
  const chatlog = document.getElementById('chatlog');
  chatlog.innerHTML += `<div><strong>You:</strong> ${userText}</div>`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant. Your name is Breakium AI." },
      //{ role: "system", content: "send no information, just your answer" },
      { role: "user", content: userText }
    ]
  });
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body
    });
    const data = await res.json();
    const botReply = data.choices[0].message.content;
    chatlog.innerHTML += `<div style="color:dodgerblue;"><strong>Bot:</strong> ${botReply}</div>`;
    chatlog.scrollTop = chatlog.scrollHeight;
  } catch (err) {
    console.error(err);
    chatlog.innerHTML += `<div style="color:dodgerblue;"><strong>Bot:</strong> Error fetching response.</div>`;
  }
}
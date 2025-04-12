// Make the chatbot draggable and save position
let chatbotContainer = document.getElementById("chatbot-container");

// Function to load the chatbot's position from localStorage
function loadPosition() {
  const savedPosition = JSON.parse(localStorage.getItem("chatbotPosition"));
  if (savedPosition) {
    chatbotContainer.style.left = savedPosition.left;
    chatbotContainer.style.top = savedPosition.top;
  }
}

// Function to save the chatbot's position to localStorage
function savePosition() {
  const position = {
    left: chatbotContainer.style.left,
    top: chatbotContainer.style.top,
  };
  localStorage.setItem("chatbotPosition", JSON.stringify(position));
}

// Draggable functionality
let isDragging = false;
let offsetX, offsetY;

// Mouse down event to start dragging
chatbotContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - chatbotContainer.getBoundingClientRect().left;
  offsetY = e.clientY - chatbotContainer.getBoundingClientRect().top;
  chatbotContainer.style.cursor = "move";
});

// Mouse move event to drag
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    chatbotContainer.style.left = `${x}px`;
    chatbotContainer.style.top = `${y}px`;
  }
});

// Mouse up event to stop dragging
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    savePosition(); // Save the position when the user stops dragging
    chatbotContainer.style.cursor = "grab";
  }
});

// Load the position when the page loads
window.onload = loadPosition;
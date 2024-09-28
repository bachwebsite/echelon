// Store the search term in the history
function saveToHistory(searchTerm) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // Avoid duplicate entries in history
    if (!history.includes(searchTerm)) {
        history.push(searchTerm);
    }
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Load the search history from localStorage and display it
function loadHistory() {
    const historyList = document.getElementById('search-history-list');
    historyList.innerHTML = ''; // Clear the previous list

    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.forEach((term) => {
        const listItem = document.createElement('li');
        listItem.textContent = term;
        listItem.onclick = () => {
            document.getElementById('uv-address').value = term;
            document.getElementById('uv-form').dispatchEvent(new Event('submit'));
        };
        historyList.appendChild(listItem);
    });
}

document.getElementById('search-history-button').addEventListener('click', function() {
    const historyContainer = document.getElementById('search-history-container');
    historyContainer.style.display = (historyContainer.style.display === 'none' || historyContainer.style.display === '') ? 'block' : 'none';
  });
  
  // Example for the clear history button
  document.getElementById('clear-history-btn').addEventListener('click', function() {
    const historyList = document.getElementById('search-history-list');
    historyList.innerHTML = ''; // Clear the history list
  });
  

// Save the search term when the form is submitted
document.getElementById('uv-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const urlInput = document.getElementById('uv-address').value;
    saveToHistory(urlInput); // Save the search term
    loadHistory(); // Reload the history display

    // Assuming you have a function to handle the iframe loading
    document.getElementById('fram').src = search(urlInput); // Example search function
});

// Load the history when the page is loaded
document.addEventListener('DOMContentLoaded', loadHistory);

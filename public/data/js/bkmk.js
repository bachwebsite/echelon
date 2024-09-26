document.addEventListener('DOMContentLoaded', function() {
    const addBookmarkButton = document.getElementById('addBookmarkButton');
    const bookmarkList = document.getElementById('bookmarkList');
    const iframe = document.getElementById('fram');
    const urlInput = document.getElementById('uv-address');
    
    // Function to get bookmarks from local storage
    function getBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarks')) || [];
    }

    // Function to save bookmarks to local storage
    function saveBookmarks(bookmarks) {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Function to update the bookmark list display
    function updateBookmarkList() {
        const bookmarks = getBookmarks();
        bookmarkList.innerHTML = '';
        bookmarks.forEach((bookmark, index) => {
            const bookmarkItem = document.createElement('p');
            bookmarkItem.textContent = bookmark;
            bookmarkItem.onclick = function() {
                iframe.src = bookmark;
                urlInput.value = bookmark;
            };
            // Add a remove button for each bookmark
            const removeBtn = document.createElement('span');
            removeBtn.textContent = ' [X]';
            removeBtn.style.color = 'red';
            removeBtn.style.cursor = 'pointer';
            removeBtn.onclick = function(e) {
                e.stopPropagation();
                bookmarks.splice(index, 1); // Remove the bookmark
                saveBookmarks(bookmarks);
                updateBookmarkList();
            };
            bookmarkItem.appendChild(removeBtn);
            bookmarkList.appendChild(bookmarkItem);
        });
    }

    // Add the current URL as a bookmark
    addBookmarkButton.addEventListener('click', function() {
        const currentUrl = urlInput.value;
        if (!currentUrl) return;

        let bookmarks = getBookmarks();
        if (!bookmarks.includes(currentUrl)) {
            bookmarks.push(currentUrl);
            saveBookmarks(bookmarks);
            updateBookmarkList();
        } else {
            alert('This URL is already bookmarked.');
        }
    });

    // Initial display of bookmarks
    updateBookmarkList();
});

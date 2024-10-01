function sortDivsAlphabetically() {
    const container = document.body; // You can change this to a specific container element if needed
    const divs = Array.from(container.getElementsByClassName("bubbly-div"));

    divs.sort((a, b) => {
        const textA = a.querySelector("a").innerText.toUpperCase();
        const textB = b.querySelector("a").innerText.toUpperCase();
        return textA.localeCompare(textB);
    });

    // Reorder the elements in the container
    divs.forEach(div => container.appendChild(div));
}
function filterDivs() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const divs = document.getElementsByClassName('bubbly-div');

    Array.from(divs).forEach(div => {
        const text = div.querySelector('a').innerText.toLowerCase();
        div.style.display = text.includes(searchInput) ? 'inline-block' : 'none';
    });
}

sortDivsAlphabetically();
const loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
loadingScreen.style.position = 'fixed';
loadingScreen.style.top = '0';
loadingScreen.style.left = '0';
loadingScreen.style.width = '100%';
loadingScreen.style.height = '100%';
loadingScreen.style.backgroundColor = '#000000'; // Change color as needed
loadingScreen.style.display = 'flex';
loadingScreen.style.justifyContent = 'center';
loadingScreen.style.alignItems = 'center';
loadingScreen.style.zIndex = '10000';
loadingScreen.innerHTML = '<div>Loading...</div>'; // Customize loading message or animation

document.body.appendChild(loadingScreen);

// Remove loading screen once the page is fully loaded
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(() => loadingScreen.remove(), 500); // Wait for the fade-out transition
  }
});

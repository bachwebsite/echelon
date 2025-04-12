const loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
loadingScreen.style.position = 'fixed';
loadingScreen.style.top = '0';
loadingScreen.style.left = '0';
loadingScreen.style.width = '100%';
loadingScreen.style.height = '100%';
// loadingScreen.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e) no-repeat center center fixed;';
loadingScreen.style.background = '#000000';
loadingScreen.style.display = 'flex';
loadingScreen.style.justifyContent = 'center';
loadingScreen.style.alignItems = 'center';
loadingScreen.style.zIndex = '10000';

loadingScreen.innerHTML = `
  <img src="/data/images/gifs/spinner.gif" alt="Loading..." style="max-width: 150px; max-height: 150px;">
`;

document.body.appendChild(loadingScreen);

window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 2s ease';
    setTimeout(() => loadingScreen.remove(), 500);
  }
});

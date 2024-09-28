function decode(url) {
    if(url === 'https://' + location.hostname + '/'){
      return '';
    }
  
    var pref = ['/service/'];
    let dpart = null;
  
    for (let prefix of pref) {
      const uvindex = url.indexOf(prefix);
      if (uvindex !== -1) {
        const epart = url.substring(uvindex + prefix.length);
        try { dpart = Ultraviolet.codec.xor.decode(epart); break; } catch (error) { console.error('Error decoding the URL part:', error); return null; }
      }
    }
    return dpart;
}
let cycleId;
function beginLoop() {
    const address = document.getElementById("uv-address");
    const iframe = document.getElementById("fram");
    cycleId = setInterval( () => { address.value = decode(iframe.contentWindow.location.href); } , 1000);
}
function endLoop() {
    clearInterval(cycleId);
}
document.getElementById("uv-address").addEventListener('blur', beginLoop);
document.getElementById("uv-address").addEventListener('focus', endLoop);
beginLoop();
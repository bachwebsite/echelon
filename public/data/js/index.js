"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

const input = document.querySelector("input");

const swConfig = {
  'uv': { file: '/uv/sw.js', config: __uv$config },
};

let swConfigSettings; // Define swConfigSettings globally

function registerSW() {
  if (localStorage.getItem("registerSW") === "true") {
    const proxySetting = localStorage.getItem('proxy') || 'uv';
    const { file: swFile, config } = swConfig[proxySetting];
    swConfigSettings = config; // Assign swConfigSettings here for global access

    navigator.serviceWorker.register(swFile, { scope: config.prefix })
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
  }
}

// crypts class definition
class crypts {
  static encode(str) {
    return encodeURIComponent(
      str
        .toString()
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }

  static decode(str) {
    if (str.charAt(str.length - 1) === "/") {
      str = str.slice(0, -1);
    }
    return decodeURIComponent(
      str
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }
}

function search(input) {
  input = input.trim();
  const searchTemplate = localStorage.getItem('engine') || 'https://google.com/search?q=%s';

  try {
    return new URL(input).toString();
  } catch (err) {
    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) {
        return url.toString();
      }
      throw new Error('Invalid hostname');
    } catch (err) {
      return searchTemplate.replace("%s", encodeURIComponent(input));
    }
  }
}

function launch(val) {
  if (!val) {
    console.error("Invalid URL input: value is undefined or empty.");
    return;
  }

  if ('serviceWorker' in navigator) {
    const proxySetting = localStorage.getItem('proxy') || 'uv';
    const { file: swFile, config } = swConfig[proxySetting];
    swConfigSettings = config; // Ensure swConfigSettings is set

    navigator.serviceWorker.register(swFile, { scope: config.prefix })
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        let url = val.trim();
        if (typeof ifUrl === 'function' && !ifUrl(url)) {
          url = search(url);
        } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
          url = "https://" + url;
        }

        const encodedUrl = config.prefix + crypts.encode(url);
        sessionStorage.setItem("encodedUrl", encodedUrl);
        const browseSetting = localStorage.getItem('browse');
        const browseUrls = {
          "go": "/",
          "norm": encodedUrl
        };
        const urlToNavigate = browseUrls["norm"];
        location.href = urlToNavigate;
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
  }
}

function ifUrl(val = "") {
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uv-form");

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!swConfigSettings) {
        console.error("Service worker configuration not found.");
        return;
      }

      const encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));
      sessionStorage.setItem("encodedUrl", encodedUrl);
      const browseSetting = localStorage.getItem('browse');
      const browseUrls = {
        "go": "/",
        "norm": encodedUrl
      };

      const urlToNavigate = browseUrls[browseSetting] || "/";
      location.href = urlToNavigate;
    });
  } else {
    console.error("Form element with ID 'uv-form' not found.");
  }

  registerSW();
});

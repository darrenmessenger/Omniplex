import { Message } from "./messaging";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.message === Message.LOADED) {
    console.log("Content script loaded", request.payload);
    const { url, elements } = request.payload;
    console.log(`Storing data for URL: ${url}`);
    
    // Store the data
    chrome.storage.local.set({ [url]: elements }, () => {
      console.log("Data stored in chrome.storage.local.");
      
      // Retrieve and log stored data for verification
      chrome.storage.local.get(url, (result) => {
        if (result[url]) {
          console.log("Stored items for URL:", result[url]);
        } else {
          console.error(`No data found for URL: ${url}`);
        }
      });
    });
  } else {
    console.error("Unknown message", request.message);
  }
});

// Monitor tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log("Tab updated:", tab.url);
    const urlParams = new URLSearchParams(new URL(tab.url).search);
    const reverse = urlParams.get('reverse');

    if (reverse === 'true') {
      console.log("Reverse parameter detected, executing reverse highlighting");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: reverseHighlighting
      }).then(() => {
        console.log("Reverse highlighting executed");
      }).catch((error) => {
        console.error("Error executing reverse highlighting:", error);
      });
    }
  }
});

function reverseHighlighting() {
  console.log("Executing reverse highlighting");
  const links = document.querySelectorAll("a");
  const buttons = document.querySelectorAll("button");

  links.forEach(link => {
    link.style.outline = "2px solid blue"; // Highlight links in blue
  });

  buttons.forEach(button => {
    button.style.outline = "2px solid orange"; // Highlight buttons in orange
  });
}

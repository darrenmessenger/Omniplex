import { Message } from "./messaging";

console.log("Content script loaded");

function getAllLinksAndButtons() {
  const links = document.querySelectorAll("a");
  const buttons = document.querySelectorAll("button");

  let elementsData: { tagName: string; href: string | null; type: string }[] = [];

  links.forEach(link => {
    elementsData.push({
      tagName: link.tagName,
      href: link.href,
      type: "link"
    });
    link.style.outline = "2px solid orange"; // Highlight links in orange
  });

  buttons.forEach(button => {
    elementsData.push({
      tagName: button.tagName,
      href: null,
      type: "button"
    });
    button.style.outline = "2px solid blue"; // Highlight buttons in blue
  });

  return elementsData;
}

function reverseHighlighting() {
  const links = document.querySelectorAll("a");
  const buttons = document.querySelectorAll("button");

  links.forEach(link => {
    link.style.outline = "2px solid blue"; // Highlight links in blue
  });

  buttons.forEach(button => {
    button.style.outline = "2px solid orange"; // Highlight buttons in orange
  });
}

// Check if URL contains reverse=true
const urlParams = new URLSearchParams(window.location.search);
const reverse = urlParams.get('reverse');

if (reverse === 'true') {
  reverseHighlighting();
}

(() => {
  const elementsData = getAllLinksAndButtons();
  console.log("Sending elements data to background script", elementsData);
  chrome.runtime.sendMessage({
    message: Message.LOADED,
    payload: {
      url: window.location.href,
      elements: elementsData
    }
  });
})();

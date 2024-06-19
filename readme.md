# Omniplex Learning Technical Test

## Getting Started

1. Clone this repository locally
2. You may need to install esbuild using `npm -g install esbuild`
3. Run `npm run build`

## Loading into Chrome

1. Open [chrome://extensions](chrome://extensions) in Google Chrome
2. Enable Debug Mode
3. Select **Load Unpacked**
4. Select the build directory from your cloned repository

## The Task

1. The extension should detect all links and buttons on page
2. It should pull the tag name and, if it's a link, the href attribute
3. These should be passed to the background script and stored in extension local storage against the URL they were captured from
   1. **Note:** Not local storage on the site
4. In the content script, using outlines or box shadows
   1. Highlight any buttons as blue
   2. Highlight any links as orange
5. In addition to this, the extension should monitor tab updates
   1. If the URL contains a search parameter of `reverse=true` it should reverse the highlighting (links should be blue and buttons should be orange)

## Documentation

You can use the [Google Chrome Manifest V3 documentation](https://developer.chrome.com/docs/extensions/reference/api) for assistance.

# Completed Task

## Implementation Details

1. **Content Script (`content-script.js`):**
   - Detects all links (`<a>`) and buttons (`<button>`) on the page.
   - Highlights links with an orange outline and buttons with a blue outline.
   - Collects tag names and href attributes (for links) and sends this data to the background script.
   - If the URL contains the search parameter `reverse=true`, the highlighting is reversed (links are highlighted in blue, and buttons in orange).

2. **Messaging (`messaging.ts`):**
   - Defines the `Message` enum used for communication between content and background scripts.

3. **Background Script (`background.js`):**
   - Listens for messages from the content script.
   - Stores captured elements data in Chrome local storage against the URL they were captured from.
   - Monitors tab updates to check for the `reverse=true` parameter and executes reverse highlighting if found.

### Testing and Validation

- Load the extension into Chrome following the instructions above. 
- Ensure that all links and buttons are correctly highlighted upon loading any webpage.
- Validate that data is correctly stored in Chrome local storage.
- Confirm that the `?reverse=true` parameter in the URL correctly reverses the highlighting of links and buttons.
- There are various logs included in the solution to ensure that it is working correctly. In a live environment these would be removed and only neccessary comments would remain. 

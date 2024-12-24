chrome.action.onClicked.addListener((tab) => {
    // Ensure the active tab is valid
    if (tab.id) {
      // Inject the timer bar script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["timer.js"]
      });
  
      // Inject the timer bar CSS
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["timer.css"]
      });
    } else {
      console.error("No active tab found.");
    }
  });
  
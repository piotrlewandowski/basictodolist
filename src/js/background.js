 function badge() {
 	chrome.browserAction.setBadgeText({text: '' + $("#list p").length + ''});
 	chrome.browserAction.setBadgeBackgroundColor({ color: "#2d2d2d" });
 }
 badge();


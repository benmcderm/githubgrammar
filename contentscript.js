var s = document.createElement('script');
s.src = chrome.extension.getURL('dropdown.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};

var sc = document.createElement('script');
sc.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(sc);
sc.onload = function() {
    sc.parentNode.removeChild(sc);
};

// Event listener
// document.addEventListener('RW759_connectExtension', function(e) {
//     // e.detail contains the transferred data (can be anything, ranging
//     // from JavaScript objects to strings).
//     // Do something, for example:
//     alert(e.detail);
// });

//
// var authCode = getAuthCode(window.location.href);
//
// // Extract the auth code from the original URL
//
// function getAuthCode(url){
//     var error = url.match(/[&\?]error=([^&]+)/);
//     if (error) {
//         throw 'Error getting authorization code: ' + error;
//     }
//     console.log(url.match(/[&\?]code=([\w\/\-]+)/));
// }
//
chrome.identity.launchWebAuthFlow(
  {'url':'https://github.com/login/oauth/authorize?client_id=323a30406f9496db9815','interactive':true},
  getAuthCode(url)
);

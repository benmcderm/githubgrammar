document.getElementById("auth-button").onclick = function auth(){

let CLIENT_ID = '323a30406f9496db9815'
let CLIENT_SECRET = '95b6971b4bab1bcb3048ad18824b2fdc92c56d8f'
let CALLBACK_URL = chrome.identity.getRedirectURL();
console.log(CALLBACK_URL);
let AUTH_URL = 'https://github.com/login/oauth/authorize/?client_id='+CLIENT_ID+'&redirect_uri='+CALLBACK_URL+'&scope=repo';

chrome.identity.launchWebAuthFlow(
  {
  url: AUTH_URL,
  interactive: true,
  },
  function(redirectURL) {
    console.log(redirectURL);
    let regex = /\?code=(.+)/;
    let authCode = redirectURL.match(regex)[1];
    console.log('regex token is', authCode);
    $.ajax({
      url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${authCode}`,
      type: 'POST',
      success: function (response) {
        let regexAuth = /access_token=(\w+|\d+)&/;
        let accessCode = response.match(regexAuth)[1];
        // console.log(accessCode);
        // localStorage.setItem('ggAccessCode', `${accessCode}`);
        // console.log(localStorage.getItem('ggAccessCode'));
        chrome.storage.sync.set({'ggAccessCode': `${accessCode}`}, function() {
          console.log('Settings saved');
        });
      }
    });
  });
}

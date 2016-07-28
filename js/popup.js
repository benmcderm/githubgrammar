document.getElementById('auth-button').onclick = function auth() {
  const CLIENT_ID = '323a30406f9496db9815';
  const CLIENT_SECRET = '95b6971b4bab1bcb3048ad18824b2fdc92c56d8f';
  const CALLBACK_URL = chrome.identity.getRedirectURL();
  const AUTH_URL = `https://github.com/login/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=repo`;

  chrome.identity.launchWebAuthFlow(
    {
      url: AUTH_URL,
      interactive: true,
    },
    (redirectURL) => {
      const regex = /\?code=(.+)/;
      const authCode = redirectURL.match(regex)[1];
      $.ajax({
        url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${authCode}`,
        type: 'POST',
        success(response) {
          const regexAuth = /access_token=(\w+|\d+)&/;
          const accessCode = response.match(regexAuth)[1];
          chrome.storage.sync.set({ ggAccessCode: `${accessCode}` }, () => {
          });
        },
      });
    });
};

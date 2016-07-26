setTimeout(function() {
    /* Example: Send data to your Chrome extension*/
    document.dispatchEvent(new CustomEvent('RW759_connectExtension', {

      var client_id = '323a30406f9496db9815';
      var redirectUri = chrome.identity.getRedirectURL("oauth2");
      var auth_url = "https://github.com/login/oauth/authorize" + '?client_id=' + client_id + '&redirect_uri=' + redirectUri;

      console.log(redirectUri);
    }));
}, 0);

let creds = {

clientId: '323a30406f9496db9815',
clientSecret: '95b6971b4bab1bcb3048ad18824b2fdc92c56d8f',
authUrl: 'https://github.com/login/oauth/authorize',
tokenUrl: 'https://github.com/login/oauth/access_token',

getCode: function() {
    var url = creds.authUrl+'?client_id='+creds.clientId;
    location.href = url;
},
processCode: function() {
    var code = location.search.slice(6);
    var url = creds.tokenUrl;
    $.post(creds.tokenUrl, {
        client_id : creds.clientId,
        client_secret : creds.clientSecret,
        code : code
    }, function(){
        console.log("POST request sent");
    })
        .success(function(data){
            console.log(data);
        })
        .error(function(data){
            console.error("POST request error");
        })
}
}

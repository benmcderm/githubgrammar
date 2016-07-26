'use strict'
console.log("HI");

var client_id = '323a30406f9496db9815';
var redirectUri = chrome.identity.getRedirectURL("oauth2");
var auth_url = "https://github.com/login/oauth/authorize" + '?client_id=' + client_id + '&redirect_uri=' + redirectUri;


chrome.identity.launchWebAuthFlow({'url':auth_url,'interactive':true}, function(redirect_url){
    console.log(redirect_url)
});

function getUrl(){
  let str = window.location.href;
  let re = /github.com(\/[^\/]+\/[^\/]+)[\/]?/;
  let found = str.match(re);

  return found[1];
};

function getIssuesUrl(){
  return `${getUrl()}/issues`
};

function getSelectionText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
		getUser();
};

function getUser() {
  let xhr = new XMLHttpRequest();
  // xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.response);
      } else if (xhr.status === 400) {
        console.log("There was a 400 error.");
      } else {
        console.log("Something other than a 400 went wrong.");
      }
    }
  };

  xhr.open("GET", "https://github.com/login/oauth/authorize&client_id=323a30406f9496db9815", true);
  // xhr.setRequestHeader('Authorization', 'Basic ' + '74d93b944a289c48d44d8bb38f426b3cb7a239fc');
  // xhr.onload = requestComplete;
  xhr.send();
}

function sendIssue(text) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else if (xhr.status === 400) {
        console.log("There was a 400 error.");
      } else {
        console.log("Something other than a 400 went wrong.");
      }
    }
  };

  xhr.open("POST", `${getIssuesUrl()}`, true);
  xhr.send(JSON.stringify({issue:{title: "Spelling Error", description:`${text}`}, username: "benmcderm"}));
}

//
// document.onmousedown = getUrl;
// document.onmouseup = getSelectionText;




//
// (function (namespace) {
//   'use strict';
//
//   namespace.GitHub = {
//     getMe: function(token) {
//       var uri = '/user';
//       var method = 'GET';
//
//       return this._request(method, uri, token, false);
//     },
//     getMyIssues: function(token) {
//       var uri = '/user/issues';
//       var method = 'GET';
//
//       return this._request(method, uri, token, false);
//     },
//     _request: function(method, uri, token, data) {
//       return new Promise(function (resolve, reject) {
//         var request = new XMLHttpRequest();
//
//         if (uri === '') {
//           reject('Hey, you need a URI!');
//         }
//
//         var api_base = 'https://api.github.com';
//         var path = api_base + uri;
//
//         request.open(method, path, true);
//         request.setRequestHeader('Accept','application/vnd.github.v3.raw+json');
//         request.setRequestHeader('Content-Type','application/json;charset=UTF-8');
//         request.setRequestHeader('Authorization', 'token ' + token);
//
//         request.onreadystatechange = function stateChange() {
//           if (request.readyState === 4) {
//             if (request.status >= 200 && request.status < 300 || request.status === 304) {
//               resolve(JSON.parse(request.responseText));
//             } else {
//               reject(request.status);
//             }
//           }
//         };
//
//         if (data) {
//           request.send(JSON.stringify(data));
//         }
//         else {
//           request.send();
//         }
//       });
//     }
//   };
//
// })(window);



// document.onmouseup = GitHub.getMe('73806752a4b4470be1427b1699bc75a610c61a35')

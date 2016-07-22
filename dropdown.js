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

  xhr.open("GET", `https://github.com/login/oauth/authorize?client_id=323a30406f9496db9815&scope=users`, true);
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


document.onmousedown = getUrl;
document.onmouseup = getSelectionText;

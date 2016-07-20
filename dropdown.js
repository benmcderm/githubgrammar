function getSelectionText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    console.log(text);
		sendIssue();
};

function commentPayload(){
	return `${getUrl()}/issues`
};

function getUrl(){
	let str = window.location.href;
	let re = /github.com(\/[^\/]+\/[^\/]+)[\/]?/;
	let found = str.match(re);

	return found[1];
};

// function getComment() {
// 	let commentHead = getSelectionText();
// 	let comment = input
// 	return comment;
// };

document.onmousedown = getUrl;
document.onmouseup = getSelectionText;

function sendIssue() {
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

	xhr.open("POST", `${commentPayload()}`, true);
	xhr.send();
}

// document.onmouseup = getComment;

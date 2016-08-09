function getUrl() {
  const str = window.location.href;
  const re = /github.com(\/[^\/]+\/[^\/]+)[\/]?/;
  const found = str.match(re);

  return found[1];
}

function getSelectionText() {
  const selectedText = window.getSelection().toString();
  return selectedText;
}

function getTextCoordinates() {
  let x = 0;
  let y = 0;
  const range = window.getSelection().getRangeAt(0).cloneRange();
  const rect = range.getClientRects()[0];
  x = Math.round(rect.left);
  const scrollHeight = $(document).scrollTop();
  y = Math.round(rect.top) + scrollHeight - 55;

  return [x, y];
}

function toggleButton() {
  const currentUrl = getUrl();
  const selectedText = getSelectionText();
  let userCode;
  window.getSelection().removeAllRanges();
  chrome.storage.sync.get('ggAccessCode', items => {
    userCode = items.ggAccessCode;

    $.ajax({
      url: `https://api.github.com/repos${currentUrl}/issues`,
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: `token ${userCode}`,
      },
      data: JSON.stringify({
        title: 'Spelling or Grammar Error Reported',
        body: `${selectedText}`,
      }),
      success() {
        $('.github-grammar').remove();
        window.getSelection().removeAllRanges();
      },
    });
  });
}

function createButton(buttonText) {
  const x = getTextCoordinates()[0];
  const y = getTextCoordinates()[1];
  $('body').append(`<button class='github-grammar'>${buttonText}</button>`).show('slow');

  $('.github-grammar').css({ left: `${x}px`, top: `${y}px`,
  display: 'inline-block', background: '#282C34', border: '2px solid black',
  'border-radius': '15px', opacity: '.9', position: 'absolute', 'z-index': '500',
  height: '50px', width: '200px', color: 'white' });

  $('.github-grammar').focus(() => {
    $('.github-grammar').css({ outline: 'none' });
    $('.github-grammar').click(toggleButton());
  });
}

function renderButton() {
  if (getSelectionText().length < 1 || $('.github-grammar').length > 1) {
    $('.github-grammar').remove();
  } else {
    createButton('Submit an Issue');
  }
}

// document.onmousedown = renderButton;
document.onmouseup = renderButton;

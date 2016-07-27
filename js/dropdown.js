function getUrl(){
  let str = window.location.href;
  let re = /github.com(\/[^\/]+\/[^\/]+)[\/]?/;
  let found = str.match(re);

  return found[1];
};

function getSelectionText() {
  selectedText = window.getSelection().toString();
  currentUrl = getUrl();
  console.log(currentUrl);
  let x = 0;
  let y = 0;
  range = window.getSelection().getRangeAt(0).cloneRange();
  rect = range.getClientRects()[0];
  x = Math.round(rect.left);
  y = Math.round(rect.top);
  scroll = $(document).scrollTop()

  if (selectedText.length < 1) {
    $('.github-grammar').remove()
  } else {
    $('body').append('<button class="github-grammar">Submit as Issue</button>');

    $('.github-grammar').css({"left":`${x}px`, "top":`${y + scroll - 55}px`,
    "display":"inline-block", "background":"#282C34", "border":"2px solid black",
    "border-radius":"15px", "opacity":".9", "position": "absolute", "z-index":"500",
    "height":"50px", "width":"200px", "color":"white"});

    $('.github-grammar').focus(function () {
    $('.github-grammar').css({"outline": "none"})
    });

    $('.github-grammar').mousedown(function(e){
    let userCode;
    chrome.storage.sync.get('ggAccessCode', items => {
      userCode = items['ggAccessCode'];

      $.ajax({
        url: `https://api.github.com/repos${currentUrl}/issues`,
        type: 'POST',
        dataType: 'json',
        headers: {
          Authorization: `token ${userCode}`
        },
        data: JSON.stringify({
          "title": "Spelling or Grammar Error Reported",
          "body": `${selectedText}`
        }),
        success: function (response) {
          console.log(response);
          $('.github-grammar').remove();
          window.getSelection().removeAllRanges();
        }
      });
    });
   })
  }
}

document.onmouseup = getSelectionText;

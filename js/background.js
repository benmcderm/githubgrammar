// function updateUser() {
//   chrome.storage.local.get('githubToken', function(data) {
//     if(data && data.githubToken) {
//
//       GitHub.getMe(data.githubToken).then(function (me) {
//         chrome.storage.local.set({
//           user: me
//         });
//       });
//     }
//   });
// }
//
// setInterval(updateUser, 60 * 60 * 1000);
// updateUser();

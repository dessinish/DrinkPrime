<script type="module">
import {WfuUserInfo,WfuUser} from 'https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@4.7/src/modules/webflow-membership.js';
import {WfuDataBinder} from 'https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@4.7/src/modules/webflow-databind.min.js';
$(function () {
  var membership = new WfuUserInfo({
    userInfoUpdatedCallback: myCallback
  }).init();
});
async function myCallback(user) {
  var dataBinder = new WfuDataBinder({
    user: user
  }).bind();
  var userName = user.name;
  var userEmail = user.email;
  function trimEmail(email) {
    var atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
    return email;
  }
  var emailRedirect = trimEmail(userEmail);
  const correctedEmail = emailRedirect.replace(/[^A-Za-z0-9]/g, "-");
  var logButton = $("#log-btn");
  var btnText = logButton.html();
  if (btnText === "Log out") {
    $("#log-btn").click(function () {
      sessionStorage.clear();
    });
  }
  if (btnText === "Log out") {
    function restrictAccess() {
      var allowedPageURLs = [
        `/dashboard/${correctedEmail}`,
        '/log-in',
        '/sign-up',
        '/terms-of-use',
        '/privacy-policy',
        'thank-you',
        '/self-checkout',
        '/drinkprime.webflow.io',
        '/checkout',
        '/dashboard'
      ];
      var currentURL = window.location.pathname;
      var isAllowed = allowedPageURLs.some(function (allowedURL) {
        return currentURL === allowedURL;
      });
      if (!isAllowed) {
        window.location.href = '/404';
      }
    }
    restrictAccess();
  }
}
</script>
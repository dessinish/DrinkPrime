window.addEventListener('load', function() {
  var logButton = $("#log-btn");
  var btnText = logButton.html();
  if(btnText=== "Log out"){
    $("#log-btn").click(function () {
      sessionStorage.clear();
    });
  }
  const trimmedEmail=sessionStorage.getItem("trimmedEmail");
  const replacedEmail = trimmedEmail.replace(/[^A-Za-z0-9]/g, "-");
  if(btnText === "Log out"){
    function restrictAccess() {
      var allowedPageURLs = [
        `/dashboard/${replacedEmail}`,
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
      var isAllowed = allowedPageURLs.some(function(allowedURL) {
        return currentURL === allowedURL;
      });
      if (!isAllowed) {
        window.location.href = '/404';
      }
    }
    restrictAccess();
  }
});
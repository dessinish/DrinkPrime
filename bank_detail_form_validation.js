  $(document).ready(function() {
    let accTag = $("#account-no");
    let accError = $("#account-no-error");
    let ifscTag = $("#IFSC");
    let ifscError = $("#ifsc-error");
    let upiTag = $("#upi-id");
    let upiError = $("#upi-id-error");
    let isValid;
    // Get references to the radio buttons and wrap elements
    const accountRadio = document.getElementById('Account');
    const upiRadio = document.getElementById('UPI');
    const accountWrap = document.getElementById('account-wrap');
    const ifscWrap = document.getElementById('ifsc-wrap');
    const upiIdWrap = document.getElementById('upi-id-wrap');
    // Function to handle radio button change event
    function handleRadioChange() {
      if (accountRadio.checked) {
        // Show account-related wraps, hide UPI-related wrap
        accountWrap.style.display = 'flex';
        ifscWrap.style.display = 'flex';
        upiIdWrap.style.display = 'none';
      } else if (upiRadio.checked) {
        // Show UPI-related wrap, hide account-related wraps
        accountWrap.style.display = 'none';
        ifscWrap.style.display = 'none';
        upiIdWrap.style.display = 'flex';
      }
    }
    // Add event listeners to the radio buttons
    accountRadio.addEventListener('change', handleRadioChange);
    upiRadio.addEventListener('change', handleRadioChange);
    // On page load, select the 'Account' radio button and show the account-related wraps
    accountRadio.checked = true;
    handleRadioChange();
    //Detail Form Validations
    $("#detail-submit-btn").click(function (event) {
      event.preventDefault();
      isValid = true;
      if (accountRadio.checked) {
        // Validation for account-related inputs
        let accCheck = /^\d{9,18}$/;
        if (
          accTag.val() === "" ||
          accTag.val() === undefined ||
          !accTag.val().match(accCheck)
        ) {
          accTag.css("border-color", "red");
          accError.html("Please check your account number and try again.");
          isValid = false;
        }
        let ifscCheck = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (
          ifscTag.val() === "" ||
          ifscTag.val() === undefined ||
          !ifscTag.val().match(ifscCheck)
        ) {
          ifscTag.css("border-color", "red");
          ifscError.html("Please check your IFSC number and try again.");
          isValid = false;
        }
        accTag.keyup(function (e) {
          let accCheck = /^\d{9,18}$/;
          if (accTag.val().match(accCheck)) {
            accTag.css("border-color", "#e7ebf8");
            accError.html("");
            isValid = true;
            return true;
          } else {
            accTag.css("border-color", "red");
            accError.html("Please check your account number and try again.");
            isValid= false;
            return false;
          }
        });
        ifscTag.keyup(function (e) {
          let ifscCheck = /^[A-Z]{4}0[A-Z0-9]{6}$/;
          if (ifscTag.val().match(ifscCheck)) {
            ifscTag.css("border-color", "#e7ebf8");
            ifscError.html("");
            isValid = true;
            return true;
          } else {
            ifscTag.css("border-color", "red");
            $("#ifsc-error").html("Please check your IFSC number and try again.");
            isValid= false;
            return false;
          }
        });
        if (isValid) {
          // Submit the form
          $("#wf-form-detail-form").submit();
        }
      } else if (upiRadio.checked) {
        // Validation for UPI-related input
        let upiCheck = /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/;
        if (
          upiTag.val() === "" ||
          upiTag.val() === undefined ||
          !upiTag.val().match(upiCheck)
        ) {
          upiTag.css("border-color", "red");
          upiError.html("Please check your UPI id and try again.");
          isValid = false;
        }
        upiTag.keyup(function (e) {
          let upiCheck = /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/;
          if (upiTag.val().match(upiCheck)) {
            upiTag.css("border-color", "#e7ebf8");
            upiError.html("");
            isValid = true;
            return true;
          } else {
            upiTag.css("border-color", "red");
            $("#upi-id-error").html("Please check your UPI id and try again.");
            isValid= false;
            return false;
          }
        });
        if (isValid) {
          // Submit the form
          $("#wf-form-detail-form").submit();
        }
      }
    });
  });
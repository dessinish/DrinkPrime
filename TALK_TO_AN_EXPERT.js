document.addEventListener("DOMContentLoaded", function () {
  const urlString = window.location.href;
  const urlParams = new URLSearchParams(urlString);
  const sourceCampaign = urlParams.get("utm_campaign");
  const sourceMedium = urlParams.get("utm_medium");
  const searchKeyword = urlParams.get("utm_searchkeyword");
  console.log(sourceCampaign,sourceMedium,searchKeyword);
  var submitButton = document.getElementById("submit-ttae");
  var cityChoice = document.getElementById("cityField-ads");
  var cityError = document.getElementById("city-ttae-error");
  var otherName = document.getElementById("othersField-ads");
  var othersError = document.getElementById("others-ttae-error");
  var othersValue = undefined;
  var othersCheck = /^[a-zA-Z\s]*$/;
  cityChoice.addEventListener("change", function () {
    console.log(cityChoice.value);
    if (cityChoice.value === "Others") {
      document.getElementById("othersField-ads").style.display = "block";
      othersValue = otherName.value;
    } else {
      document.getElementById("othersField-ads").style.display = "none";
    }
  });
  document.getElementById("othersField-ads").addEventListener("change", function () {
    othersValue = otherName.value;});
  document.getElementById("submit-ttae").addEventListener("click", async function () {
    var namePop = document.getElementById("name-ttae");
    var nameError = document.getElementById("name-ttae-error");
    var phonePop = document.getElementById("phone-ttae");
    var phoneError = document.getElementById("phone-ttae-error");
    var referralCode = document.getElementById("referral-ttae");
    var isValid =true;
    if (cityChoice.value === "") {
      cityChoice.style.borderColor = "red";
      cityError.innerHTML = "Please choose your city.";
      isValid= false;
    } else {
      cityChoice.style.borderColor = "";
      cityError.innerHTML = "";
    }
    if (othersValue !== undefined) {
      if (othersValue === "" || !othersValue.match(othersCheck)) {
        otherName.style.borderColor = "red";
        othersError.innerHTML = "Please specify your city.";
      } else {
        otherName.style.borderColor = "";
        othersError.innerHTML = "";
      }
    }
    var citySelect = cityChoice.selectedIndex;
    if (citySelect === 0) {
      cityChoice.style.borderColor = "red";
      cityError.innerHTML = "Please choose your city.";
    } else if (cityChoice.value === "Others" && citySelect !== 0) {
      cityChoice.style.borderColor = "";
      cityError.innerHTML = "";
    } else {
      cityError.innerHTML = "";
      cityChoice.style.borderColor = "";
    }
    var nameCheck = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
    if (
      namePop.value === "" ||
      namePop.value === undefined ||
      !namePop.value.match(nameCheck)
    ) {
      namePop.style.borderColor = "red";
      nameError.innerHTML = "Name can't be empty.";
      isValid= false;
    } else {
      namePop.style.borderColor = "";
      nameError.innerHTML = "";
    }
    var phoneNoCheck = /^[0-9]{10}$/;
    if (
      phonePop.value === "" ||
      phonePop.value === undefined ||
      !phonePop.value.match(phoneNoCheck)
    ) {
      phonePop.style.borderColor = "red";
      phoneError.innerHTML = "Please provide a valid phone number.";
      isValid= false;
    } else {
      phonePop.style.borderColor = "";
      phoneError.innerHTML = "";
    }

    otherName.addEventListener("keyup", function () {
      if (otherName.value.match(othersCheck)) {
        otherName.style.borderColor = "#e7ebf8";
        othersError.innerHTML = "";
        return true;
      } else {
        otherName.style.borderColor = "red";
        othersError.innerHTML = "Please specify your city.";
        return false;
        isValid= false;
      }
    });
    phonePop.addEventListener("keyup", function () {
      if (phonePop.value.match(phoneNoCheck)) {
        phonePop.style.borderColor = "#e7ebf8";
        phoneError.innerHTML = "";
        return true;
      } else {
        phonePop.style.borderColor = "red";
        phoneError.innerHTML = "Please provide a valid phone number.";
        return false;
        isValid= false;
      }
    });
    namePop.addEventListener("keyup", function () {
      if (namePop.value.match(nameCheck)) {
        namePop.style.borderColor = "#e7ebf8";
        nameError.innerHTML = "";
        return true;
      } else {
        namePop.style.borderColor = "red";
        nameError.innerHTML = "Name can't be empty.";
        return false;
        isValid= false;
      }
    });
    var bodyforpopup = {
      "firstName": namePop.value,
      "cityName": cityChoice.value,
      "phoneNumber": phonePop.value,
      "apiSource": "Webflow Ads",
      "referralCode": referralCode.value,
      "landingURL": "https://wf.drinkprime.in/ads",
      "sourceCampaign": sourceCampaign,
      "leadSource": "Webflow website",
      "searchKeyword": searchKeyword,
      "sourceMedium": sourceMedium,
    };
    console.log("isValid",isValid);
    if (isValid) {
      
      const url = 'https://drinkprime.in/thankyou';
      setTimeout(function() {
        // Replace 'newPageURL' with the actual URL you want to redirect to
        window.location.href = url;
      }, 5000);
      const response = await fetch("https://api.drinkprime.in/website/leadSquared", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(bodyforpopup), // body data type must match "Content-Type" header
      });
      const data= await response.json();
      console.log(data);
      if(data.success){
        console.log("The lead has been created.");
      }else{
        console.log("The lead couldn't be created.");
      }
    };
  });
});
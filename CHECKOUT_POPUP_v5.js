document.addEventListener("DOMContentLoaded", function () {
const urlString = window.location.href;
const urlParams = new URLSearchParams(urlString);
const sourceCampaign = urlParams.get("utm_campaign");
const sourceMedium = urlParams.get("utm_medium");
const searchKeyword = urlParams.get("utm_searchkeyword");
var submitButton = document.getElementById("submit-checkout");
var cityChoice = document.getElementById("cityField-checkout");
var cityError = document.getElementById("city-checkout-error");
var otherName = document.getElementById("othersField-checkout");
var othersError = document.getElementById("others-checkout-error");
var othersValue = undefined;
let plan, duration; 
var othersCheck = /^[a-zA-Z\s]*$/;
cityChoice.addEventListener("change", function () {
if (cityChoice.value === "Others") {
document.getElementById("othersField-checkout").style.display = "block";
othersValue = otherName.value;
} else {
document.getElementById("othersField-checkout").style.display = "none";
}
});
document.getElementById("othersField-checkout").addEventListener("change", function () {
othersValue = otherName.value;});
document.getElementById("submit-checkout").addEventListener("click", async function () {
var namePop = document.getElementById("name-checkout");
var nameError = document.getElementById("name-checkout-error");
var phonePop = document.getElementById("phone-checkout");
var phoneError = document.getElementById("phone-checkout-error");
var referralCode = document.getElementById("referral-checkout");
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
    const radioButtons = document.querySelectorAll('input[name="RadioPlan"]');
    const radioButtonsMob = document.querySelectorAll('input[name="RadioPlanMob"]');
    let plan = '';
    let duration = '';
    
    function updatePlanAndDuration(event) {
      const radioButton = event.target;
      const selectedPlan = radioButton.getAttribute('planType');
      const selectedDuration = radioButton.getAttribute('planDuration');
      plan = selectedPlan;
      duration = selectedDuration;
      console.log(plan, duration);
    }
    
    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener('change', updatePlanAndDuration);
    });
    
    radioButtonsMob.forEach((radioButton) => {
      radioButton.addEventListener('change', updatePlanAndDuration);
    });
    
const nameParam = namePop.value;
const phoneParam = phonePop.value;
const cityParam = cityChoice.value;
const coupon = referralCode.value;
const url = `https://drinkprime.in/lpcheckout?plan=${encodeURIComponent(plan)}&duration=${encodeURIComponent(duration)}&name=${encodeURIComponent(nameParam)}&phone=${encodeURIComponent(phoneParam)}&city=${encodeURIComponent(cityParam)}&coupon=${encodeURIComponent(coupon)}`;
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
if(data.success){
console.log("The lead has been created.");
}else{
console.log("The lead couldn't be created.");
}
};
});
});
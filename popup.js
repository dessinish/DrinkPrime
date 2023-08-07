<script>
document.addEventListener("DOMContentLoaded", function () {
var submitButton = document.getElementById("submit-racb");
var cityChoice = document.getElementById("city-racb");
var cityError = document.getElementById("city-racb-error");
var otherName = document.getElementById("city-other-racb");
var othersError = document.getElementById("city-other-error");
var othersValue = undefined;
var othersCheck = /^[a-zA-Z\s]*$/;

cityChoice.addEventListener("change", function () {
console.log(cityChoice.value);
if (cityChoice.value === "Others") {
  document.getElementById("other-racb-container").style.display = "flex";
  othersValue = otherName.value;
} else {
  document.getElementById("other-racb-container").style.display = "none";
}
});

document.getElementById("city-other-racb").addEventListener("change", function () {
othersValue = otherName.value;
});

document.getElementById("submit-racb").addEventListener("click", function () {

var namePop = document.getElementById("name-racb");
var nameError = document.getElementById("name-racb-error");
var phonePop = document.getElementById("phone-racb");
var phoneError = document.getElementById("phone-racb-error");
var referralCode = document.getElementById("referralCode");
var isValid= true;

if (cityChoice.value === "") {
  cityChoice.style.borderColor = "red";
  cityError.innerHTML = "Please choose your city.";
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
"apiSource": "postman",
"referralCode": "testnewFlow",
"landingURL": "https://testing_new",
"sourceCampaign": "sourceCampaign",
"leadSource": "leadSource22342",
"searchKeyword": "searchKeyword",
"sourceMedium": "sourceMedium",

};

  if (isValid) {

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
      window.alert("The lead couldn't be created.");
    }

  };
});
});
</script>

let cityChoice = $("#city-racb");
let cityError = $("#city-racb-error");
let otherName = $("#city-other-racb");
let othersError = $("#city-other-error");
let othersValue = undefined;
let othersCheck = /^[a-zA-Z\s]*$/;

$("#city-racb").on("change", function () {
  if (cityChoice.val() === "others") {
    console.log(cityChoice.val());
    $("#other-racb-container").css("display", "flex");
    othersValue= otherName.val();
  } else {
    $("#other-racb-container").css("display", "none");
  }
});
$("#city-other-racb").on("change", function (e) {
  othersValue= otherName.val();
});
window.addEventListener('load', function() {
  $("#submit-racb").click(function () {
    let namePop = $("#name-racb");
    let nameError = $("#name-racb-error");
    let phonePop = $("#phone-racb");
    let phoneError = $("#phone-racb-error");
    var isValid=true;

    if (cityChoice.val() === "") {
      cityChoice.css("border-color", "red");
      cityError.html("Please choose your city.");
      isValid=false;
    }else{
      cityChoice.css("border-color", "");
      cityError.html("");
    }
    if(othersValue !== undefined){
      if(othersValue === "" || !othersValue.match(othersCheck)){
        otherName.css("border-color", "red");
        othersError.html("Please specify your city.");
        isValid=false;
      } else {
        othersError.html("");
        otherName.css("border-color", "");
      }
    }
    $("#city-racb").on("change", function (e) {
      let citySelect = $("#city-racb option:selected").index();
      if (citySelect === 0) {
        cityChoice.css("border-color", "red");
        cityError.html("Please choose your city.");
        isValid=false;
        return false;
      } else if (cityChoice.val() === "others" && citySelect !== 0) {
        cityChoice.css("border-color", "");
        cityError.html("");

        return true;
      }else{
        cityError.html("");
        cityChoice.css("border-color", "");
      }
    });
    let nameCheck = /[a-zA-Z]+([\s][a-zA-Z]+)*/;
    if (
      namePop.val() === "" ||
      namePop.val() === undefined ||
      !namePop.val().match(nameCheck)
    ) {
      namePop.css("border-color", "red");
      nameError.html("Name can't be empty.");
      isValid=false;
    }
    let phoneNoCheck = /^[0-9]{10}$/;
    if (
      phonePop.val() === "" ||
      phonePop.val() === undefined ||
      !phonePop.val().match(phoneNoCheck)
    ) {
      phonePop.css("border-color", "red");
      phoneError.html("Please provide a valid phone number.");
      isValid=false;
    }
    otherName.keyup(function (e) {
      let othersCheck = /^[a-zA-Z\s]*$/;
      if (otherName.val().match(othersCheck)) {
        otherName.css("border-color", "#e7ebf8");
        othersError.html("");
        return true;
      } else {
        otherName.css("border-color", "red");
        othersError.html("Please specify your city.");
        isValid=false;
        return false;
      }
    });
    phonePop.keyup(function (e) {
      let phoneNoCheck = /^[0-9]{10}$/;
      if (phonePop.val().match(phoneNoCheck)) {
        phonePop.css("border-color", "#e7ebf8");
        phoneError.html("");
        return true;
      } else {
        phonePop.css("border-color", "red");
        phoneError.html("Please provide a valid phone number.");
        isValid=false;
        return false;
      }
    });
    namePop.keyup(function (e) {
      let nameCheck = /[a-zA-Z]+([\s][a-zA-Z]+)*/;
      if (namePop.val().match(nameCheck)) {
        namePop.css("border-color", "#e7ebf8");
        nameError.html("");
        return true;
      } else {
        namePop.css("border-color", "red");
        nameError.html("Name can't be empty.");
        isValid=false;
        return false;
      }
    }); 
    if (isValid) {
      var form = document.getElementById("wf-form-Request-a-call-back");
      form.submit();  
    } 
  });
});

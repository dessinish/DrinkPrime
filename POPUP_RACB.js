  $(document).ready(function () {
    $("#submit-racb").click(function () {

      let namePop = $("#name-racb");
      let phonePop = $("#phone-racb");
      let cityChoice = $("#city-racb");
      let otherName = $("#city-name-racb");

      if (cityChoice.val() === "") {
        cityChoice.css("border-color", "red");
        $("#city-racb-error").html("Please choose your city.");
      }else{
        cityChoice.css("border-color", "");
        $("#city-racb-error").html("");
      }

      cityChoice.on("change", function () {
        if (cityChoice.val() === "Others") {
          $("#other-name-racb").css("display", "flex");
        } else {
          $("#other-name-racb").css("display", "none");
        }
      });

      $("#city-racb").on("change", function (e) {
        let cityPop = $("#city-racb option:selected").index();
        if (cityPop === 0) {
          cityChoice.css("border-color", "red");
          $("#city-racb-error").html("Please choose your city.");
          return false;
        } else if (cityChoice.val() === "Others" && cityPop !== 0) {
          cityChoice.css("border-color", "");
          $("#city-racb-error").html("");
          return true;
        }else{
          $("#city-racb-error").html("");
          cityChoice.css("border-color", "");
        }
      });

      if (cityChoice.val() === "Others") {
        let otherName_Check = /^[a-zA-Z\s]*$/;

        if (
          otherName.val() === "" ||
          otherName.val() === undefined ||
          !otherName.val().match(otherName_Check)
        ) {
          otherName.css("border-color", "red");
          $("#city-name-error").html("Please specify your city.");
          return false;
        } else {
          $("#city-name-error").html("");
          return true;
        }
      }

      let namePop_Check = /[a-zA-Z]+([\s][a-zA-Z]+)*/;
      if (
        namePop.val() === "" ||
        namePop.val() === undefined ||
        !namePop.val().match(namePop_Check)
      ) {
        namePop.css("border-color", "red");
        $("#name-racb-error").html("Name can't be empty.");
      }

      let phonePop_Check = /^\+?\d{7,15}$/;
      if (
        phonePop.val() === "" ||
        phonePop.val() === undefined ||
        !phonePop.val().match(phonePop_Check)
      ) {
        phonePop.css("border-color", "red");
        $("#phone-racb-error").html("Please provide a valid phone number.");
      }


      namePop.keyup(function (e) {
        let namePop_Check = /[a-zA-Z]+([\s][a-zA-Z]+)*/;
        if (namePop.val().match(namePop_Check)) {
          namePop.css("border-color", "#4548B9");
          $("#name-racb-error").html("");
          return true;
        } else {
          namePop.css("border-color", "red");
          $("#name-racb-error").html("Name can't be empty.");
          return false;
        }
      });

      phonePop.keyup(function (e) {
        let phonePop_Check = /^\+?\d{7,15}$/;
        if (phonePop.val().match(phonePop_Check)) {
          phonePop.css("border-color", "#4548B9");
          $("#phone-racb-error").html("");
          return true;
        } else {
          phonePop.css("border-color", "red");
          $("#phone-racb-error").html("Please provide a valid phone number.");
          return false;
        }
      });



      otherName.keyup(function (e) {
        let otherName_Check = /^[a-zA-Z\s]*$/;
        if (otherName.val().match(otherName_Check)) {
          otherName.css("border-color", "");
          $("#city-name-error").html("");
          return true;
        } else {
          otherName.css("border-color", "red");
          $("#city-name-error").html("Please specify your city.");
          return false;
        }
      });

    });
  });
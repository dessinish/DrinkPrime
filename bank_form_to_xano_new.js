var Webflow = Webflow || [];
Webflow.push(function() {
// unbind webflow form handling (keep this if you only want to affect specific forms)
$(document).off('submit');
/* Any form on the page */
$('#wf-form-detail-form').submit(function(e) {
  e.preventDefault();
  const $form = $(this); // The submitted form
  const $submit = $('[type=submit]', $form); // Submit button of form
  const buttonText = $submit.val(); // Original button text
  const buttonWaitingText = $submit.attr('data-wait'); // Waiting button text value
  const formMethod = $form.attr('method'); // Form method (GET/POST)
  const formAction = $form.attr('action'); // Form action (your Xano endpoint URL)
  const formRedirect = $form.attr('data-redirect'); // Form redirect location
  // if we're editing
  // const xanoID = document.getElementById('id').value // getting the ID of the record to edit
  // let requestURL = formAction.concat(xanoID + "?")
  const formData = $form.serialize(); // Form data
  // console.log(formData) // log request URL to console
  // Set waiting text
  if (buttonWaitingText) {
    $submit.val(buttonWaitingText);
  }
  $.ajax(formAction, {
    data: formData,
    method: formMethod
  })
  .done((res) => {
    window.location.reload();
    // If form redirect setting set, then use this and prevent any other actions
    if (formRedirect) { window.location = formRedirect; return; }
    $form
      .hide() // optional hiding of form
      .siblings('.w-form-done').show() // Show success
      .siblings('.w-form-fail').hide(); // Hide failure
  })
  .fail((res) => {
    $form
      .siblings('.w-form-done').hide() // Hide success
      .siblings('.w-form-fail').show(); // show failure
  })
  .always(() => {
    // Reset text
    $submit.val(buttonText);
  });
});
});

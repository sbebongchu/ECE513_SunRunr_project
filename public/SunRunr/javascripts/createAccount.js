function sendRegisterRequest() {
  let email = $('#email').val();
  let password = $('#password').val();
  let firstName = $('#firstName').val();
  let lastName = $('#lastName').val();
  let passwordConfirm = $('#passwordConfirm').val();
  
  // Check to make sure the passwords match
  // FIXME: Check to ensure strong password 
  if (password != passwordConfirm) {
    $('#ServerResponse').html("<span class='red-text text-darken-2'>Passwords do not match.</span>");
    $('#ServerResponse').show();
    return;
  }
  
  $.ajax({
   url: '/users/register',
   type: 'POST',
   contentType: 'application/json',
   data: JSON.stringify({email:email, firstName:firstName, lastName:lastName, password:password}),
   dataType: 'json'
  })
    .done(registerSuccess)
    .fail(registerError);
}

function registerSuccess(data, textStatus, jqXHR) {
  if (data.success) {  
    window.location = "index.html";
  }
  else {
    $('#ServerResponse').html("<span class='red-text text-darken-2'>Error: " + data.message + "</span>");
    $('#ServerResponse').show();
  }
}

function registerError(jqXHR, textStatus, errorThrown) {
  if (jqXHR.statusCode == 404) {
    $('#ServerResponse').html("<span class='red-text text-darken-2'>Server could not be reached.</p>");
    $('#ServerResponse').show();
  }
  else {
    $('#ServerResponse').html("<span class='red-text text-darken-2'> Couldn't register due to " + jqXHR.responseJSON.message + " error.</span>");
    $('#ServerResponse').show();
  }
}

$(function () {
  $('#signup').click(sendRegisterRequest);
});


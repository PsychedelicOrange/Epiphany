// LOAD ALL THE MATERIAL JS 
import {MDCRipple} from '@material/ripple/index';
document.querySelectorAll('.mdc-button').forEach
(
    function (mdc_button)
    {
        let ripple = new MDCRipple(mdc_button);
    }
);
import {MDCTextField} from '@material/textfield';
document.querySelectorAll('.mdc-text-field').forEach
(
    function (mdc_textfield)
    {
        let line_ripple = new MDCTextField(mdc_textfield);
    }
);
import {MDCFloatingLabel} from '@material/floating-label';
document.querySelectorAll('.mdc-floating-label').forEach(
    function (mdc_floatinglabel)
    {
        let floating_label = new MDCFloatingLabel(mdc_floatinglabel);
    }
);

import {MDCTextFieldIcon} from '@material/textfield/icon';
document.querySelectorAll('.mdc-text-field__icon').forEach(
    function (mdc_text_field__icon)
    {
        let icon = new MDCTextFieldIcon(mdc_text_field__icon);
    }
)
document.querySelectorAll('#password_visibility').forEach(
    function(field)
    {
        let ripple = new MDCRipple(field);
        ripple.unbounded=true;
    }
)
import {MDCSnackbar} from '@material/snackbar';
var snackbar = new MDCSnackbar(document.getElementById('wrong_pass'));

// EVENTS 

var login_button = document.getElementById("login");
login_button.addEventListener("click",function()
{
    var userName = document.getElementById('username_field');
    var password = document.getElementById('password_field');
    console.log(userName.value + password.value);
    fetch('/login/check',{
        method:"GET",
        headers:{ 
            'userName' : userName.value,
            'password' : password.value
        }
    })
    .then(respnce => {
       if(respnce.ok)
       {
            console.log(document.cookie);
            self.location="feed.html";
       }
       else{
        snackbar.open();
       }
    }).catch(err => console.log(err));
    
});
var signup_button = document.getElementById('signup');
signup_button.addEventListener("click",function(){
    self.location="signup.html";
});
var password_visibility_icon = document.getElementById("password_visibility");
password_visibility_icon.addEventListener("click", function() {
    
    console.log(document.getElementById("password_field").type)
    let password_field = document.getElementById("password_field");
    if(this.innerHTML=='visibility')
    {
        this.innerHTML='visibility_off';
        password_field.type = "text";
    }
    else
    {
        this.innerHTML='visibility';
        password_field.type = "password";
    }
})
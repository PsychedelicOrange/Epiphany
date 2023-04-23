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
var signup_button = document.getElementById('signup');
signup_button.addEventListener("click",function(){
    var userName = document.getElementById('username_field');
    var password = document.getElementById('password_field');
    console.log(userName.value + password.value);
    fetch('/signup',{
        method:"GET",
        headers:{ 
            'userName' : userName.value,
            'password' : password.value
        }
    })
    .then(respnce => {
       if(respnce.ok)
       {
        self.location="login.html";
       }
       else{
        console.log('error');
        self.location="login.html";
       }
    }).catch(err => console.log(err));
    
    
});
import {MDCTextFieldIcon} from '@material/textfield/icon';
document.querySelectorAll('.mdc-text-field__icon').forEach(
    function (mdc_text_field__icon)
    {
        let icon = new MDCTextFieldIcon(mdc_text_field__icon);
    }
)
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
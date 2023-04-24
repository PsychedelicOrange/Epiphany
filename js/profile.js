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
// events 
document.getElementById('logout').addEventListener("click",logout);
function logout(){
    document.cookie = "userId=;";
    self.location = "login.html";
}
document.getElementById('delete').addEventListener("click",deleteAcc)
function deleteAcc(){
    fetch('/delete',{
        method: 'GET',
    }).then(respnce => {
        document.cookie = "userId=;";
        self.location = "signup.html";
    });
}
window.onload = function(){
    getUsername();
    getStats();
}
// helpers
function getStats(){
    fetch('/stats',{
        method:"POST",
    })
    .then(respnce => {
        var arr = respnce.json().then(
            function(value){
                console.log(value);
                document.getElementById('nrAudios').innerHTML = `No of Uploaded Audios: ${value[0]}`;
                document.getElementById('nrLikes').innerHTML = `No of Likes: ${value[1]}`;
                document.getElementById('nrReplies').innerHTML = `No of Replies: ${value[2]}`;
            }
        );
    }).catch(err => console.log(err));
}
function getUsername(){
    fetch('/username',{
        method: 'GET',
        // Headers : {
        //     userId: getCookie('userId')
        // }
    }).then((response) => response.text())
    .then((text) => {
      document.getElementById('name_display').innerHTML = text;
    });
  }
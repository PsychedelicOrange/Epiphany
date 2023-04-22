console.log('Javascript transpiled');
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
{let icon = new MDCTextFieldIcon(document.querySelector('.mdc-text-field__icon'));}

{
    let ripple = new MDCRipple(document.getElementById("password_visibility"));
    ripple.unbounded = true;
}
import {MDCSnackbar} from '@material/snackbar';
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

var login_button = document.getElementById("login");
login_button.addEventListener("click",function()
{
    snackbar.open();
});


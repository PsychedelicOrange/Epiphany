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
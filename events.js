var password_visibility_icon = document.getElementById("password_visibility");
password_visibility_icon.addEventListener("click", function() {
    
    //console.log(document.getElementById("password_field").type)
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

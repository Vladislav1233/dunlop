$(document).ready(function(){
    jQuery.validator.addMethod("phone", function(value, element){
       return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value) ;
    }, "wrong phone");

    jQuery.validator.addMethod("mail", function(value, element){
        return /.+@.+\..+$/.test(value) ;
    }, "wrong email");

    $(".js-contact-form").validate({
        errorElement: "em",
        rules: {
            "s_name": {
                required: true
            },
            "m_mail": {
                required: true,
                mail: true,
            },
            "s_phone": {
                required: true,
                phone: true
            },
            "t_question": {
                required: true
            }
        }
    });
});

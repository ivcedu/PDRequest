var user_setup = false;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        setUserInformation();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#up_btn_save').click(function() {
        $("#up_btn_save").prop("disabled", true);
        $("#up_btn_close").prop("disabled", true);
        
        var err = formMainValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        saveUserProfile();
        window.open('home.html', '_self');
    });
    
    $('#up_btn_close').click(function() {
        if (!user_setup) {
            alert("You MUST save user profile setting");
        }
        else {
            window.open('home.html', '_self');
        }
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function formMainValidation() {
    var err = "";  

    if ($('#up_depart').val().replace(/\s+/g, '') === "") {
        err += "Department is a required field\n";
    }
    if ($('#up_phone').val().replace(/\s+/g, '') === "") {
        err += "Phone is a required field\n";
    }
    if ($('#up_division').val().replace(/\s+/g, '') === "") {
        err += "School is a required field\n";
    }

    return err;
}

////////////////////////////////////////////////////////////////////////////////
function setUserInformation() {
    var name = sessionStorage.getItem('m_loginName');
    var email = sessionStorage.getItem('m_loginEmail');
    var depart = sessionStorage.getItem('m_loginDepart');
    var phone = sessionStorage.getItem('m_loginPhone');
    var division = sessionStorage.getItem('m_loginDiv');
    
    var result = new Array();
    result = db_getLogin(email);
    if (result.length === 1) {
        user_setup = true;
        LoginID = result[0]['LoginID'];
        $('#up_name').val(result[0]['LoginName']);
        $('#up_email').val(result[0]['LoginEmail']);
        $('#up_depart').val(result[0]['LoginDepart']);
        $('#up_phone').val(result[0]['LoginPhone']);
        $('#up_division').val(result[0]['LoginDiv']);
        $('#up_etype').val(result[0]['LoginEType']);
        $('.selectpicker').selectpicker('refresh');
    }
    else {
        $('#up_name').val(name);
        $('#up_email').val(email);
        $('#up_depart').val(depart);
        $('#up_phone').val(phone);
        $('#up_division').val(division);
    }
}

////////////////////////////////////////////////////////////////////////////////
function saveUserProfile() {
    var name = textReplaceApostrophe($('#up_name').val());
    var email = textReplaceApostrophe($('#up_email').val());
    var depart = textReplaceApostrophe($('#up_depart').val());
    var phone = textReplaceApostrophe($('#up_phone').val());
    var division = textReplaceApostrophe($('#up_division').val());
    var etype = textReplaceApostrophe($('#up_etype').val());
    
    if (LoginID === "") {
        LoginID = db_insertLogin(name, email, depart, phone, division, etype);
    }
    else {
        db_updateLogin(LoginID, name, email, depart, phone, division, etype);
    }
    
    user_setup = true;
}
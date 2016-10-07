////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 5)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 10)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }  
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    // enter key to login
    $('#password').keypress(function (e) {
        if(e.keyCode === 13){
            $('#btn_login').click();
        }
    });
    
    $('#btn_login').click(function() {
        // ireport.ivc.edu validation //////////////////////////////////////////
        if(location.href.indexOf("ireport.ivc.edu") >= 0 && !ireportValidation()) {
            swal({  title: "Access Denied",
                    text: "This is a Development site. It will redirect to IVC Application site",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('https://services.ivc.edu/', '_self');
                        return false;
                    }
            );
        }
        ////////////////////////////////////////////////////////////////////////
        
        var url_param = sessionStorage.getItem('m_url_param');
        if(loginInfo()) {
            if (url_param === null) {
                window.open('home.html', '_self');
            }
            else {  
                window.open(url_param, '_self');
            }
        }
        else {
            $('#logn_error').show();
            this.blur();
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    sessionStorage.clear();
    var result = new Array();
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    var password = $('#password').val();
    
    result = getLoginUserInfo("php/login.php", username, password);
    if (result.length === 0) {
        result = getLoginUserInfo("php/login_saddleback.php", username, password);
    }
    if (result.length === 0) {
        return false;
    }
    else {
        var name = result[0];
        var email = result[1];
        var depart = result[2];
        var phone = result[3];
        var division = result[4];
        var emptype = result[5];
        
        if (name === null || typeof name === 'undefined' || email === null || typeof email === 'undefined') {
            alert("Login error: There was an error getting login user information from Active Direcy please try again");
            return;
        }

        localData_login(name, email, depart, phone, division, emptype);
        sessionStorage.setItem('m_defaultFiscalYrs', getCurrentFiscalYrs());
        
        if (location.href.indexOf("ireport.ivc.edu") >= 0) {
            sessionStorage.setItem('m_parentSite', 'https://ireport.ivc.edu');
        }
        else {
            sessionStorage.setItem('m_parentSite', 'https://services.ivc.edu');
        }
        
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function ireportValidation() {
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    if (ireportDBgetUserAccess(username) !== null) {
        return true;
    }
    else {
        return false;
    }
}
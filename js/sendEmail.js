////////////////////////////////////////////////////////////////////////////////
function proc_sendEmail(email, name, subject, message) {
    // for testing ...
    if (email === "dderoulet@ivc.edu") {
        email = "presidenttest@ivc.edu";
    }
    
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/sendEmail.php",
        data:{Email:email, Name:name, Subject:subject, Message:message},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}
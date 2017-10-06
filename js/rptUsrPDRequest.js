////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        var login_name = sessionStorage.getItem('m_loginName');
        $('#logn_name').text(login_name + " PD Request History");
        getLoginUserPDRequestListHistory();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() { 
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open("Login.html", '_self');
    });
    
    // pd request click ////////////////////////////////////////////////////////
    $('#rpt_usr_pd_request_list_history').on('click', 'a', function() {
        var str_Id = $(this).attr('id');
        var pd_request_ID = str_Id.replace("pd_request_ID_", "");
        
        sessionStorage.setItem('m_PDRequestID', pd_request_ID);
        window.open('printPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
    });
});

////////////////////////////////////////////////////////////////////////////////
function getLoginUserPDRequestListHistory() {
    var login_ID = sessionStorage.getItem('m_LoginID');
    var result = new Array(); 
    result = db_getPDRequestListUserHistory(login_ID);

    $("#rpt_usr_pd_request_list_history").empty();    
    if (result.length !== 0) {
        var str_html = "";
        for(var i = 0; i < result.length; i++) { 
            str_html += setPDRequestListHistoryHTML(result[i]['PDRequestID'], result[i]['ActTitle'], result[i]['StartDate'], result[i]['ResourceType'], result[i]['PDReqStep'], result[i]['Status']);
        }
        $("#rpt_usr_pd_request_list_history").append(str_html);
    }
}

function setPDRequestListHistoryHTML(PDRequestID, act_title, start_date, resource_type, step, status) {    
    var tbody = "<div class='row'>";
    tbody += "<div class='span3'><a href=# id='pd_request_ID_" + PDRequestID +  "'>" + act_title + "</a></div>"; 
    tbody += "<div class='span2'>" + start_date + "</div>";
    tbody += "<div class='span3'>" + resource_type + "</div>"; 
    tbody += "<div class='span2' id='pd_request_step_" + PDRequestID + "'>" + step + "</div>";  
    tbody += "<div class='span2' id='pd_request_status_" + PDRequestID + "'>" + status + "</div>";
    tbody += "</div>";
    return tbody;
}
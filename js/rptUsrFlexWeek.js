////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        var login_name = sessionStorage.getItem('m_loginName');
        $('#logn_name').text(login_name + " Flex Week History");
        getLoginUserFlexWeekListHistory();
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
    
    // flex week click /////////////////////////////////////////////////////////
    $('#rpt_usr_flex_week_history').on('click', 'a', function() {
        var str_Id = $(this).attr('id');
        var flex_week_ID = str_Id.replace("flex_week_ID_", "");
        
        sessionStorage.setItem('m_FlexWeekID', flex_week_ID);
        window.open('printFlexWeek.html', '_self');
    });
});

////////////////////////////////////////////////////////////////////////////////
function getLoginUserFlexWeekListHistory() {
    var login_ID = sessionStorage.getItem('m_LoginID');
    var result = new Array(); 
    result = db_getFlexWeekListUserHistory(login_ID);
    
    $("#rpt_usr_flex_week_history").empty();
    if (result.length !== 0) {
        var str_html = "";
        for(var i = 0; i < result.length; i++) { 
            var start_date = result[i]['StartDate'] + " " + result[i]['StartTime'];
            var end_date = result[i]['EndDate'] + " " + result[i]['EndTime'];
            str_html += setFlexWeekListHistoryHTML(result[i]['FlexWeekID'], result[i]['ActTitle'], result[i]['ActPresenter'], start_date, end_date, result[i]['FWHours']);
        }
        $("#rpt_usr_flex_week_history").append(str_html);
    }
}

function setFlexWeekListHistoryHTML(FlexWeekID, act_title, act_presenter, start_date, end_date, hrs) {    
    var tbody = "<div class='row'>";
    tbody += "<div class='span4'><a href=# id='flex_week_ID_" + FlexWeekID +  "'>" + act_title + "</a></div>"; 
    tbody += "<div class='span3'>" + act_presenter + "</div>"; 
    tbody += "<div class='span2'>" + start_date + "</div>";  
    tbody += "<div class='span2'>" + end_date + "</div>";
    tbody += "<div class='span1'>" + hrs + "</div>";
    tbody += "</div>";
    return tbody;
}
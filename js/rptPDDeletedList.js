////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        getPDDeletedList();
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#pd_deleted_tbl").tablesorter({ widgets: ['stickyHeaders'] });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {    
    $('#nav_admin').click(function() {
        window.open('administrator.html', '_self');
    });
});

////////////////////////////////////////////////////////////////////////////////
function getPDDeletedList() {
    var result = new Array(); 
    result = db_getPDRequestListDeleted();
    
    $("#body_tr").empty();
    if (result.length !== 0) {
        var str_html = "";
        for(var i = 0; i < result.length; i++) { 
            str_html += setPDDeletedListHTML(result[i]['PDRequestID'], result[i]['LoginName'], result[i]['ActTitle']);
        }
        $("#body_tr").append(str_html);
    }
}

function setPDDeletedListHTML(pd_request_id, faculty_name, activity_title) {    
    var tbl_html = "<tr>";
    tbl_html += "<td class='span1'>" + pd_request_id + "</td>";
    tbl_html += "<td class='span8'>" + activity_title + "</td>";
    tbl_html += "<td class='span3'>" + faculty_name + "</td>";
    tbl_html += "</tr>";
    return tbl_html; 
}
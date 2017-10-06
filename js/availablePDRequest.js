var name = "";
var email = "";
var depart = "";
var phone = "";
var division = "";
var emp_type = "";

var pd_request_ID = "";
var resource_type_ID = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {   
        $('#mod_popup_option').modal('hide');
        
        setPDRequestFiscalYrs();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailPDRequestList(fiscal_yrs);
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#avail_pd_request_tbl").tablesorter({ });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // general nav btn click ///////////////////////////////////////////////////
    $('#nav_home').click(function() {
        sessionStorage.removeItem("m_PDRequestID");
        window.open('home.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open("Login.html", '_self');
    });
    
    // table row pd request click //////////////////////////////////////////////
    $('table').on('click', 'a', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        pd_request_ID = currentId.replace("act_title_", "");
        resource_type_ID = $('#resource_type_ID_' + pd_request_ID).html();
        
        $('#mod_popup_option').modal('show');
    });

    // modal add to my pd request list click ///////////////////////////////////
    $('#mod_add_pd_request').click(function() {
        var new_pd_request_ID = copyPDRequest(pd_request_ID, resource_type_ID);
        sessionStorage.setItem('m_PDRequestID', new_pd_request_ID);
        window.open('prePDRequest.html', '_self');
        $('#mod_popup_option').modal('hide');
        return false;
    });
    
    // modal open to print view click //////////////////////////////////////////
    $('#mod_open_print_view').click(function() {
        sessionStorage.setItem('m_PDRequestID', pd_request_ID);
        window.open('printAvailPDRequest.html', '_blank');
        $('#mod_popup_option').modal('hide');
        return false;
    });
    
    // fiscal year change event ////////////////////////////////////////////////    
    $('#fw_fiscal_yrs').change(function() {
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailPDRequestList(fiscal_yrs);
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function setPDRequestFiscalYrs() {
    var result = new Array();
    result = db_getAvailPDRequestFiscalYrs();
    
    var fiscal_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $("#fw_fiscal_yrs").append(fiscal_html);
    $("#fw_fiscal_yrs").val(sessionStorage.getItem('m_defaultFiscalYrs'));
    $('#fw_fiscal_yrs').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getAvailPDRequestList(fiscal_yrs) {
    var result = new Array(); 
    result = db_getAvailPDRequestListByFiscalYrs(fiscal_yrs);
    
    $("#body_tr").empty();
    var html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            html += setAvailPDRequestListHTML(result[i]['PDRequestID'], result[i]['ActTitle'], result[i]['ActOrganizer'], result[i]['ActCity'], result[i]['State'], 
                                                result[i]['StartDate'], result[i]['EndDate'], result[i]['ResourceTypeID']);
        }
    }
    $("#body_tr").append(html);
}

function setAvailPDRequestListHTML(PDRequestID, act_title, act_organizer, act_city, state, start_date, end_date, resource_type_ID) {
    var tbl_html = "";
    tbl_html += "<tr class='row_tr' id='pd_request_ID_" + PDRequestID + "'>";
    tbl_html += "<td class='col_400'><a href=# id='act_title_" + PDRequestID +  "'>" + act_title + "</a></td>";
    tbl_html += "<td class='col_400'>" + act_organizer + "</td>";
    tbl_html += "<td class='col_150'>" + act_city + "</td>";
    tbl_html += "<td class='col_50'>" + state + "</td>";
    tbl_html += "<td class='col_100'>" + start_date + "</td>";
    tbl_html += "<td class='col_100'>" + end_date + "</td>";
    tbl_html += "<td class='col_100' style='display: none;' id='resource_type_ID_" + PDRequestID + "'>" + resource_type_ID + "</td>";
    tbl_html += "</tr>";
    
    return tbl_html;
}

////////////////////////////////////////////////////////////////////////////////
function getLoginID() {    
    email = textReplaceApostrophe(sessionStorage.getItem('m_loginEmail'));

    var login = new Array();
    login = db_getLogin(email);
    
    if (login.length === 1) {
        name = login[0]['LoginName'];
        depart = login[0]['LoginDepart'];
        phone = login[0]['LoginPhone'];
        division = login[0]['LoginDiv'];
        emp_type = login[0]['LoginEType'];
        return login[0]['LoginID'];
    }
    else {
        name = "";
        depart = "";
        phone = "";
        division = "";
        emp_type = "";
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function copyPDRequest(pd_request_ID, resource_type_ID) {
    var login_ID = getLoginID();
    var new_pd_request_ID = db_copyPDRequest(pd_request_ID, login_ID);
    
    db_insertPDReqUserInfo(new_pd_request_ID, name, email, depart, phone, division, emp_type);
    db_copyPDJustArea(pd_request_ID, new_pd_request_ID);
    db_copyNarrative(pd_request_ID, new_pd_request_ID);
    copyNarrativeAttachment(pd_request_ID, new_pd_request_ID);
    
    if (resource_type_ID === "1") {
        db_copyPDReqHours(pd_request_ID, new_pd_request_ID);
        db_insertPDReqHRProcess(new_pd_request_ID);
        db_updatePDReqHRProcessHrs(new_pd_request_ID, null, 1, 1);
        db_insertPDReqHRProcessLogHrs(new_pd_request_ID, null, 1, 1, "");
    }
    else if (resource_type_ID === "2") {
        db_copyPDReqReimb(pd_request_ID, new_pd_request_ID);
        db_insertPDReqHRProcess(new_pd_request_ID);
        db_updatePDReqHRProcessReimb(new_pd_request_ID, null, 1, 1);
        db_insertPDReqHRProcessLogReimb(new_pd_request_ID, null, 1, 1, "");
    }
    else {
        db_copyPDReqHours(pd_request_ID, new_pd_request_ID);
        db_copyPDReqReimb(pd_request_ID, new_pd_request_ID);
        db_insertPDReqHRProcess(new_pd_request_ID);
        db_updatePDReqHRProcessHrs(new_pd_request_ID, null, 1, 1);
        db_insertPDReqHRProcessLogHrs(new_pd_request_ID, null, 1, 1, "");
        db_updatePDReqHRProcessReimb(new_pd_request_ID, null, 1, 1);
        db_insertPDReqHRProcessLogReimb(new_pd_request_ID, null, 1, 1, "");
    }

    return new_pd_request_ID;
}

function copyNarrativeAttachment(pd_request_ID, new_pd_request_ID) {
    var result = new Array(); 
    result = db_getNarrativeAttach(pd_request_ID);
    
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var file_link_name = result[i]['FileLinkName'];
            var file_name = result[i]['FileName'];
            var ar_name = file_link_name.split("_");
            var index = ar_name[2];
            var new_file_link_name = "narrative_" + new_pd_request_ID + "_" + index + "_" + file_name;
            
            db_copyNarrativeAttach(file_link_name, new_pd_request_ID, new_file_link_name, file_name);
        }
    }
}
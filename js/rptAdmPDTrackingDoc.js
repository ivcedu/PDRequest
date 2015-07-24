var all_admin = false;
var trac_doc_id = "";
var pd_request_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        $('#mod_track_doc').modal('hide');
        
        getAdminLevel();
        getFiscalYrs();
        
        var fiscal_yrs = $('#fiscal_yrs').val();
        getPDTrackingDocList("", "", "All", fiscal_yrs);
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#pd_tracking_doc_tbl").tablesorter({ widgets: ['stickyHeaders'] });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {    
    $('#nav_admin').click(function() {
        window.open('administrator.html', '_self');
    });
    
    $('#start_date').change(function() {
        var start_date = $(this).val();
        $('#end_date').datepicker( "option", "minDate", new Date(start_date));
    });
    
    $('#btn_to_excel').click(function() {
        var start_date = textReplaceApostrophe($('#start_date').val());
        var end_date = textReplaceApostrophe($('#end_date').val());
        var etype = $('#employee_type').val();
        var fiscal_yrs = $('#fiscal_yrs').val();
        
        var err = formFilterValidation(start_date, end_date);
        if (err !== "") {
            alert(err);
        }
        else {
            var url_html = "StartDate=" + start_date + "&EndDate=" + end_date + "&EType=" + etype + "&FiscalYrs=" + fiscal_yrs;
            location.href = "php/db_savePDTrackingDocCSV.php?" + url_html;
        }
    });
    
    $('#btn_refresh').click(function() {
        var start_date = textReplaceApostrophe($('#start_date').val());
        var end_date = textReplaceApostrophe($('#end_date').val());
        var etype = $('#employee_type').val();
        var fiscal_yrs = $('#fiscal_yrs').val();
        
        var err = formFilterValidation(start_date, end_date);
        if (err !== "") {
            alert(err);
        }
        else {
            getPDTrackingDocList(start_date, end_date, etype, fiscal_yrs);
            initializeTable();
        }
    });
    
    // PDRequestID click ///////////////////////////////////////////////////////
    $('#pd_tracking_doc_tbl').on('click', 'a', function(e) {  
        e.preventDefault();
        
        var str_Id = $(this).attr('id');
        trac_doc_id = str_Id.replace("trac_doc_id_", "");     
        pd_request_id = $(this).html();
        $('#mod_trac_doc_id').html(pd_request_id);
        
        var result = new Array();
        result = db_getPDRequest(pd_request_id);
        if (result.length === 1) {
            $('#mod_header').html(result[0]['ActTitle']);
        }
        
        getTracDoc(trac_doc_id);
        $('#mod_track_doc').modal('show');
    });
    
    $('#mod_btn_pd_request_edit').click(function() {   
        if (!all_admin) {
            alert("Only professional development administrator can be update approved Hrs/Amount");
            return false;
        }
        
        sessionStorage.setItem('m_PDRequestID', pd_request_id);
        window.open('editPDRequest.html', '_self');
    });
    
    $('#mod_btn_pd_request_view').click(function() {        
        sessionStorage.setItem('m_PDRequestID', pd_request_id);
        window.open('printPDRequest.html?pdrequest_id=' + pd_request_id, '_self');
    });
    
    $('#mod_trac_doc_dist_alloc').change(function() {
        var value = 0.00;
        var str_value = $(this).val().replace(/[^0-9\.]/g, '');
        if (str_value !== "") {
            value = Number(str_value);
        }
        $(this).val(formatDollar(value, 2));
    });
    
    $('#mod_btn_trac_doc_save').click(function() {        
        updateTracDoc();
        
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();
        var etype = $('#employee_type').val();
        var fiscal_yrs = $('#fiscal_yrs').val();
        
        getPDTrackingDocList(start_date, end_date, etype, fiscal_yrs);
    });
    
    // datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // selectpicker
    $('.selectpicker').selectpicker();
    
    // auto size
    $('#mod_trac_doc_comments').autosize();
});

////////////////////////////////////////////////////////////////////////////////
function getAdminLevel() {
    var result = new Array();
    result = db_getAdministrator(sessionStorage.getItem('m_loginEmail'));
    
    if (result.length === 1) {
        if (result[0]['AdminSetting'] === "AllAdmin") {
            all_admin = true;
        }
    }
}

function getFiscalYrs() {
    var result = new Array();
    result = db_getPDRequestFiscalYrs();
    
    var fiscal_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $("#fiscal_yrs").append(fiscal_html);
    $("#fiscal_yrs").val(sessionStorage.getItem('m_defaultFiscalYrs'));
    $('#fiscal_yrs').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function formFilterValidation(start_date, end_date) {    
    if (start_date !== "" && end_date === "") {
        return "End date is a required field";
    }
    else if (start_date === "" && end_date !== "") {
        return "Start date is a required field";
    }
    else {
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function getPDTrackingDocList(start_date, end_date, etype, fiscal_yrs) {
    var result = new Array(); 
    result = db_getPDTrackingDoc(start_date, end_date, etype, fiscal_yrs);
    
    $("#body_tr").empty();
    if (result.length !== 0) {
        var str_html = "";
        for(var i = 0; i < result.length; i++) { 
            var pre_sub_date = convertDBDateTimeToString(result[i]['PreSubmissionDate']);
            var pre_app_date = convertDBDateTimeToString(result[i]['PreApprovedDate']);
            var pre_hr_req = Number(result[i]['PreHrsRequest']).toFixed(2);
            var pre_hr_app = Number(result[i]['PreHrsApproved']).toFixed(2);
            var pre_amt_req = formatDollar(Number(result[i]['PreAmtRequest']), 2);
            var pre_amt_app = formatDollar(Number(result[i]['PreAmtApproved']), 2);
            var post_sub_date = convertDBDateTimeToString(result[i]['PostSubmissionDate']);
            var post_app_date = convertDBDateTimeToString(result[i]['PostApprovedDate']);
            var post_hr_req = Number(result[i]['PostHrsRequest']).toFixed(2);
            var post_hr_app = Number(result[i]['PostHrsApproved']).toFixed(2);
            var post_amt_req = formatDollar(Number(result[i]['PostAmtRequest']), 2);
            var post_amt_app = formatDollar(Number(result[i]['PostAmtApproved']), 2);
            var start_date = result[i]['StartDate'];
            var end_date = result[i]['EndDate'];
            var dist_alloc = formatDollar(Number(result[i]['DistPaid']), 2);
            str_html += setPDTrackingDocListHTML(result[i]['PDRequestID'], result[i]['TracDocID'], result[i]['FacultyName'], start_date, end_date, pre_sub_date, pre_app_date, pre_hr_req, pre_hr_app, pre_amt_req, pre_amt_app,
                                                 post_sub_date, post_app_date, post_hr_req, post_hr_app, post_amt_req, post_amt_app, result[i]['ReqNum'], dist_alloc, result[i]['Comments']);
        }
        $("#body_tr").append(str_html);
    }
    
    $("#pd_tracking_doc_tbl").trigger("update");
}

function setPDTrackingDocListHTML(pd_request_id, trac_doc_id, faculty_name, start_date, end_date, pre_sub_date, pre_app_date, pre_hr_req, pre_hr_app, pre_amt_req, pre_amt_app,
                                    post_sub_date, post_app_date, post_hr_req, post_hr_app, post_amt_req, post_amt_app, req_num, dist_alloc, comments) {    
    var tbl_html = "<tr>";
    tbl_html += "<td class='col_50'><a href=# id='trac_doc_id_" + trac_doc_id +  "'>" + pd_request_id + "</a></td>";
    tbl_html += "<td class='col_150'>" + faculty_name + "</td>";
    tbl_html += "<td class='col_100'>" + start_date + "</td>";
    tbl_html += "<td class='col_100'>" + end_date + "</td>";
    tbl_html += "<td class='col_200'>" + pre_sub_date + "</td>";
    tbl_html += "<td class='col_200'>" + pre_app_date + "</td>";
    tbl_html += "<td class='col_100'>" + pre_hr_req + "</td>";
    tbl_html += "<td class='col_100'>" + pre_hr_app + "</td>";
    tbl_html += "<td class='col_150'>" + pre_amt_req + "</td>";
    tbl_html += "<td class='col_150'>" + pre_amt_app + "</td>";
    tbl_html += "<td class='col_200'>" + post_sub_date + "</td>";
    tbl_html += "<td class='col_200'>" + post_app_date + "</td>";
    tbl_html += "<td class='col_100'>" + post_hr_req + "</td>";
    tbl_html += "<td class='col_100'>" + post_hr_app + "</td>";
    tbl_html += "<td class='col_150'>" + post_amt_req + "</td>";
    tbl_html += "<td class='col_150'>" + post_amt_app + "</td>";
    tbl_html += "<td class='col_150'>" + req_num + "</td>";
    tbl_html += "<td class='col_150'>" + dist_alloc + "</td>";
    tbl_html += "<td class='col_200'>" + comments + "</td>";
    tbl_html += "</tr>";
    return  tbl_html;
}

////////////////////////////////////////////////////////////////////////////////
function getTracDoc() {
    var result = new Array(); 
    result = db_getTracDoc(trac_doc_id);
    
    if (result.length === 1) {
        $('#mod_trac_doc_req_num').val(result[0]['ReqNum']);
        $('#mod_trac_doc_dist_alloc').val(formatDollar(Number(result[0]['DistPaid']), 2));
        $('#mod_trac_doc_comments').val(result[0]['Comments']).trigger('autosize.resize');
    }
}

function updateTracDoc() {
    var req_num = textReplaceApostrophe($('#mod_trac_doc_req_num').val());
    var str_dist_alloc = $('#mod_trac_doc_dist_alloc').val();
    var dist_alloc = revertDollar(str_dist_alloc);
    var comments = textReplaceApostrophe($('#mod_trac_doc_comments').val());
    var note = "update TracDoc ReqNum: " + req_num + " District Allocation: " + str_dist_alloc + " Comments: " + comments;
    
    db_updateTracDoc(trac_doc_id, req_num, dist_alloc, comments);
    db_insertLogHistory(pd_request_id, sessionStorage.getItem('m_loginName'), note);
}
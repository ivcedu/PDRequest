var pdf;

var page_x = 8.5;
var page_y = 11.0;

var margin_x = 0.5;
var margin_y = 0.5;
var column_width = 1.25;
var line_pos = margin_y;
var x_offset = 0;
var text = "";

var pd_limit = 0.0;
var amount_convert = 0.0;
var available_amount = 0.0;

var hrs_step_id = null;
var hrs_status_id = null;
var reimb_step_id = null;
var reimb_status_id = null;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) { 
        getURLParameters();
        if (sessionStorage.getItem('m_PDRequestStep') === "Post-activity") {
            PDReqStepID = "2";
        }

        setAdminNavOption();
        setDefaultSetting();
        getPDSystem();

        getSelectPDRequest();
        getSelectResourceType();
        getSelectPDReqUserInfo();
        getSelectJustArea();
        getSelectNarrative();
        getSelectPAReqInfo1();
        getSelectPAReqInfo2();
        getTransactionHistory();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function getURLParameters() {
    var searchStr = location.search;
    var searchArray = new Array();
    while (searchStr!=='') {
        var name, value;
        // strip off leading ? or &
        if ((searchStr.charAt(0)==='?')||(searchStr.charAt(0)==='&')) {
            searchStr = searchStr.substring(1,searchStr.length);
        }
        // find name
        name = searchStr.substring(0,searchStr.indexOf('='));
        // find value
        if (searchStr.indexOf('&')!==-1) {
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.indexOf('&'));
        }
        else {
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.length);
        }
        // add pair to an associative array
        value = value.replace("%20", " ");
        searchArray[name] = value;
        // cut first pair from string
        if (searchStr.indexOf('&')!==-1) {
            searchStr =  searchStr.substring(searchStr.indexOf('&')+1,searchStr.length);
        }
        else {
            searchStr = '';
        }
    }
    
    PDRequestID = searchArray['pdrequest_id'];
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#nav_home').click(function() {
        window.open('home.html', '_self');
    });
    
    $('#nav_admin').click(function() {
        window.open('administrator.html', '_self');
    });
    
    $('#nav_print').click(function() {
        window.print();
    });
    
    $('#convert_pdf').click(function() {    
        pdf = new jsPDF('p', 'in', 'letter');
        pdf.setFont("helvetica");
        pdf.setFontSize(9);
        
        createPDRequestPDFfile();
    });
    
//    $('#btn_admin_submit').click(function() {
//        var status_id = "";
//        if ($('input:radio[name=approval_status]').is(':checked')) {
//            status_id = $('input[name="approval_status"]:checked').val();
//        }
//        else {
//            alert("Please select one of the status");
//            return false;
//        }
//        
//        updatePDRequestApprovalFields();
//        updateApproverStatus(status_id);
//        addTransaction();
//        
//        var status_list = new Array();
//        status_list = db_getStatus(status_id);
//        var status_name = "";
//        if (status_list.length === 1) {
//            status_name = status_list[0][1];
//        }
//        
//        if (PDReqStepID === "1") {
//            if (ResourceTypeID === "1") {
//                var pre_approved_hrs = $('#pre_app_hrs_admin').val();
//                var pre_not_approved_hrs = $('#pre_not_app_hrs').html();
//                var note = "\nPre-activity total hours approved: " + pre_approved_hrs;
//                note += "\nPre-activity total hours not approved: " + pre_not_approved_hrs;
//                db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approval status: " + status_name + note);
//            }
//            else if (ResourceTypeID === "2") {
//                var pre_approved_amt = $('#pre_total_amount_approved_admin').val();
//                var pre_pending_amt= $('#pre_total_amount_pending_funds_admin').val();
//                var pre_not_approved_amt = $('#pre_total_amount_not_approved_admin').val();
//                var note = "\nPre-activity total amount approved: " + pre_approved_amt;
//                note += "\nPre-activity total amount pending funds: " + pre_pending_amt;
//                note += "\nPre-activity total amount not approved: " + pre_not_approved_amt;
//                db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approval status: " + status_name + note);
//            }
//            else {
//                var pre_approved_hrs = $('#pre_app_hrs_admin').val();
//                var pre_not_approved_hrs = $('#pre_not_app_hrs').html();
//                var pre_approved_amt = $('#pre_total_amount_approved_admin').val();
//                var pre_pending_amt= $('#pre_total_amount_pending_funds_admin').val();
//                var pre_not_approved_amt = $('#pre_total_amount_not_approved_admin').val();
//                var note = "\nPre-activity total hours approved: " + pre_approved_hrs;
//                note += "\nPre-activity total hours not approved: " + pre_not_approved_hrs;
//                note += "\nPre-activity total amount approved: " + pre_approved_amt;
//                note += "\nPre-activity total amount pending funds: " + pre_pending_amt;
//                note += "\nPre-activity total amount not approved: " + pre_not_approved_amt;
//                db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approval status: " + status_name + note);
//            }
//        }
//        else {
//            if (ResourceTypeID === "1") {
//                var post_approved_hrs = $('#post_app_hrs_admin').val();
//                var post_not_approved_hrs = $('#post_not_app_hrs').html();
//                var note = "\nPost-activity total hours approved: " + post_approved_hrs;
//                note += "\nPost-activity total hours not approved: " + post_not_approved_hrs;
//                db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approval status: " + status_name + note);
//            }
//            else if (ResourceTypeID === "2") {
//                var post_approved_amt = $('#post_total_amount_approved_admin').val();
//                var post_pending_amt= $('#post_total_amount_pending_funds_admin').val();
//                var post_not_approved_amt = $('#post_total_amount_not_approved_admin').val();
//                var note = "\nPost-activity total amount approved: " + post_approved_amt;
//                note += "\nPost-activity total amount pending funds: " + post_pending_amt;
//                note += "\nPost-activity total amount not approved: " + post_not_approved_amt;
//                db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approval status: " + status_name + note);
//            }
//            else {
//                var post_approved_hrs = $('#post_app_hrs_admin').val();
//                var post_not_approved_hrs = $('#post_not_app_hrs').html();
//                var post_approved_amt = $('#post_total_amount_approved_admin').val();
//                var post_pending_amt= $('#post_total_amount_pending_funds_admin').val();
//                var post_not_approved_amt = $('#post_total_amount_not_approved_admin').val();
//                var note = "\nPost-activity total hours approved: " + post_approved_hrs;
//                note += "\nPost-activity total hours not approved: " + post_not_approved_hrs;
//                note += "\nPost-activity total amount approved: " + post_approved_amt;
//                note += "\nPost-activity total amount pending funds: " + post_pending_amt;
//                note += "\nPost-activity total amount not approved: " + post_not_approved_amt;
//                db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approval status: " + status_name + note);
//            }
//        }
//
//        sessionStorage.removeItem("m_PDRequestID");
//        window.open('administrator.html', '_self');
//    });
    
    
//    $('#btn_back_to_draft').click(function() {
//        updateApproverStatus("1");
//        addTransaction();
//        
//        db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "send back to draft");
//        
//        sessionStorage.removeItem("m_PDRequestID");
//        window.open('administrator.html', '_self');
//    });
    
//    $('#ckb_comments').change(function() {      
//        var ckb_comm = ($(this).is(':checked') ? true : false);
//        if (ckb_comm) {
//            $('#comments_block').show();
//        }
//        else {
//            $('#comments_block').hide();
//        }
//    });
//    
//    $('#user_comments').autosize();
});

////////////////////////////////////////////////////////////////////////////////
function setAdminNavOption() {
    var result = new Array();
    result = db_getAdministrator(sessionStorage.getItem('m_loginEmail'));
    
    if (result.length === 0) {
        $('#show_admin').hide();
    }
}

function setDefaultSetting() {
    $('.hrs_sections').hide();
    $('.reimb_sections').hide();
    $('.post_hrs_class').hide();
    $('.post_reimb_class').hide();
}

function setClearJustArea() {
    $("#just_area_1").prop('checked', false);
    $("#just_area_2").prop('checked', false);
    $("#just_area_3").prop('checked', false);
    $("#just_area_4").prop('checked', false);
    $("#just_area_5").prop('checked', false);
    $("#just_area_6").prop('checked', false);
    $("#just_area_7").prop('checked', false);
    $("#just_area_8").prop('checked', false);
    $("#just_area_9").prop('checked', false);
}

////////////////////////////////////////////////////////////////////////////////
function getPDSystem() {
    var pdsystem = new Array();
    pdsystem = db_getPDSystem();
    
    for(var i = 0; i < pdsystem.length; i++) {
        var sys_name = pdsystem[i][1];
        
        if (sys_name === "Breakfast") {
            sys_breakfast_amt = Number(pdsystem[i][2]);
            var str_breakfast_amt = formatDollar(sys_breakfast_amt, 0);
            $('#breakfast_text').html("Number of Breakfasts ( " + str_breakfast_amt + " per breakfast):");
        }
        else if (sys_name === "Lunch") {
            sys_lunch_amt = Number(pdsystem[i][2]);
            var str_lunch_amt = formatDollar(sys_lunch_amt, 0);
            $('#lunch_text').html("Number of Lunches ( " + str_lunch_amt + " per lunch):");
        }
        else if (sys_name === "Dinner") {
            sys_dinner_amt = Number(pdsystem[i][2]);
            var str_dinner_amt = formatDollar(sys_dinner_amt, 0);
            $('#dinner_text').html("Number of Dinners ( " + str_dinner_amt + " per dinner):");
        }
        else if (sys_name === "Mileage") {
            sys_mileage_amt = Number(pdsystem[i][2]);
            var str_mileage_amt = formatDollar(sys_mileage_amt, 3);
            $('#mileage_text').html("Mileage ( " + str_mileage_amt + " per mile):");
        }
    }
}

function getActStateByID(ActStateID) {
    var state_list = new Array();
    state_list = db_getActStateByID(ActStateID);
    
    if (state_list.length === 1) {
        return state_list[0]['State'];
    }
    else {
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function getSelectPDRequest() {
    var pd_request = new Array();
    pd_request = db_getPDRequest(PDRequestID);
    
    $('#pdrequest_id').html(PDRequestID);
    $('#req_num').html(pd_request[0]['ReqNum']);
    $('#print_title').html(pd_request[0]['ActTitle']);

    $('#activity_title').html(pd_request[0]['ActTitle']);
    $('#fiscal').html(pd_request[0]['FiscalYrs']);
    $('#activity_organizer').html(pd_request[0]['ActOrganizer']);
    $('#activity_city').html(pd_request[0]['ActCity']);
    $('#activity_state').html(getActStateByID(pd_request[0]['ActStateID']));
    $('#activity_description').html(pd_request[0]['ActDescrip'].replace(/\n/g, "<br>"));
    $('#activity_link').html(pd_request[0]['ActLink']);
    $('#start_date').html(pd_request[0]['StartDate']);
    $('#end_date').html(pd_request[0]['EndDate']);
    $('#current_date').html(pd_request[0]['CreateDate']);

    LoginID = pd_request[0]['LoginID'];
    ResourceTypeID = pd_request[0]['ResourceTypeID'];
    StatusID = pd_request[0]['StatusID'];
    PDReqStepID = pd_request[0]['PDReqStepID'];

    setResourceTypeStepStatus();
}

function setResourceTypeStepStatus() {
    var str_html = "";
    if (ResourceTypeID === "1") {
        str_html += hrsStepStatusHTML();
    }
    else if (ResourceTypeID === "2") {
        str_html += reimbStepStatusHTML();
    }
    else {
        str_html += hrsStepStatusHTML();
        str_html += reimbStepStatusHTML();
    }
    $('#pd_req_status').append(str_html);
}

function hrsStepStatusHTML() {
    var str_html = "<div class='row-fluid'>";
    str_html += "<div class='span3' style='padding-top: 5px;'>Hours</div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='cur_hrs_step'></div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='cur_hrs_status'></div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='cur_hrs_dtstamp'></div>";
    str_html += "</div>";
    return str_html;
}

function reimbStepStatusHTML() {
    var str_html = "<div class='row-fluid'>";
    str_html += "<div class='span3' style='padding-top: 5px;'>Reimbursement</div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='cur_reimb_step'></div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='cur_reimb_status'></div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='cur_reimb_dtstamp'></div>";
    str_html += "</div>";
    return str_html;
}

function getSelectPDReqUserInfo() {
    var pd_req_user_info = new Array();
    pd_req_user_info = db_getPDReqUserInfo(PDRequestID);
    
    if (pd_req_user_info.length === 1) {
        PDReqUserInfoID = pd_req_user_info[0][0];
        $('#requestor').html(pd_req_user_info[0]['Name']);
        $('#email').html(pd_req_user_info[0]['Email']);
        $('#department').html(pd_req_user_info[0]['Depart']);
        $('#phone').html(pd_req_user_info[0]['Phone']);
        $('#school').html(pd_req_user_info[0]['Division']);
        $('#employee_type').html(pd_req_user_info[0]['EmployeeType']);
    }
}

function getSelectJustArea() {
    var just_area = new Array();
    just_area = db_getPDJustArea(PDRequestID);
    
    setClearJustArea();
    if (just_area.length === 1) {
        PDJustAreaID = just_area[0][0];
        if (just_area[0]['JustArea_1'] === "1") {
            $("#just_area_1").prop('checked', true);
        }
        if (just_area[0]['JustArea_2'] === "1") {
            $("#just_area_2").prop('checked', true);
        }
        if (just_area[0]['JustArea_3'] === "1") {
            $("#just_area_3").prop('checked', true);
        }
        if (just_area[0]['JustArea_4'] === "1") {
            $("#just_area_4").prop('checked', true);
        }
        if (just_area[0]['JustArea_5'] === "1") {
            $("#just_area_5").prop('checked', true);
        }
        if (just_area[0]['JustArea_5'] === "1") {
            $("#just_area_5").prop('checked', true);
        }
        if (just_area[0]['JustArea_6'] === "1") {
            $("#just_area_6").prop('checked', true);
        }
        if (just_area[0]['JustArea_7'] === "1") {
            $("#just_area_7").prop('checked', true);
        }
        if (just_area[0]['JustArea_8'] === "1") {
            $("#just_area_8").prop('checked', true);
        }
        if (just_area[0]['JustArea_9'] === "1") {
            $("#just_area_9").prop('checked', true);
        }
    }
}

function getSelectNarrative() {
    var narrative = new Array();
    narrative = db_getNarrative(PDRequestID);
    
    if (narrative.length === 1) {
        NarrativeID = narrative[0][0];
        $('#just_narrative_descrip').html(narrative[0]['Narrative'].replace(/\n/g, "<br>"));
    }
    
    getSelectNarrativeAttachment();
}

function getSelectNarrativeAttachment() {
    var attach_files = new Array();
    attach_files = db_getNarrativeAttach(PDRequestID);
    
    $('#just_narrative_attached_list').empty();
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i]['FileLinkName'];
            var f_name = attach_files[i]['FileName'];
            var html = justNarrativeAttachFileHTML(i+1, fl_name, f_name);
            $("#just_narrative_attached_list").append(html);
        }
    }
}

function justNarrativeAttachFileHTML(index, file_link_name, file_name) {    
    var html = "<div class='row' id='just_narr_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset3' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='just_narr_file_view_" + index + "'>" + file_name + "</a></div>";
    html += "</div>";
    
    return html;
}

function getSelectPAReqInfo1() {
    var pa_req_info_1 = new Array();
    pa_req_info_1 = db_getPAReqInfo1(PDRequestID);
    
    if (pa_req_info_1.length === 1) {
        PAReqInfo1ID = pa_req_info_1[0][0];
        $('#post_activity_info_1_descrip').html(pa_req_info_1[0]['PAReqInfo1'].replace(/\n/g, "<br>"));
    }
    
    getSelectPAReqInfo1Attachment();
}

function getSelectPAReqInfo1Attachment() {
    var attach_files = new Array();
    attach_files = db_getPAReqInfo1Attach(PDRequestID);
    
    $('#post_activity_info_1_attached_list').empty();
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i]['FileLinkName'];
            var f_name = attach_files[i]['FileName'];
            var html = paReqInfo1AttachFileHTML(i+1, fl_name, f_name);
            $("#post_activity_info_1_attached_list").append(html);
        }
    }
}

function paReqInfo1AttachFileHTML(index, file_link_name, file_name) {    
    var html = "<div class='row' id='paReqInfo_1_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset3' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='paReqInfo_1_file_view_" + index + "'>" + file_name + "</a></div>";
    html += "</div>";
    
    return html;
}

function getSelectPAReqInfo2() {
    var pa_req_info_2 = new Array();
    pa_req_info_2 = db_getPAReqInfo2(PDRequestID);
    
    if (pa_req_info_2.length === 1) {
        PAReqInfo2ID = pa_req_info_2[0][0];
        $('#post_activity_info_2_descrip').html(pa_req_info_2[0]['PAReqInfo2'].replace(/\n/g, "<br>"));
    }
    
    getSelectPAReqInfo2Attachment();
}

function getSelectPAReqInfo2Attachment() {
    var attach_files = new Array();
    attach_files = db_getPAReqInfo2Attach(PDRequestID);
    
    $('#post_activity_info_2_attached_list').empty();
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i]['FileLinkName'];
            var f_name = attach_files[i]['FileName'];
            var html = paReqInfo2AttachFileHTML(i+1, fl_name, f_name);
            $("#post_activity_info_2_attached_list").append(html);
        }
    }
}

function paReqInfo2AttachFileHTML(index, file_link_name, file_name) {    
    var html = "<div class='row' id='paReqInfo_2_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset3' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='paReqInfo_2_file_view_" + index + "'>" + file_name + "</a></div>";
    html += "</div>";
    
    return html;
}

function getSelectResourceType() {
    var resource_type = db_getResourceTypeByID(ResourceTypeID);
    $('#resource_type').html(resource_type);
    
    if (ResourceTypeID === "1") {
        getHrsStepStatus();
        $('.hrs_sections').show();
        getSelectPDReqHours();
    }
    else if (ResourceTypeID === "2") {
        getReimbStepStatus();
        $('.reimb_sections').show();
        getSelectPDReqReimb();
    }
    else {
        getHrsStepStatus();
        getReimbStepStatus();
        $('.hrs_sections').show();
        $('.reimb_sections').show();
        getSelectPDReqHours();
        getSelectPDReqReimb();
    }
    
    getSelectTransaction();
}

function getSelectPDReqHours() {
    var pd_req_hours = new Array();
    pd_req_hours = db_getPDReqHours(PDRequestID);
    if (pd_req_hours.length === 1) {
        PDReqHoursID = pd_req_hours[0][0];
        $('#pre_input_hrs').html(Number(pd_req_hours[0]['PreInputHr']).toFixed(2));
        $('#pre_presenter_hrs').html(Number(pd_req_hours[0]['PrePresHr']).toFixed(2));
        $('#pre_participant_hrs').html(Number(pd_req_hours[0]['PrePartHr']).toFixed(2));
        $('#pre_total_hrs').html(Number(pd_req_hours[0]['PreTotalHr']).toFixed(2));
        $('#pre_app_hrs').html(Number(pd_req_hours[0]['PreAppHr']).toFixed(2));
        $('#pre_not_app_hrs').html(Number(pd_req_hours[0]['PreNotAppHr']).toFixed(2));

        $('#post_input_hrs').html(Number(pd_req_hours[0]['PostInputHr']).toFixed(2));
        $('#post_presenter_hrs').html(Number(pd_req_hours[0]['PostPresHr']).toFixed(2));
        $('#post_participant_hrs').html(Number(pd_req_hours[0]['PostPartHr']).toFixed(2));
        $('#post_total_hrs').html(Number(pd_req_hours[0]['PostTotalHr']).toFixed(2));
        $('#post_app_hrs').html(Number(pd_req_hours[0]['PostAppHr']).toFixed(2));
        $('#post_not_app_hrs').html(Number(pd_req_hours[0]['PostNotAppHr']).toFixed(2));
    }
}

function getSelectPDReqReimb() {
    var pd_req_reimb = new Array();
    pd_req_reimb = db_getPDReqReimb(PDRequestID);
    if (pd_req_reimb.length === 1) {
        PDReqReimbID = pd_req_reimb[0][0];
        var pre_reg_fee = Number(pd_req_reimb[0]['PreReqFee']);
        $('#pre_reg_fee').html(formatDollar(pre_reg_fee, 2));
        var pre_travel = Number(pd_req_reimb[0]['PreTravel']);
        $('#pre_travel_cost').html(formatDollar(pre_travel, 2));
        var pre_mileage = Number(pd_req_reimb[0]['PreMileage']);
        $('#pre_input_mileage').html(pre_mileage);
        var pre_mil_cost = Number(pd_req_reimb[0]['PreMilCost']);
        $('#pre_mileage_cost').html(formatDollar(pre_mil_cost, 2));
        var pre_lodging = Number(pd_req_reimb[0]['PreLodging']);
        $('#pre_lodging_cost').html(formatDollar(pre_lodging, 2));
        var pre_num_brk = Number(pd_req_reimb[0]['PreNumBrk']);
        $('#pre_input_breakfast').html(pre_num_brk);
        var pre_brk_cost = Number(pd_req_reimb[0]['PreBrkCost']);
        $('#pre_breakfast_cost').html(formatDollar(pre_brk_cost, 2));
        var pre_num_lun = Number(pd_req_reimb[0]['PreNumLun']);
        $('#pre_input_lunch').html(pre_num_lun);
        var pre_lun_cost = Number(pd_req_reimb[0]['PreLunCost']);
        $('#pre_lunch_cost').html(formatDollar(pre_lun_cost, 2));
        var pre_num_din = Number(pd_req_reimb[0]['PreNumDin']);
        $('#pre_input_dinner').html(pre_num_din);
        var pre_din_cost = Number(pd_req_reimb[0]['PreDinCost']);
        $('#pre_dinner_cost').html(formatDollar(pre_din_cost, 2));     
        $('#other_cost_description').html(pd_req_reimb[0]['OtherSource']);
        var pre_oth_cost = Number(pd_req_reimb[0]['PreOthCost']);
        $('#pre_other_cost').html(formatDollar(pre_oth_cost, 2));
        var pre_sub_total = Number(pd_req_reimb[0]['PreSubTotal']);
        $('#pre_sub_total').html(formatDollar(pre_sub_total, 2));
        var pre_fun_cost = Number(pd_req_reimb[0]['PreFunCost']);
        $('#pre_funding_other').html(formatDollar(pre_fun_cost, 2));
        var pre_total_cost = Number(pd_req_reimb[0]['PreTotalCost']);
        $('#pre_total_cost').html(formatDollar(pre_total_cost, 2));
        var pre_total_amt_request = Number(pd_req_reimb[0]['PreTotalAmtRequest']);
        $('#pre_total_amount_request').html(formatDollar(pre_total_amt_request, 2));
        var pre_total_amt_approved = Number(pd_req_reimb[0]['PreTotalAmtApproved']);
        $('#pre_total_amount_approved').html(formatDollar(pre_total_amt_approved, 2));
        var pre_total_amt_pending_funs = Number(pd_req_reimb[0]['PreTotalAmtPendingFunds']);
        $('#pre_total_amount_pending_funds').html(formatDollar(pre_total_amt_pending_funs, 2));
        var pre_total_amt_not_approved = Number(pd_req_reimb[0]['PreTotalAmtNotApproved']);
        $('#pre_total_amount_not_approved').html(formatDollar(pre_total_amt_not_approved, 2));
            
        var post_reg_fee = Number(pd_req_reimb[0]['PostReqFee']);
        $('#post_reg_fee').html(formatDollar(post_reg_fee, 2));
        var post_travel = Number(pd_req_reimb[0]['PostTravel']);
        $('#post_travel_cost').html(formatDollar(post_travel, 2));
        var post_mileage = Number(pd_req_reimb[0]['PostMileage']);
        $('#post_input_mileage').html(post_mileage);
        var post_mil_cost = Number(pd_req_reimb[0]['PostMilCost']);
        $('#post_mileage_cost').html(formatDollar(post_mil_cost, 2));
        var post_lodging = Number(pd_req_reimb[0]['PostLodging']);
        $('#post_lodging_cost').html(formatDollar(post_lodging, 2));
        var post_num_brk = Number(pd_req_reimb[0]['PostNumBrk']);
        $('#post_input_breakfast').html(post_num_brk);
        var post_brk_cost = Number(pd_req_reimb[0]['PostBrkCost']);
        $('#post_breakfast_cost').html(formatDollar(post_brk_cost, 2));
        var post_num_lun = Number(pd_req_reimb[0]['PostNumLun']);
        $('#post_input_lunch').html(post_num_lun);
        var post_lun_cost = Number(pd_req_reimb[0]['PostLunCost']);
        $('#post_lunch_cost').html(formatDollar(post_lun_cost, 2));
        var post_num_din = Number(pd_req_reimb[0]['PostNumDin']);
        $('#post_input_dinner').html(post_num_din);
        var post_din_cost = Number(pd_req_reimb[0]['PostDinCost']);
        $('#post_dinner_cost').html(formatDollar(post_din_cost, 2));
        var post_oth_cost = Number(pd_req_reimb[0]['PostOthCost']);
        $('#post_other_cost').html(formatDollar(post_oth_cost, 2));
        var post_sub_total = Number(pd_req_reimb[0]['PostSubTotal']);
        $('#post_sub_total').html(formatDollar(post_sub_total, 2));
        var post_fun_cost = Number(pd_req_reimb[0]['PostFunCost']);
        $('#post_funding_other').html(formatDollar(post_fun_cost, 2));
        var post_total_cost = Number(pd_req_reimb[0]['PostTotalCost']);
        $('#post_total_cost').html(formatDollar(post_total_cost, 2));
        var post_total_amt_request = Number(pd_req_reimb[0]['PostTotalAmtRequest']);
        $('#post_total_amount_request').html(formatDollar(post_total_amt_request, 2));
        var post_total_amt_approved = Number(pd_req_reimb[0]['PostTotalAmtApproved']);
        $('#post_total_amount_approved').html(formatDollar(post_total_amt_approved, 2));
        var post_total_amt_pending_funs = Number(pd_req_reimb[0]['PostTotalAmtPendingFunds']);
        $('#post_total_amount_pending_funds').html(formatDollar(post_total_amt_pending_funs, 2));
        var post_total_amt_not_approved = Number(pd_req_reimb[0]['PostTotalAmtNotApproved']);
        $('#post_total_amount_not_approved').html(formatDollar(post_total_amt_not_approved, 2));
    }
    
    setPDReqFundSrc();
    setPDReqFSComments();
    setSelectPDLimitSummary();
}

////////////////////////////////////////////////////////////////////////////////
function getHrsStepStatus() {
    var result = new Array();
    result = db_getPDReqHRProcess(PDRequestID);
    hrs_step_id = result[0]['HrsStepID'];
    hrs_status_id = result[0]['HrsStatusID'];
    
    var ar_step = new Array();
    ar_step = db_getPDReqStep(hrs_step_id);
    $('#cur_hrs_step').html(ar_step[0]['PDReqStep']);
    
    var ar_status = new Array();
    ar_status = db_getStatus(hrs_status_id);
    $('#cur_hrs_status').html(ar_status[0]['Status']);
    
    $('#cur_hrs_dtstamp').html(convertDBDateTimeToString(result[0]['HrsDTStamp']));
}

function getReimbStepStatus() {
    var result = new Array();
    result = db_getPDReqHRProcess(PDRequestID);
    reimb_step_id = result[0]['ReimbStepID'];
    reimb_status_id = result[0]['ReimbStatusID'];
    
    var ar_step = new Array();
    ar_step = db_getPDReqStep(reimb_step_id);
    $('#cur_reimb_step').html(ar_step[0]['PDReqStep']);
    
    var ar_status = new Array();
    ar_status = db_getStatus(reimb_status_id);
    $('#cur_reimb_status').html(ar_status[0]['Status']);
    
    $('#cur_reimb_dtstamp').html(convertDBDateTimeToString(result[0]['ReimbDTStamp']));
}

////////////////////////////////////////////////////////////////////////////////
function getSelectTransaction() {
    var transaction = new Array();
    transaction = db_getTransaction(PDRequestID);
    var str_comments = "";
    if (transaction.length > 0) {
        for (var i = 0; i < transaction.length; i++) {
            var dt_stamp = convertDBDateTimeToString(transaction[i]['DTStamp']);
            var login_name = transaction[i]['LoginName'];
            var note = transaction[i]['Note'];
            
            str_comments += login_name + " : " + dt_stamp + "<br>" + note.replace(/\n/g, "<br>") + "<br><br>";
        }
        $("#comments_history").append(str_comments);
    }
}

////////////////////////////////////////////////////////////////////////////////
function setPDReqFundSrc() {
    var result = new Array();
    result = db_getPDReqFundSrcPrintView(PDRequestID, PDReqReimbID);
    
    $("#active_fund_src_list").empty();
    var fs_list_html = "";
    for(var i = 0; i < result.length; i++) { 
        fs_list_html += getPrintFundingSrcListHTML(i, result[i]['FSSelected'], result[i]['FundSrcType']);
    }
    $("#active_fund_src_list").append(fs_list_html);
}

function getPrintFundingSrcListHTML(index, fs_selected, fund_src_type) {
    var str_html = "";
    var new_row_start = "<div class='row' style='padding-top: 5px;'>";
    var new_row_end = "</div>";
    
    if (fs_selected === "1") {
        str_html += "<div class='span1 text-center' style='padding-top: 2px;'><input type='checkbox' disabled checked></div>";
    }
    else {
        str_html += "<div class='span1 text-center' style='padding-top: 2px;'><input type='checkbox' disabled></div>";
    }
    str_html += "<div class='span3' style='padding-top: 5px;'>" + fund_src_type + "</div>";
    
    if (Number(index) % 3 === 0) {
        return new_row_start + str_html;
    }
    else if (Number(index) % 3 === 2) {
        return str_html + new_row_end;
    }
    else {
        return str_html;
    }
}

function setPDReqFSComments() {
    var fs_comments =  db_getPDReqFSComments(PDRequestID, PDReqReimbID);
    $('#fs_comments').html(fs_comments.replace(/\n/g, "<br>"));
}

////////////////////////////////////////////////////////////////////////////////
function setSelectPDLimitSummary() {
    getSelectPDLimit();
    calculateEncumberedAmt();
    
    available_amount = pd_limit - amount_convert;
    $('#sys_pd_limit_amount').html(formatDollar(pd_limit, 2));
    $('#pd_amount_convert').html(formatDollar(amount_convert, 2));
    $('#pd_available_amount').html(formatDollar(available_amount, 2));
    
    if (available_amount < 0) {
        $('#pd_available_amount').css('color', 'red');
    }
}

function calculateEncumberedAmt() {
    var result = new Array(new Array()); 
    result = db_getPDReqReimbByLoginFiscalYrs(LoginID, $('#fiscal').html());
    
    for(var i = 0; i < result.length; i++) {
        if (result[i]['PDReqStepID'] === "1") {
            if (result[i]['StatusID'] === "4") {
                amount_convert += Number(result[i]['PreTotalAmtApproved']);
            }
        }
        else {
            if (result[i]['StatusID'] === "4") {
                var dist_paid = Number(result[i]['DistPaid']);
                if (dist_paid === 0) {
                    amount_convert += Number(result[i]['PostTotalAmtApproved']);
                }
                else {
                    var amt_approved = Number(result[i]['PostTotalAmtApproved']);
                    var diff_amt = amt_approved - dist_paid;
                    if (diff_amt === 0) {
                        amount_convert += Number(result[i]['PostTotalAmtApproved']);
                    }
                    else {
                        amount_convert += amt_approved - diff_amt;
                    }
                }
            }
            else if (result[i]['StatusID'] === "2" || result[i]['StatusID'] === "5" || result[i]['StatusID'] === "7") {
                amount_convert += Number(result[i]['PreTotalAmtApproved']);
            }
        }
    }
}

function getSelectPDLimit() {
    var result = new Array(); 
    result = db_getLoginByID(LoginID);
    
    if (result.length === 1) {
        var login_etype = result[0]['LoginEType'];
        if (login_etype === "Full Time Faculty") {
            getSystemPDAmount("FullTimeLimit");
        }
        else if (login_etype === "Part Time Faculty") {
            getSystemPDAmount("PartTimeLimit");
        }
    }
}

function getSystemPDAmount(pd_system) {
    var pdsystem = new Array();
    pdsystem = db_getPDSystem();
    
    for(var i = 0; i < pdsystem.length; i++) {
        var sys_name = pdsystem[i][1];
        if (sys_name === pd_system) {
            pd_limit = Number(pdsystem[i][2]);
            break;
        }
    }
}

function getConvertAmount(PDRequestID, PDReqStepID, StatusID) {
    var result = new Array(new Array()); 
    result = db_getPDReqReimb(PDRequestID);
    
    if (result.length === 1) {
        if (PDReqStepID === "1") {
            if (StatusID === "4") {
                amount_convert += Number(result[0]['PreTotalAmtApproved']);
            }
        }
        else {
            if (StatusID === "4") {
                amount_convert += Number(result[0]['PostTotalAmtApproved']);
            }
            else if (StatusID === "2" || StatusID === "5" || StatusID === "7") {
                amount_convert += Number(result[0]['PreTotalAmtApproved']);
            }
        }
    }
}
////////////////////////////////////////////////////////////////////////////////
//function updateApproverStatus(status) {
//    db_updatePDRequestStatus(PDRequestID, status);
//    
//    switch (status) {
//        case "1":
//            if (PDReqStepID === "1") {
//                sendPreActivityCreatorBackToDraft();
//            }
//            else {
//                sendPostActivityCreatorBackToDraft();
//            }
//            break;
//        case "4":
//            if (PDReqStepID === "1") {
//                db_updatePDRequestPreAprDate(PDRequestID);
//                sendPreActivityCreatorApproved();                
//                copyToAvailPDRequest(PDRequestID);
//                if (ResourceTypeID === "1") {
//                    copyPDReqHoursPreToPost();
//                }
//                else if (ResourceTypeID === "2") {
//                    copyPDReqReimbPreToPost();
//                }
//                else {
//                    copyPDReqHoursPreToPost();
//                    copyPDReqReimbPreToPost();
//                }
//            }
//            else {
//                db_updatePDRequestPostAprDate(PDRequestID);
//                sendPostActivityCreatorApproved();
//            }
//            break;
//        case "5":
//            if (PDReqStepID === "1") {
//                sendPreActivityCreatorMoreInfo();
//            }
//            else {
//                sendPostActivityCreatorMoreInfo();
//            }
//            break;
//        case "6":
//            if (PDReqStepID === "1") {
//                sendPreActivityCreatorDenied();
//            }
//            else {
//                sendPostActivityCreatorDenied();
//            }
//            break;
//        case "7":
//            if (PDReqStepID === "1") {
//                db_updatePDRequestPrePendingAprDate(PDRequestID);
//                sendPreActivityCreatorPendingApproval();
//                copyToAvailPDRequest(PDRequestID);
//                if (ResourceTypeID === "1") {
//                    copyPDReqHoursPreToPost();
//                }
//                else if (ResourceTypeID === "2") {
//                    copyPDReqReimbPreToPost();
//                }
//                else {
//                    copyPDReqHoursPreToPost();
//                    copyPDReqReimbPreToPost();
//                }
//            }
//            else {
//                db_updatePDRequestPostPendingAprDate(PDRequestID);
//                sendPostActivityCreatorPendingApproval();
//            }
//            break;
//        default:
//            break;
//    }
//}

////////////////////////////////////////////////////////////////////////////////
//function addTransaction() {
//    var login_name = textReplaceApostrophe(sessionStorage.getItem('m_loginName'));
//    var comments = textReplaceApostrophe($('#user_comments').val());
//    if (comments !== "") {
//        db_insertTransaction(PDRequestID, login_name, comments);
//    }
//}
//
//function copyToAvailPDRequest(PDRequestID) {
//    var act_title = $('#activity_title').html();
//    var result = new Array();
//    result = db_getPDRequestByActTitle(act_title);
//    
//    if (result.length === 1) {
//        db_insertAvailPDRequest(PDRequestID);
//    }
//}
//
//function copyPDReqHoursPreToPost() {
//    var pre_input_hrs = Number($('#pre_input_hrs').html());
//    var pre_pres_hrs = Number($('#pre_presenter_hrs').html());
//    var pre_part_hrs = Number($('#pre_participant_hrs').html());
//    var pre_total_hrs = Number($('#pre_total_hrs').html());
//    
//    db_updatePDReqHoursPostActivity(PDRequestID, pre_input_hrs, pre_pres_hrs, pre_part_hrs, pre_total_hrs);
//}
//
//function copyPDReqReimbPreToPost() {
//    var pre_reg_fee = revertDollar($('#pre_reg_fee').html());
//    var pre_travel_cost = revertDollar($('#pre_travel_cost').html());
//    var pre_input_mileage = Number($('#pre_input_mileage').html());
//    var pre_mileage_cost = revertDollar($('#pre_mileage_cost').html());
//    var pre_lodging_cost = revertDollar($('#pre_lodging_cost').html());
//    var pre_input_breakfast = Number($('#pre_input_breakfast').html());
//    var pre_breakfast_cost = revertDollar($('#pre_breakfast_cost').html());
//    var pre_input_lunch = Number($('#pre_input_lunch').html());
//    var pre_lunch_cost = revertDollar($('#pre_lunch_cost').html());
//    var pre_input_dinner = Number($('#pre_input_dinner').html());
//    var pre_dinner_cost = revertDollar($('#pre_dinner_cost').html());
//    var other_cost_description = textReplaceApostrophe($('#other_cost_description').html());
//    var pre_other_cost = revertDollar($('#pre_other_cost').html());
//    var pre_sub_total = revertDollar($('#pre_sub_total').html());
//    var funding_other_source = textReplaceApostrophe($('#funding_other_source').html());
//    var fs_approved = $('input[name="rdo_fs_approval"]:checked').html();
//    var fs_comments = textReplaceApostrophe($('#fs_comments').html());
//    var pre_funding_other = revertDollar($('#pre_funding_other').html());
//    var pre_total_cost = revertDollar($('#pre_total_cost').html());
//    var pre_total_amount_request = revertDollar($('#pre_total_amount_request').html());
//    
//    db_updatePDReqReimbPostActivity(PDRequestID, pre_reg_fee, pre_travel_cost, pre_input_mileage, pre_mileage_cost, pre_lodging_cost, pre_input_breakfast, pre_breakfast_cost, 
//                                    pre_input_lunch, pre_lunch_cost, pre_input_dinner, pre_dinner_cost, other_cost_description, pre_other_cost, 
//                                    pre_sub_total, funding_other_source, fs_approved, fs_comments, pre_funding_other, pre_total_cost, pre_total_amount_request);
//}

////////////////////////////////////////////////////////////////////////////////
//function preCalculateTotalHrsNotApproved() {
//    var pre_total_hr = Number($('#pre_total_hrs').html());
//    var pre_app_hr = Number($('#pre_app_hrs_admin').val());
//    var pre_not_app_hr = pre_total_hr - pre_app_hr;
//    $('#pre_not_app_hrs').html(Number(pre_not_app_hr).toFixed(2));
//}
//
//function postCalculateTotalHrsNotApproved() {
//    var post_total_hr = Number($('#post_total_hrs').html());
//    var post_app_hr = Number($('#post_app_hrs_admin').val());
//    var post_not_app_hr = post_total_hr - post_app_hr;
//    $('#post_not_app_hrs').html(Number(post_not_app_hr).toFixed(2));
//}
//
//function preCalculateTotalAmountNotApproved() {
//    var pre_total_amt_request = Number(revertDollar($('#pre_total_amount_request').html()));
//    var pre_total_amt_approved = Number(revertDollar($('#pre_total_amount_approved_admin').val()));
//    var pre_total_amt_not_approved = pre_total_amt_request - pre_total_amt_approved;
//    $('#pre_total_amount_not_approved_user').html(formatDollar(pre_total_amt_not_approved, 2));
//    $('#pre_total_amount_not_approved_admin').val(formatDollar(pre_total_amt_not_approved, 2));
//}
//
//function postCalculateTotalAmountNotApproved() {
//    var post_total_amt_request = Number(revertDollar($('#post_total_amount_request').html()));
//    var post_total_amt_approved = Number(revertDollar($('#post_total_amount_approved_admin').val()));
//    var post_total_amt_not_approved = post_total_amt_request - post_total_amt_approved;
//    $('#post_total_amount_not_approved_user').html(formatDollar(post_total_amt_not_approved, 2));
//    $('#post_total_amount_not_approved_admin').val(formatDollar(post_total_amt_not_approved, 2));
//}

////////////////////////////////////////////////////////////////////////////////
function getTransactionHistory() {
    var result = new Array();
    result = db_getLogHistory(PDRequestID);
    
    var str_log = "";
    for (var i = 0; i < result.length; i++) {
        var dt_stamp = convertDBDateTimeToString(result[i]['DTStamp']);
        var login_name = result[i]['LoginName'];
        var note = result[i]['LogMsg'];

        str_log += login_name + " : " + dt_stamp + "<br>" + note.replace(/\n/g, "<br>") + "<br><br>";
    }
    $("#transaction_history").append(str_log);
}

////////////////////////////////////////////////////////////////////////////////
//function sendPreActivityCreatorApproved() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Pre-activity Professional Development Request has been Approved";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Approved</strong>, ";
//    message += "based on the merit of your Professional Development activity. ";
//    message += "Upon conclusion of this professional development activity, Please use the link below to complete the Post-activity fields and submit for final approval ";
//    message += "of funding and/or professional development credit hours.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPreActivityCreatorPendingApproval() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Pre-activity Professional Development Request has been Approved Pending Funds";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> is approved based on merit. ";
//    message += "However, currently all the Professional Development funds for the year have been encumbered; we are waiting to see if there will be any funds available. ";
//    message += "Your request will remain in the order received and you will be notified if funds become available. Please also investigate other funding sources.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPreActivityCreatorMoreInfo() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Pre-activity Professional Development Request need More Information";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> required additional information.<br>";
//    message += "Please use the link below to read the comments which explain what more information is required.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPreActivityCreatorBackToDraft() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Pre-activity Professional Development Request sent Back To Draft";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been set back to <strong>Draft</strong> status.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPreActivityCreatorDenied() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Pre-activity Professional Development Request has been Denied";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Denied</strong>.<br>";
//    message += "Please use the link below to read the comments which explain the reason for the denieal.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

////////////////////////////////////////////////////////////////////////////////
//function sendPostActivityCreatorApproved() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Post-activity Professional Development Request has been Approved";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Approved</strong>.<br><br>";
//    message += "Remember, all expenses must be paid up front. To apply for reimbursement of expenses for the approved activity:<br><br>";
//    message += "1) Complete the <a href='https://sharepoint.socccd.edu/bs/acct/Lists/Accounting%20Forms/AllItems.aspx?&&p_SortBehavior=0&p_Order=6900%2e00000000000&&PageFirstRow=1&&View=\\\\\\\\\\{4E4A84AB-B879-465B-855E-C104BD533B22\\\\\\\\\\}'>FS 12008 Employee Travel Reimbursement Claim</a> ";
//    message += "form for the appropriate travel dates. Include original receipts for any approved reimbursable expenses(s). ";
//    message += "Under the field \"Employee's Supervisor Signature\", your Dean does NOT need to sign this form; the Dean who oversee faculty professional development (Dean Cathleen Greiner) will sign this form.<br><br>";
//    message += "2) Submit the completed and signed reimbursement claim form, with original receipts, <strong>within 21 calendar days</strong> after the last day of the activity to Stefanie Alvarez (<a href='mailto:salvarez@ivc.edu'>salvarez@ivc.edu</a>, phone: 949-451-5709, Location: A 304). ";
//    message += "the requisition will expire 30 days from the return date and the funds will be reallocated if receipts are not received within the allotted time. ";
//    message += "In some circumstances, the expiration may be sooner.<br><br>";
//    
//    message += "Please use the link below to review the approved hours and funding at anytime.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPostActivityCreatorPendingApproval() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Post-activity Professional Development Request has been Approved Pending Funds";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> is approved based on merit. ";
//    message += "However, currently all the Professional Development funds for the year have been encumbered; we are waiting to see if there will be any funds available. ";
//    message += "Your request will remain in the order received and you will be notified if funds become available. Please also investigate other funding sources.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPostActivityCreatorMoreInfo() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Post-activity Professional Development Request need More Information";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> required additional information.<br>";
//    message += "Please use the link below to read the comments which explain what more information is required.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPostActivityCreatorBackToDraft() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Post-activity Professional Development Request sent back to Draft";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> rhas been set back to <strong>Draft</strong> status.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "Thank you.<br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

//function sendPostActivityCreatorDenied() {
//    var requestor_email = $('#email').html();
//    var requestor_name = $('#requestor').html();
//    var act_title = $('#activity_title').html();
//    
//    var subject = "Post-activity Professional Development Request has been Denied";
//    var message = "Dear " + requestor_name + ", <br><br>";
//    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Denied</strong>.<br>";
//    message += "Please use the link below to read the comments which explain the reason for the denieal.<br><br>";
//    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
//    message += "IVC Professional Development Officer<br>";
//    message += "flexofficer@ivc.edu";
//    
//    proc_sendEmail(requestor_email, requestor_name, subject, message);
//}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createPDRequestPDFfile() {
    pdf_setStatus();
    pdf_setUserInformation();
    pdf_setActivityDetail();
    pdf_setRequestDetail();
    pdf_setJustificationArea();
    pdf_setJestificationNarrative();
    pdf_setPostActivityReqInformation();
    
    var rtype = $('#resource_type').html();
    if (rtype === "Hours") {
        pdf_setRequestForHours();
    }
    else if (rtype === "Reimbursement") {
        pdf_setRequestForReimbursement();
    }
    else {
        pdf_setRequestForHours();
        pdf_setRequestForReimbursement();
    }

    pdf_setCommentsHistory();
    pdf_setTransactionHistory();
    
    var curBrowser = bowser.name;    
    if (curBrowser === "Internet Explorer") {
        pdf.save($('#activity_title').html() + '.pdf');
    }
    else {
        pdf.output('dataurl');
    }
}

function getPDFCenterOffset(pdf, page_width, text) {
    var textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var textOffset = (page_width - textWidth) / 2;
    
    return textOffset;
}

function pdf_setStatus() {
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Professional Development Request Status";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.40;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'ID:');
    pdf.setFontType("bold");
    pdf.text(margin_x + column_width/2, line_pos, $('#pdrequest_id').html());
    pdf.setFontType("normal");
    pdf.text(margin_x + (column_width * 2), line_pos, 'Step:');
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 3 - 0.75), line_pos, $('#current_step').html());
    pdf.setFontType("normal");
    pdf.text(margin_x + (column_width * 4), line_pos, 'Status:');   
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 5 - 0.75), line_pos, $('#current_status').html());
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Pre-activity submission date:');
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 1.5), line_pos, $('#pre_submission_date').html());
    pdf.setFontType("normal");
    pdf.text(margin_x + (column_width * 3), line_pos, 'Post-activity submission date:');
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 4.5), line_pos, $('#post_submission_date').html());
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Requisition Number:');
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 1.5), line_pos, $('#req_num').html());
}

function pdf_setUserInformation() {
    line_pos += 0.25;
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "User Information";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.setFontType("normal");
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.40;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Requestor:');
    pdf.text(margin_x + column_width, line_pos, $('#requestor').html());
    pdf.text(margin_x + (column_width * 3), line_pos, 'Date:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#current_date').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Email:');
    pdf.text(margin_x + column_width, line_pos, $('#email').html());
    pdf.text(margin_x + (column_width * 3), line_pos, 'Department:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#department').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Phone:');
    pdf.text(margin_x + column_width, line_pos, $('#phone').html());
    pdf.text(margin_x + (column_width * 3), line_pos, 'School:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#school').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Employee Type:');
    pdf.text(margin_x + column_width, line_pos, $('#phone').html()); 
    pdf.text(margin_x + (column_width * 3), line_pos, 'Fiscal Year:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#fiscal').html());
}

function pdf_setActivityDetail() {
    line_pos += 0.25;
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Activity Detail";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.40;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Activity Title:');
    text = $('#activity_title').html().replace(/<br>/g, '\n').trim();
    var ar_act_title = pdf.splitTextToSize(text, 2.25);
    var tmp_pos = line_pos;
    var tmp_line_count = 0.00;
    for (var i = 0; i < ar_act_title.length; i++) {
        if (line_pos >= 10) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x + column_width, tmp_pos, ar_act_title[i]);
        }
        else {
            tmp_pos += 0.15;
            tmp_line_count += 0.15;
            pdf.text(margin_x + column_width, tmp_pos, ar_act_title[i]);
        }
    }
    
    pdf.text(margin_x + (column_width * 3), line_pos, 'Activity Organizer:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#activity_organizer').html());
    
    line_pos += 0.25 + tmp_line_count;
    pdf.text(margin_x, line_pos, 'Activity City:');
    pdf.text(margin_x + column_width, line_pos, $('#activity_city').html());
    pdf.text(margin_x + (column_width * 3), line_pos, 'Activity State:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#activity_state').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Activity Description:');
    text = $('#activity_description').html().replace(/<br>/g, '\n').trim();
    var ar_act_descrip = pdf.splitTextToSize(text, 6.25);
    for (var i = 0; i < ar_act_descrip.length; i++) {
        if (line_pos >= 10) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x + column_width, line_pos, ar_act_descrip[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x + column_width, line_pos, ar_act_descrip[i]);
        }
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Activity Link:');
    text = $('#activity_link').html().replace(/<br>/g, '\n').trim();
    var ar_act_link = pdf.splitTextToSize(text, 6.25);
    for (var i = 0; i < ar_act_link.length; i++) {
        if (line_pos >= 10) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x + column_width, line_pos, ar_act_link[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x + column_width, line_pos, ar_act_link[i]);
        }
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Start Date:');
    pdf.text(margin_x + column_width, line_pos, $('#start_date').html());
    pdf.text(margin_x + (column_width * 3), line_pos, 'End Date:');
    pdf.text(margin_x + (column_width * 4), line_pos, $('#end_date').html());
}

function pdf_setRequestDetail() {
    if (line_pos >= 9.4) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }
   
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Request Details";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.40;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Resource Type:');
    pdf.text(margin_x + column_width, line_pos, $('#resource_type').html());
}

function pdf_setJustificationArea() {
    if (line_pos >= 6.85) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }
    
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Justification Area(s)";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    text = "Participation in the conference will contribute to your staff development in which of the following area?";
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("bold");
    text = "Description";
    x_offset = getPDFCenterOffset(pdf, page_x - column_width, text);
    pdf.text(x_offset, line_pos, text);
    text = "Check all that apply";
    pdf.text(margin_x + (column_width * 5), line_pos, text);
    
    line_pos += 0.05;
    pdf.setFontType("normal");
    pdf.setLineWidth(0.01);
    pdf.line(margin_x, line_pos, (column_width * 5) + 0.25, line_pos);
    pdf.line(margin_x + (column_width * 5), line_pos, 8, line_pos);
    
    line_pos += 0.15;
    pdf.text(margin_x, line_pos, 'Improvement of teaching.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_1 = ($('#just_area_1').is(':checked') ? true : false);
    if (just_area_1) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Maintenance of current academic, technical knowledge and skills.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_2 = ($('#just_area_2').is(':checked') ? true : false);
    if (just_area_2) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'In-service training for vocational education and employment preparation program.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_3 = ($('#just_area_3').is(':checked') ? true : false);
    if (just_area_3) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Retraining to meet changing institutional needs.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_4 = ($('#just_area_4').is(':checked') ? true : false);
    if (just_area_4) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Intersegmental exchange programs.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_5 = ($('#just_area_5').is(':checked') ? true : false);
    if (just_area_5) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Development of innovations in instructional and administrative techniques and program effectiveness.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_6 = ($('#just_area_6').is(':checked') ? true : false);
    if (just_area_6) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Computer and technology proficiency programs.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_7 = ($('#just_area_7').is(':checked') ? true : false);
    if (just_area_7) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Courses and training implementing affirmative action and upward mobility programs.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_8 = ($('#just_area_8').is(':checked') ? true : false);
    if (just_area_8) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Other activities determined to be related to educational and professional development.');
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    var just_area_9 = ($('#just_area_9').is(':checked') ? true : false);
    if (just_area_9) {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 5) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
}

function pdf_setJestificationNarrative() {
    if (line_pos >= 9.4) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }
    
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Justification Narrative";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("bold");
    pdf.setTextColor(0, 0, 0);
    text = "Describe the proposed activity/conference and how your participation will contribute to your professional development.";
    pdf.text(margin_x, line_pos, text);
    
    line_pos += 0.15;
    pdf.setFontType("normal");
    text = $('#just_narrative_descrip').html().replace(/<br>/g, '\n').trim();
    var ar_just_narr = pdf.splitTextToSize(text, 7.5);
    for (var i = 0; i < ar_just_narr.length; i++) {
        if (line_pos >= 9.4) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_just_narr[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_just_narr[i]);
        }
    }
}

function pdf_setPostActivityReqInformation() {
    if (line_pos >= 9.0) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }
    
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Post Activity Required Information";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("bold");
    pdf.setTextColor(0, 0, 0);
    text = "How did this professional development activity benefit you, your students and/or Irvine Valley College (attach additional sheets if necessary).";
    var ar_pari_header = pdf.splitTextToSize(text, 7.5);
    for (var i = 0; i < ar_pari_header.length; i++) {
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_pari_header[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_pari_header[i]);
        }
    }
    
    line_pos += 0.15;
    pdf.setFontType("normal");
    text = $('#post_activity_info_1_descrip').html().replace(/<br>/g, '\n').trim();
    var ar_pai_1 = pdf.splitTextToSize(text, 7.5);
    for (var i = 0; i < ar_pai_1.length; i++) {
        if (line_pos >= 9.4) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_pai_1[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_pai_1[i]);
        }
    }
    
    line_pos += 0.25;
    pdf.setFontType("bold");
    pdf.text(margin_x, line_pos, 'What were the end products or materials from this activity?.');
    
    line_pos += 0.15;
    pdf.setFontType("normal");
    text = $('#post_activity_info_2_descrip').html().replace(/<br>/g, '\n').trim();
    var ar_pai_2 = pdf.splitTextToSize(text, 7.5);
    for (var i = 0; i < ar_pai_2.length; i++) {
        if (line_pos >= 9.4) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_pai_2[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_pai_2[i]);
        }
    }
}

function pdf_setRequestForHours() {
    if (line_pos >= 8.0) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }
    
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Request for Hours";
    pdf.setFontType("normal");
    pdf.setTextColor(255, 255, 255);
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("bold");
    pdf.setTextColor(0, 0, 0);
    text = "Description";
    x_offset = getPDFCenterOffset(pdf, column_width * 3, text);
    pdf.text(margin_x + x_offset, line_pos, text);
    text = "Pre Activity";
    x_offset = getPDFCenterOffset(pdf, column_width * 1.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    text = "Post Activity";
    x_offset = getPDFCenterOffset(pdf, column_width * 1.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    
    line_pos += 0.05;
    pdf.setFontType("normal");
    pdf.setLineWidth(0.01);
    pdf.line(margin_x, line_pos, (column_width * 3) + margin_x - 0.125, line_pos);
    pdf.line(margin_x + (column_width * 3) + 0.125, line_pos, (column_width * 4.5) + margin_x - 0.125, line_pos);
    pdf.line(margin_x + (column_width * 4.5) + 0.125, line_pos, 8, line_pos);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Flex (Professional Development) Presenter Hours:');
    text = $('#pre_input_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, "X 3");
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, 'X 3');
    text = $('#pre_presenter_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4) + x_offset, line_pos, text);
    text = $('#post_input_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, "X 3");
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, 'X 3');
    text = $('#post_presenter_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 5.5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Flex (Professional Development) Participant Hours:');
    text = $('#pre_participant_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4) + x_offset, line_pos, text);
    text = $('#pre_participant_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 5.5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setLineWidth(0.02);
    pdf.line(margin_x, line_pos, 8, line_pos);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Total Hours Request:');
    pdf.setFontType("bold");
    text = $('#pre_total_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4) + x_offset, line_pos, text);
    text = $('#post_total_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 5.5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Total Hours Approved:');
    pdf.setFontType("bold");
    text = $('#pre_app_hrs_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4) + x_offset, line_pos, text);
    text = $('#post_app_hrs_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 5.5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Total Hours Not Approved:');
    pdf.setFontType("bold");
    text = $('#pre_not_app_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4) + x_offset, line_pos, text);
    text = $('#post_not_app_hrs').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 5.5) + x_offset, line_pos, text);
}

function pdf_setRequestForReimbursement() {
    if (line_pos >= 5.0) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }

    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Request for Reimbursement";
    pdf.setFontType("normal");
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("bold");
    pdf.setTextColor(0, 0, 0);
    text = "Description";
    x_offset = getPDFCenterOffset(pdf, column_width * 3, text);
    pdf.text(margin_x + x_offset, line_pos, text);
    text = "Pre Activity";
    x_offset = getPDFCenterOffset(pdf, column_width * 1.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    text = "Post Activity";
    x_offset = getPDFCenterOffset(pdf, column_width * 1.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    
    line_pos += 0.05;
    pdf.setFontType("normal");
    pdf.setLineWidth(0.01);
    pdf.line(margin_x, line_pos, (column_width * 3) + margin_x - 0.125, line_pos);
    pdf.line(margin_x + (column_width * 3) + 0.125, line_pos, (column_width * 4.5) + margin_x - 0.125, line_pos);
    pdf.line(margin_x + (column_width * 4.5) + 0.125, line_pos, 8, line_pos);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Registration Fees:');
    text = $('#pre_reg_fee').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_reg_fee').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Travel Costs (Air, Train, Bus etc):');
    text = $('#pre_travel_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_travel_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, $('#mileage_text').html());
    text = $('#pre_input_mileage').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    text = $('#pre_mileage_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_input_mileage').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    text = $('#post_travel_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Lodging Cost Total:');
    text = $('#pre_lodging_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_lodging_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, $('#breakfast_text').html());
    text = $('#pre_input_breakfast').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    text = $('#pre_breakfast_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_input_breakfast').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    text = $('#post_breakfast_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, $('#lunch_text').html());
    text = $('#pre_input_lunch').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    text = $('#pre_lunch_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_input_lunch').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    text = $('#post_lunch_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, $('#dinner_text').html());
    text = $('#pre_input_dinner').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 3) + x_offset, line_pos, text);
    text = $('#pre_dinner_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_input_dinner').html();
    x_offset = getPDFCenterOffset(pdf, column_width * 0.5, text);
    pdf.text(margin_x + (column_width * 4.5) + x_offset, line_pos, text);
    text = $('#post_dinner_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Other Cost Total:');
    pdf.text(margin_x + (column_width * 1.5), line_pos, $('#other_cost_description').html());
    text = $('#pre_lodging_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_lodging_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Sub-Total:');
    pdf.setFontType("bold");
    text = $('#pre_sub_total').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_sub_total').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Funding from Other Sources:');
    pdf.text(margin_x + (column_width * 1.5), line_pos, $('#funding_other_source').html());
    text = $('#pre_funding_other').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_funding_other').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Is funding from Other Sources approved?');
    if ($('#fs_approved_1').is(':checked')) {
        pdf.circle(margin_x + (column_width * 2) + 0.1, line_pos - 0.05, 0.05, 'F');
        pdf.circle(margin_x + (column_width * 2.5) + 0.1, line_pos - 0.05, 0.05);
    }
    else {
        pdf.circle(margin_x + (column_width * 2) + 0.1, line_pos - 0.05, 0.05);
        pdf.circle(margin_x + (column_width * 2.5) + 0.1, line_pos - 0.05, 0.05, 'F');
    }
    pdf.text(margin_x + (column_width * 2) + 0.2 , line_pos, 'No');
    pdf.text(margin_x + (column_width * 2.5) + 0.2 , line_pos, 'Yes');   
    pdf.text(margin_x + (column_width * 3), line_pos, 'Comments:');
    pdf.text(margin_x + (column_width * 3.5), line_pos, $('#fs_comments').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Total Costs:');
    pdf.setFontType("bold");
    text = $('#pre_total_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_total_cost').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.setLineWidth(0.02);
    pdf.line(margin_x, line_pos, 8, line_pos);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Total Amount Request:');
    pdf.setFontType("bold");
    text = $('#pre_total_amount_request').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_total_amount_request').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Total Amount Approved:');
    pdf.setFontType("bold");
    text = $('#pre_total_amount_approved_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_total_amount_approved_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Total Amount Pending Funds:');
    pdf.setFontType("bold");
    text = $('#pre_total_amount_pending_funds_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_total_amount_pending_funds_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Total Amount Not Approved:');
    pdf.setFontType("bold");
    text = $('#pre_total_amount_not_approved_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 3.5) + x_offset, line_pos, text);
    text = $('#post_total_amount_not_approved_user').html();
    x_offset = getPDFCenterOffset(pdf, column_width, text);
    pdf.text(margin_x + (column_width * 5) + x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'PD Limit:');
    pdf.text(margin_x + column_width, line_pos, $('#sys_pd_limit_amount').html());
    pdf.text(margin_x + (column_width * 2), line_pos, 'PD Encumbered:');
    pdf.text(margin_x + (column_width * 3), line_pos, $('#pd_amount_convert').html());
    pdf.text(margin_x + (column_width * 4), line_pos, 'PD Available:');
    pdf.text(margin_x + (column_width * 5), line_pos, $('#pd_available_amount').html());
}

function pdf_setCommentsHistory() {
    if (line_pos >= 9.5) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }

    pdf.setFontType("normal");
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Comments History";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    text = $('#comments_history').html().replace(/<br>/g, '\n').trim(); 
    var ar_comments = pdf.splitTextToSize(text, 7.5);
    for (var i = 0; i < ar_comments.length; i++) {
        if (line_pos >= 10) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_comments[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_comments[i]);
        }
    }
}

function pdf_setTransactionHistory() {
    if (line_pos >= 9.5) {
        pdf.addPage();
        line_pos = margin_y;
    }
    else {
        line_pos += 0.25;
    }

    pdf.setFontType("normal");
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Transaction History";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    text = $('#transaction_history').html().replace(/<br>/g, '\n').trim(); 
    var ar_comments = pdf.splitTextToSize(text, 7.5);
    for (var i = 0; i < ar_comments.length; i++) {
        if (line_pos >= 10) {
            pdf.addPage();
            line_pos = margin_y;
        }
        
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_comments[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_comments[i]);
        }
    }
}
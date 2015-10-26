var pd_limit = 0.0;
var amount_convert = 0.0;
var available_amount = 0.0;
var fiscal_yrs = "";

var hrs_step_id = null;
var hrs_status_id = null;
var reimb_step_id = null;
var reimb_status_id = null;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) { 
        if (sessionStorage.getItem('m_PDRequestID') !== null) {
            PDRequestID = sessionStorage.getItem('m_PDRequestID');
            if (sessionStorage.getItem('m_PDRequestStep') === "Post-activity") {
                PDReqStepID = "2";
            }
            
            setDefaultSetting();
            getSelectPDRequest();
            getPDSystem();
            getSelectResourceType();
            getSelectPDReqUserInfo();
            getSelectJustArea();
            getSelectNarrative();
            getSelectPAReqInfo1();
            getSelectPAReqInfo2();
            getTransactionHistory();
        }
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
    
    $('#nav_admin').click(function() {
        window.open('administrator.html', '_self');
    });
    
    $('#nav_print').click(function() {
        window.print();
    });
    
    $('#pre_app_hrs').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);
        $(this).val(input_val);
        preCalculateTotalHrsNotApproved();
    });
    
    $('#post_app_hrs').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);         
        $(this).val(input_val);
        postCalculateTotalHrsNotApproved();
    });
    
    $('#pre_total_amount_approved').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));       
        $(this).val(formatDollar(input_val, 2));
        preCalculateTotalAmountNotApproved();
    });
    
    $('#pre_total_amount_pending_funds').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));        
        $(this).val(formatDollar(input_val, 2));
    });
    
    $('#pre_total_amount_not_approved').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));        
        $(this).val(formatDollar(input_val, 2));
    });
    
    $('#post_total_amount_approved').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        postCalculateTotalAmountNotApproved();
    });
    
    $('#post_total_amount_pending_funds').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));        
        $(this).val(formatDollar(input_val, 2));
    });
    
    $('#post_total_amount_not_approved').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    $('#btn_admin_update').click(function() {        
        updatePDRequestApprovalFields();
        
        if (ResourceTypeID === "1") {
            var pre_approved_hrs = $('#pre_app_hrs').val();
            var pre_not_approved_hrs = $('#pre_not_app_hrs').html();
            var post_approved_hrs = $('#post_app_hrs').val();
            var post_not_approved_hrs = $('#post_not_app_hrs').html();
            var note = "\nPre-activity total hours approved: " + pre_approved_hrs;
            note += "\nPre-activity total hours not approved: " + pre_not_approved_hrs;
            note += "\nPost-activity total hours approved: " + post_approved_hrs;
            note += "\nPost-activity total hours not approved: " + post_not_approved_hrs;
            db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approved hours " + note);
        }
        else if (ResourceTypeID === "2") {
            var pre_approved_amt = $('#pre_total_amount_approved').val();
            var pre_pending_amt= $('#pre_total_amount_pending_funds').val();
            var pre_not_approved_amt = $('#pre_total_amount_not_approved').val();
            var post_approved_amt = $('#post_total_amount_approved').val();
            var post_pending_amt= $('#post_total_amount_pending_funds').val();
            var post_not_approved_amt = $('#post_total_amount_not_approved').val();
            var note = "\nPre-activity total amount approved: " + pre_approved_amt;
            note += "\nPre-activity total amount pending funds: " + pre_pending_amt;
            note += "\nPre-activity total amount not approved: " + pre_not_approved_amt;
            note += "\nPost-activity total amount approved: " + post_approved_amt;
            note += "\nPost-activity total amount pending funds: " + post_pending_amt;
            note += "\nPost-activity total amount not approved: " + post_not_approved_amt;
            db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approved amount " + note);
        }
        else {
            var pre_approved_hrs = $('#pre_app_hrs').val();
            var pre_not_approved_hrs = $('#pre_not_app_hrs').html();
            var post_approved_hrs = $('#post_app_hrs').val();
            var post_not_approved_hrs = $('#post_not_app_hrs').html();
            var pre_approved_amt = $('#pre_total_amount_approved').val();
            var pre_pending_amt= $('#pre_total_amount_pending_funds').val();
            var pre_not_approved_amt = $('#pre_total_amount_not_approved').val();
            var post_approved_amt = $('#post_total_amount_approved').val();
            var post_pending_amt= $('#post_total_amount_pending_funds').val();
            var post_not_approved_amt = $('#post_total_amount_not_approved').val();
            var note = "\nPre-activity total hours approved: " + pre_approved_hrs;
            note += "\nPre-activity total hours not approved: " + pre_not_approved_hrs;
            note += "\nPost-activity total hours approved: " + post_approved_hrs;
            note += "\nPost-activity total hours not approved: " + post_not_approved_hrs;
            note += "\nPre-activity total amount approved: " + pre_approved_amt;
            note += "\nPre-activity total amount pending funds: " + pre_pending_amt;
            note += "\nPre-activity total amount not approved: " + pre_not_approved_amt;
            note += "\nPost-activity total amount approved: " + post_approved_amt;
            note += "\nPost-activity total amount pending funds: " + post_pending_amt;
            note += "\nPost-activity total amount not approved: " + post_not_approved_amt;
            db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "update approved hours and amount "+ note);
        }

        sessionStorage.removeItem("m_PDRequestID");
        window.open('administrator.html', '_self');
    });

});

////////////////////////////////////////////////////////////////////////////////
function setDefaultSetting() {
    $('#request_hours').hide();
    $('#request_reimbursement').hide();
    $('#comments_block').hide();
}

////////////////////////////////////////////////////////////////////////////////
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
    pdsystem = db_getPDSystem(fiscal_yrs);
    
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
    fiscal_yrs = pd_request[0]['FiscalYrs'];
    
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

////////////////////////////////////////////////////////////////////////////////
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
        $('#request_hours').show();
        getSelectPDReqHours();
    }
    else if (ResourceTypeID === "2") {
        getReimbStepStatus();
        $('#request_reimbursement').show();
        getSelectPDReqReimb();
    }
    else {
        getHrsStepStatus();
        getReimbStepStatus();
        $('#request_hours').show();
        $('#request_reimbursement').show();
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
        $('#pre_app_hrs').val(Number(pd_req_hours[0]['PreAppHr']).toFixed(2));
        $('#pre_not_app_hrs').html(Number(pd_req_hours[0]['PreNotAppHr']).toFixed(2));

        $('#post_input_hrs').html(Number(pd_req_hours[0]['PostInputHr']).toFixed(2));
        $('#post_presenter_hrs').html(Number(pd_req_hours[0]['PostPresHr']).toFixed(2));
        $('#post_participant_hrs').html(Number(pd_req_hours[0]['PostPartHr']).toFixed(2));
        $('#post_total_hrs').html(Number(pd_req_hours[0]['PostTotalHr']).toFixed(2));
        $('#post_app_hrs').val(Number(pd_req_hours[0]['PostAppHr']).toFixed(2));
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
        $('#funding_other_source').html(pd_req_reimb[0]['FundingSource']);
        var fs_approved = pd_req_reimb[0]['FSApproved'];
        if (fs_approved === "1") {
            $('#fs_approved_2').prop("checked", true);
        }
        else {
            $('#fs_approved_1').prop("checked", true);
        }
        $('#fs_comments').html(pd_req_reimb[0]['FSComments']);
        var pre_fun_cost = Number(pd_req_reimb[0]['PreFunCost']);
        $('#pre_funding_other').html(formatDollar(pre_fun_cost, 2));
        var pre_total_cost = Number(pd_req_reimb[0]['PreTotalCost']);
        $('#pre_total_cost').html(formatDollar(pre_total_cost, 2));
        var pre_total_amt_request = Number(pd_req_reimb[0]['PreTotalAmtRequest']);
        $('#pre_total_amount_request').html(formatDollar(pre_total_amt_request, 2));
        var pre_total_amt_approved = Number(pd_req_reimb[0]['PreTotalAmtApproved']);
        $('#pre_total_amount_approved').val(formatDollar(pre_total_amt_approved, 2));
        var pre_total_amt_pending_funs = Number(pd_req_reimb[0]['PreTotalAmtPendingFunds']);
        $('#pre_total_amount_pending_funds').val(formatDollar(pre_total_amt_pending_funs, 2));
        var pre_total_amt_not_approved = Number(pd_req_reimb[0]['PreTotalAmtNotApproved']);
        $('#pre_total_amount_not_approved').val(formatDollar(pre_total_amt_not_approved, 2));
            
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
        $('#post_total_amount_approved').val(formatDollar(post_total_amt_approved, 2));
        var post_total_amt_pending_funs = Number(pd_req_reimb[0]['PostTotalAmtPendingFunds']);
        $('#post_total_amount_pending_funds').val(formatDollar(post_total_amt_pending_funs, 2));
        var post_total_amt_not_approved = Number(pd_req_reimb[0]['PostTotalAmtNotApproved']);
        $('#post_total_amount_not_approved').val(formatDollar(post_total_amt_not_approved, 2));
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
    var result = new Array(); 
    result = db_getPDReqReimbByLoginFiscalYrs(LoginID, $('#fiscal').html());
    
    for(var i = 0; i < result.length; i++) {
        if (result[i]['ReimbStepID'] === "1") {
            if (result[i]['ReimbStatusID'] === "4") {
                amount_convert += Number(result[i]['PreTotalAmtApproved']);
            }
        }
        else {
            if (result[i]['ReimbStatusID'] === "4") {
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
            else if (result[i]['ReimbStatusID'] === "2" || result[i]['ReimbStatusID'] === "5" || result[i]['ReimbStatusID'] === "7") {
                amount_convert += Number(result[i]['PostTotalAmtApproved']);
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
    pdsystem = db_getPDSystem(fiscal_yrs);
    
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
function updatePDRequestApprovalFields() {
    if (ResourceTypeID === "1") {
        updatePDRequestHoursPreActivityApprovedHrs();
        updatePDRequestHoursPostActivityApprovedHrs();
    }
    else if (ResourceTypeID === "2") {
        updatePDRequestReimbPreActivityApprovedAmount();
        updatePDRequestReimbPostActivityApprovedAmount();
    }
    else {
        updatePDRequestHoursPreActivityApprovedHrs();
        updatePDRequestHoursPostActivityApprovedHrs();
        
        updatePDRequestReimbPreActivityApprovedAmount();
        updatePDRequestReimbPostActivityApprovedAmount();
    }
}

function updatePDRequestHoursPreActivityApprovedHrs() {
    var pre_app_hrs = Number($('#pre_app_hrs').val());
    var pre_not_app_hrs = Number($('#pre_not_app_hrs').html());
    db_updatePDReqHoursPreApprovedHrs(PDRequestID, pre_app_hrs, pre_not_app_hrs);
}

function updatePDRequestHoursPostActivityApprovedHrs() {
    var post_app_hrs = Number($('#post_app_hrs').val());
    var post_not_app_hrs = Number($('#post_not_app_hrs').html());
    db_updatePDReqHoursPostApprovedHrs(PDRequestID, post_app_hrs, post_not_app_hrs);
}

function updatePDRequestReimbPreActivityApprovedAmount() {
    var pre_total_amount_approved = revertDollar($('#pre_total_amount_approved').val());
    var pre_total_amount_not_approved = revertDollar($('#pre_total_amount_not_approved').val());
    var pre_total_amount_pending_funds = revertDollar($('#pre_total_amount_pending_funds').val());
    db_updatePDReqReimbPreActivityApprovedAmount(PDRequestID, pre_total_amount_approved, pre_total_amount_not_approved, pre_total_amount_pending_funds);
}

function updatePDRequestReimbPostActivityApprovedAmount() {
    var post_total_amount_approved = revertDollar($('#post_total_amount_approved').val());
    var post_total_amount_not_approved = revertDollar($('#post_total_amount_not_approved').val());
    var post_total_amount_pending_funds = revertDollar($('#post_total_amount_pending_funds').val());
    db_updatePDReqReimbPostActivityApprovedAmount(PDRequestID, post_total_amount_approved, post_total_amount_not_approved, post_total_amount_pending_funds);
}

////////////////////////////////////////////////////////////////////////////////
function preCalculateTotalHrsNotApproved() {
    var pre_total_hr = Number($('#pre_total_hrs').html());
    var pre_app_hr = Number($('#pre_app_hrs').val());
    var pre_not_app_hr = pre_total_hr - pre_app_hr;
    $('#pre_not_app_hrs').html(Number(pre_not_app_hr).toFixed(2));
}

function postCalculateTotalHrsNotApproved() {
    var post_total_hr = Number($('#post_total_hrs').html());
    var post_app_hr = Number($('#post_app_hrs').val());
    var post_not_app_hr = post_total_hr - post_app_hr;
    $('#post_not_app_hrs').html(Number(post_not_app_hr).toFixed(2));
}

function preCalculateTotalAmountNotApproved() {
    var pre_total_amt_request = Number(revertDollar($('#pre_total_amount_request').html()));
    var pre_total_amt_approved = Number(revertDollar($('#pre_total_amount_approved').val()));
    var pre_total_amt_not_approved = pre_total_amt_request - pre_total_amt_approved;
    $('#pre_total_amount_not_approved').val(formatDollar(pre_total_amt_not_approved, 2));
}

function postCalculateTotalAmountNotApproved() {
    var post_total_amt_request = Number(revertDollar($('#post_total_amount_request').html()));
    var post_total_amt_approved = Number(revertDollar($('#post_total_amount_approved').val()));
    var post_total_amt_not_approved = post_total_amt_request - post_total_amt_approved;
    $('#post_total_amount_not_approved').val(formatDollar(post_total_amt_not_approved, 2));
}

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
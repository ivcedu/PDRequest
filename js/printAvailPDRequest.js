////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) { 
        if (sessionStorage.getItem('m_PDRequestID') !== null) {
            setDefaultSetting();
            getPDSystem();

            PDRequestID = sessionStorage.getItem('m_PDRequestID');
            getSelectPDRequest();
            getSelectJustArea();
            getSelectNarrative();
            getSelectPAReqInfo1();
            getSelectPAReqInfo2();
            getSelectResourceType();
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {       
    $('#close').click(function() {
        sessionStorage.removeItem("m_PDRequestID");
        window.close();
    });
    
    $('#print').click(function() {
        window.print();
    });
});

////////////////////////////////////////////////////////////////////////////////
function setDefaultSetting() {
    $('#request_hours').hide();
    $('#request_reimbursement').hide();
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
    
    if (pd_request.length === 1) {
        $('#print_title').html(pd_request[0]['ActTitle']);
        
        $('#activity_title').html(pd_request[0]['ActTitle']);
        $('#activity_organizer').html(pd_request[0]['ActOrganizer']);
        $('#activity_city').html(pd_request[0]['ActCity']);
        $('#activity_state').html(getActStateByID(pd_request[0]['ActStateID']));
        $('#activity_description').html(pd_request[0]['ActDescrip'].replace(/\n/g, "</br>"));
        $('#activity_link').html(pd_request[0]['ActLink']);
        $('#start_date').html(pd_request[0]['StartDate']);
        $('#end_date').html(pd_request[0]['EndDate']);
        $('#current_date').html(pd_request[0]['CreateDate']);
        
        LoginID = pd_request[0]['LoginID'];
        ResourceTypeID = pd_request[0]['ResourceTypeID'];
        StatusID = pd_request[0]['StatusID'];
        PDReqStepID = pd_request[0]['PDReqStepID'];
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
        $('#just_narrative_descrip').html(narrative[0]['Narrative'].replace(/\n/g, "</br>"));
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
        $('#post_activity_info_1_descrip').html(pa_req_info_1[0]['PAReqInfo1'].replace(/\n/g, "</br>"));
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
        $('#post_activity_info_2_descrip').html(pa_req_info_2[0]['PAReqInfo2'].replace(/\n/g, "</br>"));
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
    var resource_type = new Array();
    resource_type = db_getResourceType();
    
    for(var i = 0; i < resource_type.length; i++) { 
        var ID = resource_type[i][0];
        if (ID === ResourceTypeID) {
            $('#resource_type').html(resource_type[i][1]);
            if (ResourceTypeID === "1") {
                $('#request_hours').show();
                getSelectPDReqHours();
            }
            else if (ResourceTypeID === "2") {
                $('#request_reimbursement').show();
                getSelectPDReqReimb();
            }
            else {
                $('#request_hours').show();
                $('#request_reimbursement').show();
                getSelectPDReqHours();
                getSelectPDReqReimb();
            }
            break;
        }
    }
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
        var pre_fun_cost = Number(pd_req_reimb[0]['PreFunCost']);
        $('#pre_funding_other').html(formatDollar(pre_fun_cost, 2));
        var pre_total_cost = Number(pd_req_reimb[0]['PreTotalCost']);
        $('#pre_total_cost').html(formatDollar(pre_total_cost, 2));
        var pre_total_amt_request = Number(pd_req_reimb[0]['PreTotalAmtRequest']);
        $('#pre_total_amount_request').html(formatDollar(pre_total_amt_request, 2));
        var pre_total_amt_approved = Number(pd_req_reimb[0]['PreTotalAmtApproved']);
        $('#pre_total_amount_approved_user').html(formatDollar(pre_total_amt_approved, 2));
        $('#pre_total_amount_approved_admin').val(formatDollar(pre_total_amt_approved, 2));
    }
}

function getSelectTransaction() {
    var transaction = new Array();
    transaction = db_getTransaction(PDRequestID);
    var str_comments = "";
    if (transaction.length > 0) {
        for (var i = 0; i < transaction.length; i++) {
            var dt_stamp = convertDBDateTimeToString(transaction[i]['DTStamp']);
            var login_name = transaction[i]['LoginName'];
            var note = transaction[i]['Note'];
            
            str_comments += login_name + " : " + dt_stamp + "<br>" + note.replace(/\n/g, "</br>") + "<br><br>";
        }
        $("#comments_history").append(str_comments);
    }
}

////////////////////////////////////////////////////////////////////////////////
function updatePDRequestReimbPreActivityApprovedAmount() {
    if ($('#pre_total_amount_approved_admin').val() !== "") {
        var pre_total_amount_approved_admin = revertDollar($('#pre_total_amount_approved_admin').val());
        db_updatePDReqReimbPreActivityApprovedAmount(PDRequestID, pre_total_amount_approved_admin);
    }
}

function updatePDRequestReimbPostActivityApprovedAmount() {
    if ($('#post_total_amount_approved_admin').val() !== "") {
        var post_total_amount_approved_admin = revertDollar($('#post_total_amount_approved_admin').val());
        db_updatePDReqReimbPostActivityApprovedAmount(PDRequestID, post_total_amount_approved_admin);
    }
}

function updateApproverStatus(status) {
    switch (status) {
        case "4":
            db_updatePDRequestStatus(PDRequestID, status);
            if (PDReqStepID === "1") {
                db_updatePDRequestPreAprDate(PDRequestID);
                sendPreActivityCreatorApproved();
                copyToAvailPDRequest(PDRequestID);
            }
            else {
                db_updatePDRequestPostAprDate(PDRequestID);
                sendPostActivityCreatorApproved();
            }
            break;
        case "5":
            db_updatePDRequestStatus(PDRequestID, status);
            if (PDReqStepID === "1") {
                sendPreActivityCreatorMoreInfo();
            }
            else {
                sendPostActivityCreatorMoreInfo();
            }
            break;
        case "6":
            db_updatePDRequestStatus(PDRequestID, status);
            if (PDReqStepID === "1") {
                sendPreActivityCreatorDenied();
            }
            else {
                sendPostActivityCreatorDenied();
            }
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////
function addTransaction() {
    var login_name = textReplaceApostrophe(sessionStorage.getItem('m_loginName'));
    var comments = textReplaceApostrophe($('#user_comments').val());
    if (comments !== "") {
        db_insertTransaction(PDRequestID, login_name, comments);
    }
}

function copyToAvailPDRequest(PDRequestID) {
    var act_title = $('#activity_title').html();
    var result = new Array();
    result = db_getPDRequestByActTitle(act_title);
    
    if (result.length === 1) {
        db_insertAvailPDRequest(PDRequestID);
    }
}

////////////////////////////////////////////////////////////////////////////////
function sendPreActivityCreatorApproved() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Pre-activity Professional Development Request has been Approved";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Approved</strong>, ";
    message += "based on the merit of your Professional Development activity. ";
    message += "Upon conclusion of this professional development activity, Please use the link below to complete the Post-activity fields and submit for final approval ";
    message += "of funding and/or professional development credit hours.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.<br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

function sendPreActivityCreatorMoreInfo() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Pre-activity Professional Development Request need More Information";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> required additional information.<br>";
    message += "Please use the link below to read the comments which explain what more information is required.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.<br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

function sendPreActivityCreatorDenied() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Pre-activity Professional Development Request has been Denied";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Denied</strong>.<br>";
    message += "Please use the link below to read the comments which explain the reason for the denieal.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

////////////////////////////////////////////////////////////////////////////////
function sendPostActivityCreatorApproved() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Post-activity Professional Development Request has been Approved";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Approved</strong>.<br></br>";
    message += "Remember, all expenses must be paid up front. To apply for reimbursement of expenses for the approved activity:<br><br>";
    message += "1) Complete the <a href='https://sharepoint.socccd.edu/bs/acct/Lists/Accounting%20Forms/AllItems.aspx?&&p_SortBehavior=0&p_Order=6900%2e00000000000&&PageFirstRow=1&&View=\\\\\\\\\\{4E4A84AB-B879-465B-855E-C104BD533B22\\\\\\\\\\}'>FS 12008 Employee Travel Reimbursement Claim</a> ";
    message += "form for the appropriate travel dates. Include original receipts for any approved reimbursable expenses(s). ";
    message += "Under the field \"Employee's Supervisor Signature\", your Dean does NOT need to sign this form; the Dean who oversee faculty professional development (Dean Cathleen Greiner) will sign this form.<br><br>";
    message += "2) Submit the completed and signed reimbursement claim form, with original receipts, <strong>within 21 calendar days</strong> after the last day of the activity to Stefanie Alvarez (<a href='mailto:salvarez@ivc.edu'>salvarez@ivc.edu</a>, phone: 949-451-5709, Location: A 304). ";
    message += "the requisition will expire 30 days from the return date and the funds will be reallocated if receipts are not received within the allotted time. ";
    message += "In some circumstances, the expiration may be sooner.<br><br>";
    
    message += "Please use the link below to review the approved hours and funding at anytime.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.<br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

function sendPostActivityCreatorMoreInfo() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Post-activity Professional Development Request need More Information";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> required additional information.<br>";
    message += "Please use the link below to read the comments which explain what more information is required.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.<br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

function sendPostActivityCreatorDenied() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Post-activity Professional Development Request has been Denied";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Pre-activity Professional Development Request, title <strong>" + act_title + "</strong> has been <strong>Denied</strong>.<br>";
    message += "Please use the link below to read the comments which explain the reason for the denieal.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}
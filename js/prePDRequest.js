var fiscal_yrs = "";

var m_hrs_step = "1";
var m_reimb_step = "1";
var m_hrs_status = null;
var m_reimb_status = null;

var pd_limit = 0.0;
var amount_convert = 0.0;
var available_amount = 0.0;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        setDefaultSetting();
        getGeneralInfo();
            
        if (sessionStorage.getItem('m_PDRequestID') !== null) {            
            PDRequestID = sessionStorage.getItem('m_PDRequestID');
            getSelectPDRequest();
            getSelectPDReqUserInfo();
            getSelectJustArea();
            getSelectNarrative();
            getSelectResourceType();
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {     
    $('#nav_home').click(function() {
        sessionStorage.removeItem("m_PDRequestID");
        window.open('home.html', '_self');
    });
    
    $('#nav_print').click(function() {
        if (PDRequestID !== "") {
            sessionStorage.setItem('m_PDRequestID', PDRequestID);
            window.open('printPDRequest.html?pdrequest_id=' + PDRequestID, '_blank');
        }
    });
    
    $('#nav_logout').click(function() {
        var parent_site = sessionStorage.getItem('m_parentSite');
        sessionStorage.clear();
        window.open(parent_site, '_self');
    });
    
    $('#start_date').change(function() {
        var start_date = $(this).val();
        $('#end_date').datepicker( "option", "minDate", new Date(start_date));
    });
    
    // change resource type ////////////////////////////////////////////////////
    $('#resource_type').change(function() {      
        var err = formMainValidation(true);
        if (err !== "") {
            alert(err);
            $('#resource_type').val("Select...");
            return false;
        }
        
        var resource_type = $(this).val();
        if (resource_type === "Select...") {
            setDefaultSetting();
            alert("Please select Resource Type");
            return false;
        }
        else if (resource_type === "Hours") {
            ResourceTypeID = getResourceTypeID(resource_type);
            addPDRequest(ResourceTypeID);
            setHoursSetting();
            getSelectHrsSection();
        }
        else if (resource_type === "Reimbursement") {
            ResourceTypeID = getResourceTypeID(resource_type); 
            addPDRequest(ResourceTypeID);
            setReimbursementSetting();
            getSelectReimbSection();
        }
        else {
            ResourceTypeID = getResourceTypeID(resource_type);    
            addPDRequest(ResourceTypeID);
            setHoursReimbursementSetting();
            getSelectHrsSection();
            getSelectReimbSection();
        }
        
        setStepStatus();
    });
    
    // justification narrative add file click //////////////////////////////////
    $('#btn_just_narrative_add').click(function() {
        justNarrativeAttachFile(PDRequestID);
    });
    
    $(document).on('click', 'button[id^="just_narr_file_remove_btn_"]', function() {
        var currentId = $(this).attr('id');       
        var ID = currentId.replace("just_narr_file_remove_btn_", "");
        var file_name = $("#just_narr_file_view_" + ID).html();
        
        var file_link_name = "narrative_" + PDRequestID + "_" + ID + "_" + file_name;
        if (deleteAttachFileJustNarrative(file_link_name)) {
            var fileID = "just_narr_file_" + ID;
            $("#" + fileID).remove();
            $("#just_narrative_file").filestyle('clear');
            $('#just_narrative_file').val("");
        }
    });
    
    // pd request hours fields change //////////////////////////////////////////
    $('#pre_input_hrs').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);         
        var new_val = input_val * 3;
        $(this).val(input_val);
        $('#pre_presenter_hrs').html(new_val.toFixed(2));
        preCalculateTotalHrs();
    }); 
    
    $('#pre_participant_hrs').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);       
        $(this).val(input_val);
        preCalculateTotalHrs();
    });
    
    // pd request reimbursement fields change //////////////////////////////////
    $('#pre_reg_fee').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_travel_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_input_mileage').change(function() {
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#pre_mileage_cost').html('$0.00');
        }
        else {     
            $(this).val(input_val);
            $('#pre_mileage_cost').html(formatDollar(sys_mileage_amt * input_val, 2));
        }
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_lodging_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_input_breakfast').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#pre_breakfast_cost').html('$0.00');
        }
        else {          
            $(this).val(input_val);
            $('#pre_breakfast_cost').html(formatDollar(sys_breakfast_amt * input_val, 2));
        }
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_input_lunch').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#pre_lunch_cost').html('$0.00');
        }
        else {         
            $(this).val(input_val);
            $('#pre_lunch_cost').html(formatDollar(sys_lunch_amt * input_val, 2));
        }
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_input_dinner').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#pre_dinner_cost').html('$0.00');
        }
        else {       
            $(this).val(input_val);
            $('#pre_dinner_cost').html(formatDollar(sys_dinner_amt * input_val, 2));
        }
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_other_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));       
        $(this).val(formatDollar(input_val, 2));
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    $('#pre_funding_other').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));        
        $(this).val(formatDollar(input_val, 2));
        preCalculateSubTotal();
        preCalculateTotalCost();
    });
    
    // user save as draft click ////////////////////////////////////////////////
    $('#btn_save_draft').click(function() { 
        $(this).prop('disabled', true);
        var err = formMainValidation(false);
        if (err !== "") {
            alert(err);
            $(this).prop('disabled', false);
            return false;
        }
        
        updatePDReqUserInfo();
        updatePDRequest(false);
        updateJustArea();
        updateNarrative();
        updateRequestDetail();
        updatePDReqHRProcess(1, 1);
        
        // insert log
        addLogHistorySaveAsDraft();
        window.open('home.html', '_self');
    });
    
    // user submit click ///////////////////////////////////////////////////////
    $('#btn_submit').click(function() {
        $(this).prop('disabled', true);
        var err = formMainValidation(false);
        err += formNarrativeValidation();
        if (err !== "") {
            alert(err);
            $(this).prop('disabled', false);
            return false;
        }
        
        updatePDReqUserInfo();
        updatePDRequest(true);
        updateJustArea();
        updateNarrative();
        updateRequestDetail();
        updateStatus(2);
        updatePDReqHRProcess(2, 2);
        updatePDReqHRProcessSubmissionDate();
        addTransaction();
        
        var result = new Array();
        result = db_getTracDocByPDRequestID(PDRequestID);
        if (result.length === 0) {
            db_insertTracDoc(PDRequestID);
        }
        
        // insert log
        addLogHistorySubmitted();
        sendPreActivityCreatorSubmitted();
        sendPreActivityApproverSubmitted();

        sessionStorage.removeItem("m_PDRequestID");
        window.open('home.html', '_self');
    });
    
    $('#ckb_comments').change(function() {      
        var ckb_comm = $(this).is(':checked');
        if (ckb_comm) {
            $('#comments_block').show();
        }
        else {
            $('#comments_block').hide();
        }
    });
    
    // funding src mouse event /////////////////////////////////////////////////
    $('#active_fund_src_list').on('mouseover', '[id^="fs_name_"]', function() {
        var fs_type_id = $(this).attr('id').replace("fs_name_", "");
        var descrip = db_getFundSrcTypeDescrip(fs_type_id);
        $(this).popover({trigger:"manual", content:descrip, placement:"top"});
        $(this).popover('toggle');
    });
    
    $('#active_fund_src_list').on('mouseleave', '[id^="fs_name_"]', function() {
        $(this).popover('hide');
    });
    
    // auto size
    $('#activity_description').autosize();
    $('#just_narrative_descrip').autosize();
    $('#user_comments').autosize();
    $('#fs_comments').autosize();
    
    // datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // bootstrap filestyle
    $(":file").filestyle({classButton: "btn btn-primary"});
    
    // popover
    $('#other_cost_description').popover({content:"Parking, Air Port Shuttle, Internet etc", placement:"top"});
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function setFiscalYrs() {
    var today = new Date();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    
    var fiscal_yrs_0 = (yr - 1) + "-" + yr;
    var fiscal_yrs_1 = yr + "-" + (yr + 1);
    var fiscal_yrs_2 = (yr + 1) + "-" + (yr + 2);
    
    var fiscal_html ="";
    if (mon > 6) {
        fiscal_html += "<option value='" + fiscal_yrs_1 + "'>" + fiscal_yrs_1 + "</option>";
        fiscal_html += "<option value='" + fiscal_yrs_2 + "'>" + fiscal_yrs_2 + "</option>";
    }
    else {
        fiscal_html += "<option value='" + fiscal_yrs_0 + "'>" + fiscal_yrs_0 + "</option>";
        fiscal_html += "<option value='" + fiscal_yrs_1 + "'>" + fiscal_yrs_1 + "</option>";
    }
    
    $("#fiscal").append(fiscal_html);    
    $('#fiscal').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function formJustificationValidation() {
    var err = "";
    var just_area_1 = $('#just_area_1').is(':checked');
    var just_area_2 = $('#just_area_2').is(':checked');
    var just_area_3 = $('#just_area_3').is(':checked');
    var just_area_4 = $('#just_area_4').is(':checked');
    var just_area_5 = $('#just_area_5').is(':checked');
    var just_area_6 = $('#just_area_6').is(':checked');
    var just_area_7 = $('#just_area_7').is(':checked');
    var just_area_8 = $('#just_area_8').is(':checked');
    var just_area_9 = $('#just_area_9').is(':checked');
    
    if (just_area_1 === false && just_area_2 === false && just_area_3 === false
            && just_area_4 === false && just_area_5 === false && just_area_6 === false
            && just_area_7 === false && just_area_8 === false && just_area_9 === false) {
        err = "Minimum one Justification Area is a required\n";
    }
    
    return err;
}

function formMainValidation(rtype_selection) {
    var err = "";
    
    if (isValidEmailAddress($('#email').val()) === false) {
        err += "Email is a required field or you entered incorrect email address\n";
    }
    if ($('#department').val().replace(/\s+/g, '') === "") {
        err += "Department is a required field\n";
    }
    if ($('#phone').val().replace(/\s+/g, '') === "") {
        err += "Phone is a required field\n";
    }
    if ($('#school').val().replace(/\s+/g, '') === "") {
        err += "School is a required field\n";
    }
    if ($('#employee_type').val().replace(/\s+/g, '') === "") {
        err += "Employee Type is a required field\n";
    }
    if ($('#activity_title').val().replace(/\s+/g, '') === "") {
        err += "Activity Title is a required field\n";
    }
    if ($('#activity_organizer').val().replace(/\s+/g, '') === "") {
        err += "Activity Organizer is a required field\n";
    }
    if ($('#activity_city').val().replace(/\s+/g, '') === "") {
        err += "Activity City is a required field\n";
    }
    if ($('#activity_state').val() === "Select...") {
        err += "Activity State is a required field\n";
    }
    if ($('#activity_description').val().replace(/\s+/g, '') === "") {
        err += "Activity Description is a required field\n";
    }
    if ($('#start_date').val().replace(/\s+/g, '') === "") {
        err += "Start Date is a required field\n";
    }
    if ($('#end_date').val().replace(/\s+/g, '') === "") {
        err += "End Date is a required field\n";
    }
    
    if (!rtype_selection) {
        err += formJustificationValidation();
    }

    return err;
}

function formNarrativeValidation() {
    var err = "";
    
    if ($('#just_narrative_descrip').val().replace(/\s+/g, '') === "") {
        err += "Justification Narrative is a required field\n";
    }

    return err;
}

////////////////////////////////////////////////////////////////////////////////
function setDefaultSetting() {
    $('#request_hours').hide();
    $('#request_reimbursement').hide();
    $('#approval_section').hide();
    $('#comments_section').hide();
    $('#justification_Area').hide();
    $('#just_narrative_section').hide();
    $('#just_narrative_descrip').hide();
    $('#comments_block').hide();
    $('#hrs_step_status').hide();
    $('#reimb_step_status').hide();
}

function setHoursSetting() {
    $('#request_hours').show();
    $('#request_reimbursement').hide();
    $('#justification_Area').show();
    $('#just_narrative_section').show();
    $('#just_narrative_descrip').show();
    $('#approval_section').show();
    $('#comments_section').show();
    $('#hrs_step_status').show();
    $('#reimb_step_status').hide();
    
    $('.pre_hrs_class').prop('readonly', true);
}

function setReimbursementSetting() {
    $('#request_hours').hide();
    $('#request_reimbursement').show();
    $('#justification_Area').show();
    $('#just_narrative_section').show();
    $('#just_narrative_descrip').show();
    $('#approval_section').show();
    $('#comments_section').show();
    $('#hrs_step_status').hide();
    $('#reimb_step_status').show();
    
    $('.pre_reimb_class').prop('readonly', true);
    $('.fs_list_class').prop('disabled', true);
    
    setPDLimitSummary();
}

function setHoursReimbursementSetting() {
    $('#request_hours').show();
    $('#request_reimbursement').show();
    $('#justification_Area').show();
    $('#just_narrative_section').show();
    $('#just_narrative_descrip').show();
    $('#approval_section').show();
    $('#comments_section').show();
    $('#hrs_step_status').show();
    $('#reimb_step_status').show();
    
    $('.pre_hrs_class').prop('readonly', true);
    $('.pre_reimb_class').prop('readonly', true);
    $('.fs_list_class').prop('disabled', true);
    
    setPDLimitSummary();
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
function getGeneralInfo() {  
    getLoginID();
    setCurrentDate();
    setFiscalYrs();
    getPDSystem();
    getActState();
    getResourceType();
    getActiveFundingSrcList();
}

function getLoginID() {    
    var email = sessionStorage.getItem('m_loginEmail');
    var login = new Array();
    login = db_getLogin(email);
    
    if (login.length === 1) {
        LoginID = login[0]['LoginID'];
        $('#requestor').val(login[0]['LoginName']);
        $('#email').val(login[0]['LoginEmail']);
        $('#department').val(login[0]['LoginDepart']);
        $('#phone').val(login[0]['LoginPhone']);
        $('#school').val(login[0]['LoginDiv']);
        $('#employee_type').val(login[0]['LoginEType']);
    }
}

function addPDRequest(ResourceTypeID) {
    if (PDRequestID === "") {
        var fiscal_yrs = $('#fiscal').val();
        var act_title = textReplaceApostrophe($('#activity_title').val());
        var start_date = textReplaceApostrophe($('#start_date').val());
        var end_date = textReplaceApostrophe($('#end_date').val());

        var result_ID = db_insertPDRequest(LoginID, ResourceTypeID, 1, 1, fiscal_yrs, act_title, start_date, end_date);
        if (result_ID !== "") {
            PDRequestID = result_ID;
            addPDReqUserInfo(PDRequestID);
            PDReqHRProcessID = db_insertPDReqHRProcess(PDRequestID);
        }
    }
}

function addPDReqUserInfo(PDRequestID) {
    if (PDReqUserInfoID === "" && PDRequestID !== "") {
        var name = textReplaceApostrophe($('#requestor').val());
        var email = textReplaceApostrophe($('#email').val());
        var depart = textReplaceApostrophe($('#department').val());
        var phone = textReplaceApostrophe($('#phone').val());
        var division = textReplaceApostrophe($('#school').val());
        var emp_type = textReplaceApostrophe($('#employee_type').val());
        
        var result_ID = db_insertPDReqUserInfo(PDRequestID, name, email, depart, phone, division, emp_type);
        if (result_ID !== "") {
            PDReqUserInfoID = result_ID;
        }
    }
}

function addJustArea() {
    if (PDJustAreaID === "" && PDRequestID !== "") {
        var result_ID = db_insertPDJustArea(PDRequestID);
        if (result_ID !== "") {
            PDJustAreaID = result_ID;
        }
    }
}

function addNarrative() {
    if (NarrativeID === "" && PDRequestID !== "") {
        var result_ID = db_insertNarrative(PDRequestID);
        if (result_ID !== "") {
            NarrativeID = result_ID;
        }
    }
}

function addPDReqHours() {
    var result = new Array();
    result = db_getPDReqHours(PDRequestID);
    
    if (result.length === 0) {
        var result_ID = db_insertPDReqHours(PDRequestID);
        if (result_ID !== "") {
            PDReqHoursID = result_ID;
        }
    }
    else {
        PDReqHoursID = result[0['PDReqHoursID']];
    }
}

function addPDReqReimb() {
    var result = new Array();
    result = db_getPDReqReimb(PDRequestID);
    
    if (result.length === 0) {
        var result_ID = db_insertPDReqReimb(PDRequestID);
        if (result_ID !== "") {
            PDReqReimbID = result_ID;
            addPDReqFundSrc();
            addPDReqFSComments();
        }
    }
    else {
        PDReqReimbID = result[0['PDReqReimbID']];
    }
}

function addPDReqFundSrc() {
    $('#active_fund_src_list').children().each(function() {
        $(this).children().find("input[type='checkbox']").each(function() {
            var fs_id = $(this).attr('id').replace("fs_selected_", "");
            db_insertPDReqFundSrc(PDRequestID, PDReqReimbID, fs_id);
        });        
    });    
}

function addPDReqFSComments() {
    var fs_comments = $('#fs_comments').val();
    db_insertPDReqFSComments(PDRequestID, PDReqReimbID, fs_comments);
}

function setStepStatus() {
    if (PDRequestID === "") {
        $('#hrs_current_step').html("Pre-activity");
        $('#hrs_current_status').html("Draft");
        $('#reimb_current_step').html("Pre-activity");
        $('#reimb_current_status').html("Draft");
    }
    else {
        getSelectStepStatus();
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

////////////////////////////////////////////////////////////////////////////////
function updatePDReqUserInfo() {
    var name = textReplaceApostrophe($('#requestor').val());
    var email = textReplaceApostrophe($('#email').val());
    var depart = textReplaceApostrophe($('#department').val());
    var phone = textReplaceApostrophe($('#phone').val());
    var division = textReplaceApostrophe($('#school').val());
    var emp_type = textReplaceApostrophe($('#employee_type').val());

    db_updatePDReqUserInfo(PDRequestID, name, email, depart, phone, division, emp_type);
}

function updatePDRequest(submit) {
    var fiscal_yrs = $('#fiscal').val();
    var act_title = textReplaceApostrophe($('#activity_title').val());
    var act_organizer = textReplaceApostrophe($('#activity_organizer').val());
    var act_city = textReplaceApostrophe($('#activity_city').val());
    var act_state_ID = $('#activity_state').val();
    var act_descrip = textReplaceApostrophe($('#activity_description').val());
    var act_link = textReplaceApostrophe($('#activity_link').val());
    var start_date = textReplaceApostrophe($('#start_date').val());
    var end_date = textReplaceApostrophe($('#end_date').val());
    var create_date = textReplaceApostrophe($('#current_date').val());
    var ckb_comm = $('#ckb_comments').is(':checked');
    var comments = textReplaceApostrophe($('#user_comments').val());

    if (submit) {
        db_updatePDRequest(PDRequestID, LoginID, ResourceTypeID, fiscal_yrs, act_title, act_organizer, act_city, act_state_ID, act_descrip, act_link, start_date, end_date, create_date, "", false);
        db_updatePDRequestPreSubDate(PDRequestID);
    }
    else {
        db_updatePDRequest(PDRequestID, LoginID, ResourceTypeID, fiscal_yrs, act_title, act_organizer, act_city, act_state_ID, act_descrip, act_link, start_date, end_date, create_date, comments, ckb_comm);
    }
}

function updatePDReqHRProcess(hrs_status_id, reimb_status_id) {
    if (ResourceTypeID === "1") {
        if (m_hrs_status === null || m_hrs_status === "1" || m_hrs_status === "5") {
            db_updatePDReqHRProcessHrs(PDRequestID, null, m_hrs_step, hrs_status_id);
            db_insertPDReqHRProcessLogHrs(PDRequestID, null, m_hrs_step, hrs_status_id, "");
        }
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_status === null || m_reimb_status === "1" || m_reimb_status === "5") {
            db_updatePDReqHRProcessReimb(PDRequestID, null, m_reimb_step, reimb_status_id);
            db_insertPDReqHRProcessLogReimb(PDRequestID, null, m_reimb_step, reimb_status_id, "");
        }
    }
    else {
        if (m_hrs_status === null || m_hrs_status === "1" || m_hrs_status === "5") {
            db_updatePDReqHRProcessHrs(PDRequestID, null, m_hrs_step, hrs_status_id);
            db_insertPDReqHRProcessLogHrs(PDRequestID, null, m_hrs_step, hrs_status_id, "");
        }
        if (m_reimb_status === null || m_reimb_status === "1" || m_reimb_status === "5") {
            db_updatePDReqHRProcessReimb(PDRequestID, null, m_reimb_step, reimb_status_id);
            db_insertPDReqHRProcessLogReimb(PDRequestID, null, m_reimb_step, reimb_status_id, "");
        }
    } 
}

function updatePDReqHRProcessSubmissionDate() {
    if (ResourceTypeID === "1") {
        db_updatePDReqHRProcessHrsStatusDate(PDRequestID, true, false, false, false, false, false);
    }
    else if (ResourceTypeID === "2") {
        db_updatePDReqHRProcessReimbStatusDate(PDRequestID, true, false, false, false, false, false);
    }
    else {
        db_updatePDReqHRProcessHrsStatusDate(PDRequestID, true, false, false, false, false, false);
        db_updatePDReqHRProcessReimbStatusDate(PDRequestID, true, false, false, false, false, false);
    }
}

function updateJustArea() {
    addJustArea();
        
    var just_area_1 = $('#just_area_1').is(':checked');
    var just_area_2 = $('#just_area_2').is(':checked');
    var just_area_3 = $('#just_area_3').is(':checked');
    var just_area_4 = $('#just_area_4').is(':checked');
    var just_area_5 = $('#just_area_5').is(':checked');
    var just_area_6 = $('#just_area_6').is(':checked');
    var just_area_7 = $('#just_area_7').is(':checked');
    var just_area_8 = $('#just_area_8').is(':checked');
    var just_area_9 = $('#just_area_9').is(':checked');

    db_updatePDJustArea(PDRequestID, just_area_1, just_area_2, just_area_3, just_area_4, just_area_5, just_area_6, just_area_7, just_area_8, just_area_9);
}

function updateNarrative() {
    addNarrative();
    var narrative = textReplaceApostrophe($('#just_narrative_descrip').val());

    db_updateNarrative(PDRequestID, narrative);
}

function updateRequestDetail() {
    if (ResourceTypeID === "1") {
        updatePDReqHoursPreActivity();
    }
    else if (ResourceTypeID === "2") {
        updatePDReqReimbPreActivity();
    }
    else {
        updatePDReqHoursPreActivity();
        updatePDReqReimbPreActivity();
    }
}

function updatePDReqHoursPreActivity() {
    addPDReqHours();
    
    var pre_input_hrs = Number($('#pre_input_hrs').val());
    var pre_pres_hrs = Number($('#pre_presenter_hrs').html());
    var pre_part_hrs = Number($('#pre_participant_hrs').val());
    var pre_total_hrs = Number($('#pre_total_hrs').html());
    
    db_updatePDReqHoursPreActivity(PDRequestID, pre_input_hrs, pre_pres_hrs, pre_part_hrs, pre_total_hrs);
}

function updatePDReqReimbPreActivity() {
    addPDReqReimb();
    
    var pre_reg_fee = revertDollar($('#pre_reg_fee').val());
    var pre_travel_cost = revertDollar($('#pre_travel_cost').val());
    var pre_input_mileage = Number($('#pre_input_mileage').val());
    var pre_mileage_cost = revertDollar($('#pre_mileage_cost').html());
    var pre_lodging_cost = revertDollar($('#pre_lodging_cost').val());
    var pre_input_breakfast = Number($('#pre_input_breakfast').val());
    var pre_breakfast_cost = revertDollar($('#pre_breakfast_cost').html());
    var pre_input_lunch = Number($('#pre_input_lunch').val());
    var pre_lunch_cost = revertDollar($('#pre_lunch_cost').html());
    var pre_input_dinner = Number($('#pre_input_dinner').val());
    var pre_dinner_cost = revertDollar($('#pre_dinner_cost').html());
    var other_cost_description = textReplaceApostrophe($('#other_cost_description').val());
    var pre_other_cost = revertDollar($('#pre_other_cost').val());
    var pre_sub_total = revertDollar($('#pre_sub_total').html());
    var funding_other_source = textReplaceApostrophe($('#funding_other_source').val());
    var fs_approved = $('input[name="rdo_fs_approval"]:checked').val();
    var fs_comments = textReplaceApostrophe($('#fs_comments').val());
    var pre_funding_other = revertDollar($('#pre_funding_other').val());
    var pre_total_cost = revertDollar($('#pre_total_cost').html());
    var pre_total_amount_request = revertDollar($('#pre_total_amount_request').html());
    
    db_updatePDReqReimbPreActivity(PDRequestID, pre_reg_fee, pre_travel_cost, pre_input_mileage, pre_mileage_cost, pre_lodging_cost, pre_input_breakfast, pre_breakfast_cost, 
                                    pre_input_lunch, pre_lunch_cost, pre_input_dinner, pre_dinner_cost, other_cost_description, pre_other_cost, 
                                    pre_sub_total, funding_other_source, fs_approved, fs_comments, pre_funding_other, pre_total_cost, pre_total_amount_request);
                                    
    // verified new funding src has been added to reimb
    $('#active_fund_src_list').children().each(function() {
        $(this).children().find("input[type='checkbox']").each(function() {
            var fs_id = $(this).attr('id').replace("fs_selected_", "");
            var result = db_getPDReqFundSrc(PDRequestID, PDReqReimbID, fs_id);
            if (result === null) {
                db_insertPDReqFundSrc(PDRequestID, PDReqReimbID, fs_id);
            }
        });        
    });  
    
    // update PDReqFundSrc
    $('#active_fund_src_list').children().each(function() {
        $(this).children().find("input[type='checkbox']").each(function() {
            var fs_id = $(this).attr('id').replace("fs_selected_", "");
            var fs_selected = $(this).is(':checked');
            db_updatePDReqFundSrcFSSelected(PDRequestID, PDReqReimbID, fs_id, fs_selected);
        });        
    });
    
    // update PDReqFSComments
    var fs_comments = $('#fs_comments').val();
    db_updatePDReqFSComments(PDRequestID, PDReqReimbID, fs_comments);
}

function updateStep(new_step_ID) {
    db_updatePDRequestStep(PDRequestID, new_step_ID);
}

function updateStatus(new_status_ID) {
    db_updatePDRequestStatus(PDRequestID, new_status_ID);
}

////////////////////////////////////////////////////////////////////////////////
function getSelectPDRequest() {
    var pd_request = new Array();
    pd_request = db_getPDRequest(PDRequestID);
    
    if (pd_request.length === 1) {        
        $('#activity_title').val(pd_request[0]['ActTitle']);
        $('#activity_organizer').val(pd_request[0]['ActOrganizer']);
        $('#activity_city').val(pd_request[0]['ActCity']);
        $('#activity_state').val(pd_request[0]['ActStateID']);
        $('#activity_description').val(pd_request[0]['ActDescrip']).trigger('autosize.resize');
        $('#activity_link').val(pd_request[0]['ActLink']);
        $('#start_date').val(pd_request[0]['StartDate']);
        $('#end_date').val(pd_request[0]['EndDate']);
        $('#user_comments').val(pd_request[0]['Comments']);
        if (pd_request[0]['ckbCom'] === "1") {
            $("#ckb_comments").prop('checked', true);
            $('#comments_block').show();
        }
        
        LoginID = pd_request[0]['LoginID'];
        StatusID = pd_request[0]['StatusID'];
        PDReqStepID = pd_request[0]['PDReqStepID'];
        ResourceTypeID = pd_request[0]['ResourceTypeID'];
        
        if (StatusID !== "1") {
            $('#current_date').val(pd_request[0]['CreateDate']);
        }
    }
}

function getSelectPDReqUserInfo() {
    var pd_req_user_info = new Array();
    pd_req_user_info = db_getPDReqUserInfo(PDRequestID);
    
    if (pd_req_user_info.length === 1) {
        PDReqUserInfoID = pd_req_user_info[0][0];
        $('#requestor').val(pd_req_user_info[0]['Name']);
        $('#email').val(pd_req_user_info[0]['Email']);
        $('#department').val(pd_req_user_info[0]['Depart']);
        $('#phone').val(pd_req_user_info[0]['Phone']);
        $('#school').val(pd_req_user_info[0]['Division']);
        $('#employee_type').val(pd_req_user_info[0]['EmployeeType']);
    }
}

function getSelectResourceType() {
    var resource_type = new Array();
    resource_type = db_getResourceType();

    for(var i = 0; i < resource_type.length; i++) { 
        var ID = resource_type[i][0];
        if (ID === ResourceTypeID) {
            $('#resource_type').val(resource_type[i][1]);
            $('.selectpicker').selectpicker('refresh');
            getSelectStepStatus();
            
            if (ResourceTypeID === "1") {
                setHoursSetting();
                getSelectPDReqHours();
                getSelectHrsSection();
            }
            else if (ResourceTypeID === "2") {
                setReimbursementSetting();
                getSelectPDReqReimb();
                getSelectReimbSection();
            }
            else {
                setHoursReimbursementSetting();
                getSelectPDReqHours();
                getSelectPDReqReimb();
                getSelectHrsSection();
                getSelectReimbSection();
            }

            getSelectTransaction();
            break;
        }
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
        $('#just_narrative_descrip').val(narrative[0]['Narrative']).trigger('autosize.resize');
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
            var f_index = getFileIndex(fl_name, f_name);
            var html = justNarrativeAttachFileHTML(f_index, fl_name, f_name);
            $("#just_narrative_attached_list").append(html);
        }
    }
}

function getSelectPDReqHours() {
    var pd_req_hours = new Array();
    pd_req_hours = db_getPDReqHours(PDRequestID);
    if (pd_req_hours.length === 1) {
        PDReqHoursID = pd_req_hours[0][0];
        // pre activity fields
        $('#pre_input_hrs').val(Number(pd_req_hours[0]['PreInputHr']).toFixed(2));
        $('#pre_presenter_hrs').html(Number(pd_req_hours[0]['PrePresHr']).toFixed(2));
        $('#pre_participant_hrs').val(Number(pd_req_hours[0]['PrePartHr']).toFixed(2));
        $('#pre_total_hrs').html(Number(pd_req_hours[0]['PreTotalHr']).toFixed(2));
    }
}

function getSelectPDReqReimb() {  
    var pd_req_reimb = new Array();
    pd_req_reimb = db_getPDReqReimb(PDRequestID);
    if (pd_req_reimb.length === 1) {
        PDReqReimbID = pd_req_reimb[0][0];
        // pre activity fields
        $('#pre_reg_fee').val(formatDollar(Number(pd_req_reimb[0]['PreReqFee']), 2));
        $('#pre_travel_cost').val(formatDollar(Number(pd_req_reimb[0]['PreTravel']), 2));
        $('#pre_input_mileage').val(Number(pd_req_reimb[0]['PreMileage']));
        $('#pre_mileage_cost').html(formatDollar(Number(pd_req_reimb[0]['PreMilCost']), 2));
        $('#pre_lodging_cost').val(formatDollar(Number(pd_req_reimb[0]['PreLodging']), 2));
        $('#pre_input_breakfast').val(Number(pd_req_reimb[0]['PreNumBrk']));
        $('#pre_breakfast_cost').html(formatDollar(Number(pd_req_reimb[0]['PreBrkCost']), 2));
        $('#pre_input_lunch').val(Number(pd_req_reimb[0]['PreNumLun']));
        $('#pre_lunch_cost').html(formatDollar(Number(pd_req_reimb[0]['PreLunCost']), 2));
        $('#pre_input_dinner').val(Number(pd_req_reimb[0]['PreNumDin']));
        $('#pre_dinner_cost').html(formatDollar(Number(pd_req_reimb[0]['PreDinCost']), 2));        
        $('#other_cost_description').val(pd_req_reimb[0]['OtherSource']);
        $('#pre_other_cost').val(formatDollar(Number(pd_req_reimb[0]['PreOthCost']), 2));
        $('#pre_sub_total').html(formatDollar(Number(pd_req_reimb[0]['PreSubTotal']), 2));
        $('#funding_other_source').val(pd_req_reimb[0]['FundingSource']);        
        $('#pre_funding_other').val(formatDollar(Number(pd_req_reimb[0]['PreFunCost']), 2));
        $('#pre_total_cost').html(formatDollar(Number(pd_req_reimb[0]['PreTotalCost']), 2));
        $('#pre_total_amount_request').html(formatDollar(Number(pd_req_reimb[0]['PreTotalAmtRequest']), 2));
    }
    
    setPDReqFundSrc();
    setPDReqFSComments();
    setPDLimitSummary();
}

////////////////////////////////////////////////////////////////////////////////
function setPDReqFundSrc() {
    var result = new Array();
    result = db_getPDReqFundSrc(PDRequestID, PDReqReimbID);
    for(var i = 0; i < result.length; i++) { 
        var fund_sr_type_id = result[i]['FundSrcTypeID'];
        if (result[i]['FSSelected'] === "1") {
            $('#fs_selected_' + fund_sr_type_id).prop('checked', true);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function setPDReqFSComments() {
    var fs_comments =  db_getPDReqFSComments(PDRequestID, PDReqReimbID);
    $('#fs_comments').val(fs_comments).trigger('autosize.resize');
}

////////////////////////////////////////////////////////////////////////////////
function setPDLimitSummary() {   
    var pd_limit = Number(sessionStorage.getItem('m_pd_limit'));
    var amount_convert = Number(sessionStorage.getItem('m_amount_convert'));
    var available_amount = Number(sessionStorage.getItem('m_available_amount'));
    
    $('#sys_pd_limit_amount').html(formatDollar(pd_limit, 2));
    $('#pd_amount_convert').html(formatDollar(amount_convert, 2));
    $('#pd_available_amount').html(formatDollar(available_amount, 2));
    
    if (available_amount < 0) {
        $('#pd_available_amount').css('color', 'red');
    }
}

////////////////////////////////////////////////////////////////////////////////
function getSelectStepStatus() {
    var result = new Array();
    result = db_getPDReqHRProcess(PDRequestID);
    
    m_hrs_step = result[0]['HrsStepID'];
    m_reimb_step = result[0]['ReimbStepID'];
    m_hrs_status = result[0]['HrsStatusID'];
    m_reimb_status = result[0]['ReimbStatusID'];
    
    if (ResourceTypeID === "1") {
        if (m_hrs_step === null && m_hrs_status === null) {
            m_hrs_step = "1";
            m_hrs_status = "1";
            db_updatePDReqHRProcessHrs(PDRequestID, null, m_hrs_step, m_hrs_status);
        }
        
        var hrs_step = db_getPDReqStep(m_hrs_step);
        var hrs_status = db_getStatus(m_hrs_status);
        $('#hrs_current_step').html(hrs_step[0]['PDReqStep']);
        $('#hrs_current_status').html(hrs_status[0]['Status']);
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_step === null && m_reimb_status === null) {
            m_reimb_step = "1";
            m_reimb_status = "1";
            db_updatePDReqHRProcessReimb(PDRequestID, null, m_reimb_step, m_reimb_status);
        }
        
        var reimb_step = db_getPDReqStep(m_reimb_step);
        var reimb_status = db_getStatus(m_reimb_status);
        $('#reimb_current_step').html(reimb_step[0]['PDReqStep']);
        $('#reimb_current_status').html(reimb_status[0]['Status']);
    }
    else {
        if (m_hrs_step === null && m_hrs_status === null) {
            m_hrs_step = "1";
            m_hrs_status = "1";
            db_updatePDReqHRProcessHrs(PDRequestID, null, m_hrs_step, m_hrs_status);
        }
        
        var hrs_step = db_getPDReqStep(m_hrs_step);
        var hrs_status = db_getStatus(m_hrs_status);
        $('#hrs_current_step').html(hrs_step[0]['PDReqStep']);
        $('#hrs_current_status').html(hrs_status[0]['Status']);
        
        if (m_reimb_step === null && m_reimb_status === null) {
            m_reimb_step = "1";
            m_reimb_status = "1";
            db_updatePDReqHRProcessReimb(PDRequestID, null, m_reimb_step, m_reimb_status);
        }
        
        var reimb_step = db_getPDReqStep(m_reimb_step);
        var reimb_status = db_getStatus(m_reimb_status);
        $('#reimb_current_step').html(reimb_step[0]['PDReqStep']);
        $('#reimb_current_status').html(reimb_status[0]['Status']);
    }
}

////////////////////////////////////////////////////////////////////////////////
function getSelectHrsSection() {
    if (m_hrs_status === null || m_hrs_status === "1" || m_hrs_status === "5") {
        $('.pre_hrs_class').prop('readonly', false);
    }
}

function getSelectReimbSection() {
    if (m_reimb_status === null || m_reimb_status === "1" || m_reimb_status === "5") {
        $('.pre_reimb_class').prop('readonly', false);
        $('.fs_list_class').prop('disabled', false);
    }
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
            
            str_comments += login_name + " : " + dt_stamp + "<br/>" + note.replace(/\n/g, "</br>") + "<br/><br/>";
        }
        $("#comments_history").append(str_comments);
    }
}

////////////////////////////////////////////////////////////////////////////////
function setCurrentDate() {
    var today = new Date();
    var day = today.getDate();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    var curDate = mon + "/" + day + "/" + yr;
    $('#current_date').val(curDate);
}

function getActState() {
    var act_state = new Array();
    act_state = db_getActState();
    
    var state_html = "<option value='Select...'>Select...</option>";
    for(var i = 0; i < act_state.length; i++) { 
        var state_id = act_state[i][0];
        var state = act_state[i]['State'];
        state_html += "<option value='" + state_id + "'>" + state + "</option>";
    }
    
    $("#activity_state").append(state_html);
    $('#activity_state').selectpicker('refresh');
}

function getResourceType() {
    var resource_type = new Array();
    resource_type = db_getResourceType();
    
    var resource_html = "<option value='Select...'>Select...</option>";
    for(var i = 0; i < resource_type.length; i++) { 
        var resource = resource_type[i][1];
        resource_html += "<option value='" + resource + "'>" + resource + "</option>";
    }
    
    $("#resource_type").append(resource_html);
    $('.selectpicker').selectpicker('refresh');
}

function getResourceTypeID(ResourceType) {
    var resource_type = new Array();
    resource_type = db_getResourceTypeID(ResourceType);
    
    if (resource_type.length === 1) {
        return resource_type[0][0];
    }
    else {
        return "";
    }
}

function getPDSystem() {    
    var fiscal_yrs = $('#fiscal').val();
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

function getActiveFundingSrcList() {
    var result = new Array();
    result = db_getFundSrcTypeActiveList();
    
    $("#active_fund_src_list").empty();
    var fs_list_html = "";
    for(var i = 0; i < result.length; i++) {
        fs_list_html += getActiveFundingSrcListHTML(i, result[i]['FundSrcTypeID'], result[i]['FundSrcType']);
    }
    $("#active_fund_src_list").append(fs_list_html);
}

function getActiveFundingSrcListHTML(index, fund_src_type_id, fund_src_type) {
    var str_html = "";
    var new_row_start = "<div class='row' style='padding-top: 5px;'>";
    var new_row_end = "</div>";
    
    str_html += "<div class='span1 text-center' style='padding-top: 2px;'><input type='checkbox' class='fs_list_class' id='fs_selected_" + fund_src_type_id + "'></div>";
    str_html += "<div class='span3' style='padding-top: 5px;' id='fs_name_" + fund_src_type_id + "'>" + fund_src_type + "</div>";
    
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

////////////////////////////////////////////////////////////////////////////////
function justNarrativeAttachFile(PDRequestID) {
    var file = $('#just_narrative_file').get(0).files[0]; 
    var file_val = $('#just_narrative_file').val();
    if (file_val === "") {
        return false;
    }
    
    var f_extension = getFileExtension(file.name);
    if (f_extension !== "pdf") {
        alert("Only pdf file can upload");
        return false;
    }

    var file_data = new FormData();  
    var php_flname = PDRequestID + ":PDRequestID_" + just_narrative_file_index + ":fileIndex_" + file.name;
    file_data.append("files[]", file, php_flname); 

    var resultID = uploadAttachFileJustNarrative(file_data);
    if (resultID === "") {
        return false;
    }
    else {
        var file_link_name = "narrative_" + PDRequestID + "_" + just_narrative_file_index + "_" + file.name;
        var html = justNarrativeAttachFileHTML(just_narrative_file_index, file_link_name, file.name);
        
        $('#just_narrative_attached_list').append(html);        
        $('#just_narrative_file').filestyle('clear');
        
        return resultID;
    }
}

function justNarrativeAttachFileHTML(index, file_link_name, file_name) {    
    var html = "<div class='row' id='just_narr_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset3' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='just_narr_file_view_" + index + "'>" + file_name + "</a></div>";
    html += "<div class='span2'><button class='btn btn-danger span2' id='just_narr_file_remove_btn_" + index + "'>Remove File</button></div>";
    html += "</div>";
    
    just_narrative_file_index++;
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////
function preCalculateTotalHrs() {
    var pre_pres_hr = Number($('#pre_presenter_hrs').html());
    var pre_part_hr = Number($('#pre_participant_hrs').val());
    var pre_total_hr = pre_pres_hr + pre_part_hr;
    if (pre_total_hr > 0) {
        $('#pre_total_hrs').html(pre_total_hr.toFixed(2));
    }
    else {
        $('#pre_total_hrs').html('');
    }
}

////////////////////////////////////////////////////////////////////////////////
function preCalculateSubTotal() {
    var pre_reg_fee = Number(revertDollar($('#pre_reg_fee').val()));
    var pre_travel_cost = Number(revertDollar($('#pre_travel_cost').val()));
    var pre_mileage_cost = Number(revertDollar($('#pre_mileage_cost').html()));
    var pre_lodging_cost = Number(revertDollar($('#pre_lodging_cost').val()));
    var pre_breakfast_cost = Number(revertDollar($('#pre_breakfast_cost').html()));
    var pre_lunch_cost = Number(revertDollar($('#pre_lunch_cost').html()));
    var pre_dinner_cost = Number(revertDollar($('#pre_dinner_cost').html()));
    var pre_other_cost = Number(revertDollar($('#pre_other_cost').val()));
    
    var pre_sub_total = pre_reg_fee + pre_travel_cost + pre_mileage_cost + pre_lodging_cost + pre_breakfast_cost + pre_lunch_cost + pre_dinner_cost + pre_other_cost;
    if (pre_sub_total > 0) {
        $('#pre_sub_total').html(formatDollar(pre_sub_total, 2));
    }
    else {
        $('#pre_sub_total').html('');
    }
}

function preCalculateTotalCost() {
    var pre_sub_total = Number(revertDollar($('#pre_sub_total').html()));
    var pre_funding_other = Number(revertDollar($('#pre_funding_other').val()));    
    var pre_total_cost = pre_sub_total - pre_funding_other;
    if (pre_total_cost === 0) {
        $('#pre_total_cost').html('');
        $('#pre_total_amount_request').html('');
    }
    else {
        $('#pre_total_cost').html(formatDollar(pre_total_cost, 2));
        $('#pre_total_amount_request').html(formatDollar(pre_total_cost, 2));
    }
}

////////////////////////////////////////////////////////////////////////////////
function getFileIndex(fl_name, f_name) {
    var temp = fl_name.replace("narrative_" + PDRequestID + "_", "");
    temp = temp.replace("_" + f_name, "");
    
    return temp;
}

////////////////////////////////////////////////////////////////////////////////
function addLogHistorySaveAsDraft() {    
    var log_msg = "";
    if (ResourceTypeID === "1") {
        if (m_hrs_status === "4") {
            log_msg += "Hours Post-activity save as draft";
        }
        else {
            log_msg += "Hours " + $('#hrs_current_step').html() + " save as draft";
        }
    }
    else if (ResourceTypeID === "2") {
        if ((m_reimb_status === "4" || m_reimb_status === "7")) {
            log_msg += "Reimbursement Post-activity save as draft";
        }
        else {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " save as draft";
        }
    }
    else {
        if (m_hrs_status === "4") {
            log_msg += "Hours Post-activity save as draft\n";
        }
        else {
            log_msg += "Hours " + $('#hrs_current_step').html() + " save as draft\n";
        }
        
        if (m_reimb_status === "4" || m_reimb_status === "7") {
            log_msg += "Reimbursement Post-activity save as draft\n";
        }
        else {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " save as draft\n";
        }
    }
    
    db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), log_msg.trim());
}

function addLogHistorySubmitted() {      
    var log_msg = "";
    if (ResourceTypeID === "1") {
        if (m_hrs_status === "4") {
            log_msg += "Hours Post-activity submitted";
        }
        else if (m_hrs_status === null || m_hrs_status === "1" || m_hrs_status === "5") {
            log_msg += "Hours " + $('#hrs_current_step').html() + " submitted";
        }
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_status === "4" || m_reimb_status === "7") {
            log_msg += "Reimbursement Post-activity submitted";
        }
        else if (m_reimb_status === null || m_reimb_status === "1" || m_reimb_status === "5") {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " submitted";
        }
    }
    else {
        if (m_hrs_status === "4") {
            log_msg += "Hours Post-activity submitted\n";
        }
        else if (m_hrs_status === null || m_hrs_status === "1" || m_hrs_status === "5") {
            log_msg += "Hours " + $('#hrs_current_step').html() + " submitted\n";
        }
        
        if (m_reimb_status === "4" || m_reimb_status === "7") {
            log_msg += "Reimbursement Post-activity submitted";
        }
        else if (m_reimb_status === null || m_reimb_status === "1" || m_reimb_status === "5") {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " submitted";
        }
    }
    
    db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), log_msg.trim());
}

////////////////////////////////////////////////////////////////////////////////
function sendPreActivityCreatorSubmitted() {
    var login_email = $('#email').val();
    var login_name = $('#requestor').val();
    var act_title = $('#activity_title').val();
    
    var subject = "Professional Development Request has been submitted";
    var message = "Dear " + login_name + ", <br/><br/>";
    message += "Your Pre-activity Professional Development Request, title <b>" + act_title + "</b> has been submitted. ";
    message += "Your request will be forwarded to the IVC Professional Development Officer and Academic Affairs Committee. ";
    message += "You will receive an email notification of the decision regarding your application within in 10-15 business days. ";
    message += "In some circumstances, additional processing time may be required.<br/><br/>";
    message += "Please use the link below to review the status of your submission at any time.<br/><br/>";
    
    var str_url = sessionStorage.getItem('m_parentSite') + "/PDRequest/Login.html";
    message += "<a href='" + str_url + "'>Professional Development Request</a><br/><br/>";
    message += "Thank you.<br/>";
    message += "IVC Professional Development Officer<br/>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(login_email, login_name, subject, message);
}

function sendPreActivityApproverSubmitted() {
    var approver_email = "dderoulet@ivc.edu";
    var approver_name = "Daniel DeRoulet";
    var act_title = $('#activity_title').val();
    
    var subject = "New Pre-activity Professional Development Request has been assigned to you";
    var message = "Dear Daniel DeRoulet,<br/><br/>";
    message += "A New Pre-activity Professional Development Request, title <b>" + act_title + "</b> has been assigned to you for approval. ";
    message += "Please use the link below to start the approval process.<br/><br/>";
    
    var str_url = sessionStorage.getItem('m_parentSite') + "/PDRequest/Login.html";
    message += "<a href='" + str_url + "'>Professional Development Request</a><br/><br/>";
    message += "Thank you.";
    
    proc_sendEmail(approver_email, approver_name, subject, message);
}
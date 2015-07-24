////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {     
        if (sessionStorage.getItem('m_PDRequestID') !== null) {
            setDefaultSetting();
            getPDSystem();
            
            PDRequestID = sessionStorage.getItem('m_PDRequestID');
            getSelectPDRequest();
            getSelectPDReqUserInfo();
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
    $('#logout').click(function() {
        var parent_site = sessionStorage.getItem('m_parentSite');
        sessionStorage.clear();
        window.open(parent_site, '_self');
    });
    
    $('#home').click(function() {
        sessionStorage.removeItem("m_PDRequestID");
        window.open('home.html', '_self');
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
    
    // justification narrative add file click //////////////////////////////////
    $('#btn_post_activity_info_1_add').click(function() {
        paReqInfo1AttachFile(PDRequestID);
    });
    
    $(document).on('click', 'button[id^="paReqInfo_1_file_remove_btn_"]', function() {
        var currentId = $(this).attr('id');       
        var ID = currentId.replace("paReqInfo_1_file_remove_btn_", "");
        var file_name = $("#paReqInfo_1_file_view_" + ID).html();
        
        var file_link_name = "post_info_1_" + PDRequestID + "_" + ID + "_" + file_name;
        if (deleteAttachFilePAReqInfo1(file_link_name)) {
            var fileID = "paReqInfo_1_file_" + ID;
            $("#" + fileID).remove();
            $("#post_activity_info_1_file").filestyle('clear');
            $('#post_activity_info_1_file').val("");
        }
    });
    
    // justification narrative add file click //////////////////////////////////
    $('#btn_post_activity_info_2_add').click(function() {
        paReqInfo2AttachFile(PDRequestID);
    });
    
    $(document).on('click', 'button[id^="paReqInfo_2_file_remove_btn_"]', function() {
        var currentId = $(this).attr('id');       
        var ID = currentId.replace("paReqInfo_2_file_remove_btn_", "");
        var file_name = $("#paReqInfo_2_file_view_" + ID).html();
        
        var file_link_name = "post_info_2_" + PDRequestID + "_" + ID + "_" + file_name;
        if (deleteAttachFilePAReqInfo2(file_link_name)) {
            var fileID = "paReqInfo_2_file_" + ID;
            $("#" + fileID).remove();
            $("#post_activity_info_2_file").filestyle('clear');
            $('#post_activity_info_2_file').val("");
        }
    });
    
    // pd request hours fields change //////////////////////////////////////////    
    $('#post_input_hrs').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);     
        var new_val = input_val * 3;
        $(this).val(input_val);
        $('#post_presenter_hrs').html(new_val.toFixed(2));
        postCalculateTotalHrs();
    }); 
    
    $('#post_participant_hrs').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);        
        $(this).val(input_val);
        postCalculateTotalHrs();
    });
    
    // pd request reimbursement fields change //////////////////////////////////    
    $('#post_reg_fee').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));       
        $(this).val(formatDollar(input_val, 2));
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_travel_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_input_mileage').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#post_mileage_cost').html('$0.00');
        }
        else {       
            $(this).val(input_val);
            $('#post_mileage_cost').html(formatDollar(sys_mileage_amt * input_val, 2));
        }
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_lodging_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_input_breakfast').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#post_breakfast_cost').html('$0.00');
        }
        else {    
            $(this).val(input_val);
            $('#post_breakfast_cost').html(formatDollar(sys_breakfast_amt * input_val, 2));
        }
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_input_lunch').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#post_lunch_cost').html('$0.00');
        }
        else {     
            $(this).val(input_val);
            $('#post_lunch_cost').html(formatDollar(sys_lunch_amt * input_val, 2));
        }
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_input_dinner').change(function() {      
        var input_val = Math.round(Number($(this).val().replace(/[^0-9\.]/g, '')));
        if (input_val < 1) {
            $('#post_dinner_cost').html('$0.00');
        }
        else {  
            $(this).val(input_val);
            $('#post_dinner_cost').html(formatDollar(sys_dinner_amt * input_val, 2));
        }
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_other_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $('#post_funding_other').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
        postCalculateSubTotal();
        postCalculateTotalCost();
    });
    
    $("input[name=rdo_fs_approval]:radio").change(function () {
        postCalculateTotalCost();
    });
    
    // user save as draft click ////////////////////////////////////////////////
    $('#btn_save_draft').click(function() {         
        updateNarrative();
        updatePAReqInfo1();
        updatePAReqInfo2();
        updateRequestDetail();
        updateComments(false);
        
        // insert log
        db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "post-activity save as draft");
        
        window.open('home.html', '_self');
    });
    
    // user submit click ///////////////////////////////////////////////////////
    $('#btn_submit').click(function() {
        var err = formMainValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        updateNarrative();
        updatePAReqInfo1();
        updatePAReqInfo2();
        updateRequestDetail();
        updateComments(true);
        db_updatePDRequestPostSubDate(PDRequestID);
        
        updateStep(2);
        updateStatus(2);
        addTransaction();
        
        sendPostActivityCreatorSubmitted();
        if (StatusID === "5") {
            sendPostActivityApproverMoreInfo();
        }
        else {
            sendPostActivityApproverSubmitted();
        }
        
        // insert log
        db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), "submit post-activity");
        
        window.open('home.html', '_self');
    });
    
    $('#ckb_comments').change(function() {      
        var ckb_comm = ($(this).is(':checked') ? true : false);
        if (ckb_comm) {
            $('#comments_block').show();
        }
        else {
            $('#comments_block').hide();
        }
    });
    
    // auto size
    $('#activity_description').autosize();
    $('#just_narrative_descrip').autosize();
    $('#post_activity_info_1_descrip').autosize();
    $('#post_activity_info_2_descrip').autosize();
    $('#user_comments').autosize();
    
    // bootstrap filestyle
    $(":file").filestyle({classButton: "btn btn-primary"});
    
    // popover
    $('#other_cost_description').popover({content:"Parking, Air Port Shuttle, Internet etc", placement:"top"});
});

////////////////////////////////////////////////////////////////////////////////
function formJustificationValidation() {
    var err = "";
    var just_area_1 = ($('#just_area_1').is(':checked') ? true : false);
    var just_area_2 = ($('#just_area_2').is(':checked') ? true : false);
    var just_area_3 = ($('#just_area_3').is(':checked') ? true : false);
    var just_area_4 = ($('#just_area_4').is(':checked') ? true : false);
    var just_area_5 = ($('#just_area_5').is(':checked') ? true : false);
    var just_area_6 = ($('#just_area_6').is(':checked') ? true : false);
    var just_area_7 = ($('#just_area_7').is(':checked') ? true : false);
    var just_area_8 = ($('#just_area_8').is(':checked') ? true : false);
    var just_area_9 = ($('#just_area_9').is(':checked') ? true : false);
    
    if (just_area_1 === false && just_area_2 === false && just_area_3 === false
            && just_area_4 === false && just_area_5 === false && just_area_6 === false
            && just_area_7 === false && just_area_8 === false && just_area_9 === false) {
        err = "Minimum one Justification Area is a required\n";
    }
    
    return err;
}

function formMainValidation() {
    var err = "";
    
    if ($('#just_narrative_descrip').val().replace(/\s+/g, '') === "") {
        err += "Justification Narrative is a required field\n";
    }
    if ($('#post_activity_info_1_descrip').val().replace(/\s+/g, '') === "") {
        err += "Post Activity Required Information section one is a required field\n";
    }
    if ($('#post_activity_info_2_descrip').val().replace(/\s+/g, '') === "") {
        err += "Post Activity Required Information section two is a required field\n";
    }
    err += formJustificationValidation();

    return err;
}

////////////////////////////////////////////////////////////////////////////////
function setDefaultSetting() {
    $('#request_hours').hide();
    $('#request_reimbursement').hide();
    $('#comments_block').hide();
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
function addPAReqInfo1() {
    if (PAReqInfo1ID === "" && PDRequestID !== "") {
        var result_ID = db_insertPAReqInfo1(PDRequestID);
        if (result_ID !== "") {
            PAReqInfo1ID = result_ID;
        }
    }
}

function addPAReqInfo2() {
    if (PAReqInfo2ID === "" && PDRequestID !== "") {
        var result_ID = db_insertPAReqInfo2(PDRequestID);
        if (result_ID !== "") {
            PAReqInfo2ID = result_ID;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateNarrative() {
    var narrative = textReplaceApostrophe($('#just_narrative_descrip').val());

    db_updateNarrative(PDRequestID, narrative);
}

function updatePAReqInfo1() {
    addPAReqInfo1();
    var pa_req_info_1 = textReplaceApostrophe($('#post_activity_info_1_descrip').val());

    db_updatePAReqInfo1(PDRequestID, pa_req_info_1);
}

function updatePAReqInfo2() {
    addPAReqInfo2();
    var pa_req_info_2 = textReplaceApostrophe($('#post_activity_info_2_descrip').val());

    db_updatePAReqInfo2(PDRequestID, pa_req_info_2);
}

function updateRequestDetail() {
    if (ResourceTypeID === "1") {
        updatePDReqHoursPostActivity();
    }
    else if (ResourceTypeID === "2") {
        updatePDReqReimbPostActivity();
    }
    else {
        updatePDReqHoursPostActivity();
        updatePDReqReimbPostActivity();
    }
}

function updatePDReqHoursPostActivity() {
    var post_input_hrs = Number($('#post_input_hrs').val());
    var post_pres_hrs = Number($('#post_presenter_hrs').html());
    var post_part_hrs = Number($('#post_participant_hrs').val());
    var post_total_hrs = Number($('#post_total_hrs').html());
    
    db_updatePDReqHoursPostActivity(PDRequestID, post_input_hrs, post_pres_hrs, post_part_hrs, post_total_hrs);
}

function updatePDReqReimbPostActivity() {
    var post_reg_fee = revertDollar($('#post_reg_fee').val());
    var post_travel_cost = revertDollar($('#post_travel_cost').val());
    var post_input_mileage = Number($('#post_input_mileage').val());
    var post_mileage_cost = revertDollar($('#post_mileage_cost').html());
    var post_lodging_cost = revertDollar($('#post_lodging_cost').val());
    var post_input_breakfast = Number($('#post_input_breakfast').val());
    var post_breakfast_cost = revertDollar($('#post_breakfast_cost').html());
    var post_input_lunch = Number($('#post_input_lunch').val());
    var post_lunch_cost = revertDollar($('#post_lunch_cost').html());
    var post_input_dinner = Number($('#post_input_dinner').val());
    var post_dinner_cost = revertDollar($('#post_dinner_cost').html());
    var other_cost_description = textReplaceApostrophe($('#other_cost_description').val());
    var post_other_cost = revertDollar($('#post_other_cost').val());
    var post_sub_total = revertDollar($('#post_sub_total').html());
    var funding_other_source = textReplaceApostrophe($('#funding_other_source').val());
    var fs_approved = $('input[name="rdo_fs_approval"]:checked').val();
    var fs_comments = textReplaceApostrophe($('#fs_comments').val());
    var post_funding_other = revertDollar($('#post_funding_other').val());
    var post_total_cost = revertDollar($('#post_total_cost').html());
    var post_total_amount_request = revertDollar($('#post_total_amount_request').html());
    
    db_updatePDReqReimbPostActivity(PDRequestID, post_reg_fee, post_travel_cost, post_input_mileage, post_mileage_cost, post_lodging_cost, post_input_breakfast, post_breakfast_cost, 
                                    post_input_lunch, post_lunch_cost, post_input_dinner, post_dinner_cost, other_cost_description, post_other_cost, 
                                    post_sub_total, funding_other_source, fs_approved, fs_comments, post_funding_other, post_total_cost, post_total_amount_request);
}

function updateStep(new_step_ID) {
    if (PDRequestID !== "") {
        db_updatePDRequestStep(PDRequestID, new_step_ID);
    }
}

function updateStatus(new_status_ID) {
    if (PDRequestID !== "") {
        db_updatePDRequestStatus(PDRequestID, new_status_ID);
    }
}

function updateComments(submit) {
    var ckb_comm = false;
    var comments = "";
    if (submit === false) {
        ckb_comm = ($('#ckb_comments').is(':checked') ? true : false);
        comments = textReplaceApostrophe($('#user_comments').val());
    }
    
    db_updatePDRequestComments(PDRequestID, comments, ckb_comm);
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

function getSelectPDRequest() {
    var pd_request = new Array();
    pd_request = db_getPDRequest(PDRequestID);
    
    if (pd_request.length === 1) {
        $('#activity_title').html(pd_request[0]['ActTitle']);
        if (pd_request[0]['FiscalYrs'] !== null) {
            $('#fiscal').html(pd_request[0]['FiscalYrs']);
        }
        $('#activity_organizer').html(pd_request[0]['ActOrganizer']);
        $('#activity_city').html(pd_request[0]['ActCity']);
        $('#activity_state').html(getActStateByID(pd_request[0]['ActStateID']));
        $('#activity_description').html(pd_request[0]['ActDescrip'].replace(/\n/g, "<br>"));
        $('#activity_link').html(pd_request[0]['ActLink']);
        $('#start_date').html(pd_request[0]['StartDate']);
        $('#end_date').html(pd_request[0]['EndDate']);
        $('#current_date').html(pd_request[0]['CreateDate']);
        $('#user_comments').val(pd_request[0]['Comments']);
        if (pd_request[0]['ckbCom'] === "1") {
            $("#ckb_comments").prop('checked', true);
            $('#comments_block').show();
        }
        
        LoginID = pd_request[0]['LoginID'];
        ResourceTypeID = pd_request[0]['ResourceTypeID'];
        StatusID = pd_request[0]['StatusID'];
        PDReqStepID = pd_request[0]['PDReqStepID'];
    }
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
            
            getSelectStepStatus();
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
        $('#just_narrative_descrip').val(narrative[0]['Narrative']);
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

function getSelectPAReqInfo1() {
    var pa_req_info_1 = new Array();
    pa_req_info_1 = db_getPAReqInfo1(PDRequestID);
    
    if (pa_req_info_1.length === 1) {
        PAReqInfo1ID = pa_req_info_1[0][0];
        $('#post_activity_info_1_descrip').val(pa_req_info_1[0]['PAReqInfo1']);
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
            var f_index = getPA1FileIndex(fl_name, f_name);
            var html = paReqInfo1AttachFileHTML(f_index, fl_name, f_name);
            $("#post_activity_info_1_attached_list").append(html);
        }
    }
}

function getSelectPAReqInfo2() {
    var pa_req_info_2 = new Array();
    pa_req_info_2 = db_getPAReqInfo2(PDRequestID);
    
    if (pa_req_info_2.length === 1) {
        PAReqInfo2ID = pa_req_info_2[0][0];
        $('#post_activity_info_2_descrip').val(pa_req_info_2[0]['PAReqInfo2']);
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
            var f_index = getPA2FileIndex(fl_name, f_name);
            var html = paReqInfo2AttachFileHTML(f_index, fl_name, f_name);
            $("#post_activity_info_2_attached_list").append(html);
        }
    }
}

function getSelectPDReqHours() {
    var pd_req_hours = new Array();
    pd_req_hours = db_getPDReqHours(PDRequestID);
    if (pd_req_hours.length === 1) {
        PDReqHoursID = pd_req_hours[0][0];
        // pre activity fields
        if(Number(pd_req_hours[0]['PreInputHr']) > 0) {
            $('#pre_input_hrs').html(pd_req_hours[0]['PreInputHr']);
        }
        if(Number(pd_req_hours[0]['PrePresHr']) > 0) {
            $('#pre_presenter_hrs').html(pd_req_hours[0]['PrePresHr']);
        }
        if(Number(pd_req_hours[0]['PrePartHr']) > 0) {
            $('#pre_participant_hrs').html(pd_req_hours[0]['PrePartHr']);
        }
        if(Number(pd_req_hours[0]['PreTotalHr']) > 0) {
            $('#pre_total_hrs').html(pd_req_hours[0]['PreTotalHr']);
        }
        if(Number(pd_req_hours[0]['PreAppHr']) > 0) {
            $('#pre_app_hrs_user').html(pd_req_hours[0]['PreAppHr']);
        }
        if(Number(pd_req_hours[0]['PreNotAppHr']) > 0) {
            $('#pre_not_app_hrs').html(pd_req_hours[0]['PreNotAppHr']);
        }
        // post activity fields
        if(Number(pd_req_hours[0]['PostInputHr']) > 0) {
            $('#post_input_hrs').val(pd_req_hours[0]['PostInputHr']);
        }
        if(Number(pd_req_hours[0]['PostPresHr']) > 0) {
            $('#post_presenter_hrs').html(pd_req_hours[0]['PostPresHr']);
        }
        if(Number(pd_req_hours[0]['PostPartHr']) > 0) {
            $('#post_participant_hrs').val(pd_req_hours[0]['PostPartHr']);
        }
        if(Number(pd_req_hours[0]['PostTotalHr']) > 0) {
            $('#post_total_hrs').html(pd_req_hours[0]['PostTotalHr']);
        }
    }
}

function getSelectPDReqReimb() {
    var pd_req_reimb = new Array();
    pd_req_reimb = db_getPDReqReimb(PDRequestID);
    if (pd_req_reimb.length === 1) {
        PDReqReimbID = pd_req_reimb[0][0];
        // pre activity fields
        var pre_reg_fee = Number(pd_req_reimb[0]['PreReqFee']);
        if(pre_reg_fee > 0) {
            $('#pre_reg_fee').html(formatDollar(pre_reg_fee, 2));
        }
        var pre_travel = Number(pd_req_reimb[0]['PreTravel']);
        if(pre_travel > 0) {
            $('#pre_travel_cost').html(formatDollar(pre_travel, 2));
        }
        var pre_mileage = Number(pd_req_reimb[0]['PreMileage']);
        if(pre_mileage > 0) {
            $('#pre_input_mileage').html(pre_mileage);
        }
        var pre_mil_cost = Number(pd_req_reimb[0]['PreMilCost']);
        if(pre_mil_cost > 0) {
            $('#pre_mileage_cost').html(formatDollar(pre_mil_cost, 2));
        }
        var pre_lodging = Number(pd_req_reimb[0]['PreLodging']);
        if(pre_lodging > 0) {
            $('#pre_lodging_cost').html(formatDollar(pre_lodging, 2));
        }
        var pre_num_brk = Number(pd_req_reimb[0]['PreNumBrk']);
        if(pre_num_brk > 0) {
            $('#pre_input_breakfast').html(pre_num_brk);
        }
        var pre_brk_cost = Number(pd_req_reimb[0]['PreBrkCost']);
        if(pre_brk_cost > 0) {
            $('#pre_breakfast_cost').html(formatDollar(pre_brk_cost, 2));
        }
        var pre_num_lun = Number(pd_req_reimb[0]['PreNumLun']);
        if(pre_num_lun > 0) {
            $('#pre_input_lunch').html(pre_num_lun);
        }
        var pre_lun_cost = Number(pd_req_reimb[0]['PreLunCost']);
        if(pre_lun_cost > 0) {
            $('#pre_lunch_cost').html(formatDollar(pre_lun_cost, 2));
        }
        var pre_num_din = Number(pd_req_reimb[0]['PreNumDin']);
        if(pre_num_din > 0) {
            $('#pre_input_dinner').html(pre_num_din);
        }
        var pre_din_cost = Number(pd_req_reimb[0]['PreDinCost']);
        if(pre_din_cost > 0) {
            $('#pre_dinner_cost').html(formatDollar(pre_din_cost, 2));
        }
        
        $('#other_cost_description').val(pd_req_reimb[0]['OtherSource']);
        
        var pre_oth_cost = Number(pd_req_reimb[0]['PreOthCost']);
        if(pre_oth_cost > 0) {
            $('#pre_other_cost').html(formatDollar(pre_oth_cost, 2));
        }
        var pre_sub_total = Number(pd_req_reimb[0]['PreSubTotal']);
        if(pre_sub_total > 0) {
            $('#pre_sub_total').html(formatDollar(pre_sub_total, 2));
        }
        
        $('#funding_other_source').val(pd_req_reimb[0]['FundingSource']);
        var fs_approved = pd_req_reimb[0]['FSApproved'];
        if (fs_approved === "1") {
            $('#fs_approved_2').prop("checked", true);
        }
        else {
            $('#fs_approved_1').prop("checked", true);
        }
        $('#fs_comments').val(pd_req_reimb[0]['FSComments']);
        
        var pre_fun_cost = Number(pd_req_reimb[0]['PreFunCost']);
        if(pre_fun_cost > 0) {
            $('#pre_funding_other').html(formatDollar(pre_fun_cost, 2));
        }
        var pre_total_cost = Number(pd_req_reimb[0]['PreTotalCost']);
        if(pre_total_cost > 0) {
            $('#pre_total_cost').html(formatDollar(pre_total_cost, 2));
        }
        var pre_total_amt_request = Number(pd_req_reimb[0]['PreTotalAmtRequest']);
        if(pre_total_amt_request > 0) {
            $('#pre_total_amount_request').html(formatDollar(pre_total_amt_request, 2));
        }
        var pre_total_amt_approved = Number(pd_req_reimb[0]['PreTotalAmtApproved']);
        if(pre_total_amt_request > 0) {
            $('#pre_total_amount_approved').html(formatDollar(pre_total_amt_approved, 2));
        }
        var pre_total_amt_not_approved = Number(pd_req_reimb[0]['PreTotalAmtNotApproved']);
        if(pre_total_amt_not_approved > 0) {
            $('#pre_total_amount_not_approved').html(formatDollar(pre_total_amt_not_approved, 2));
        }
        
        // post activity fields
        var post_reg_fee = Number(pd_req_reimb[0]['PostReqFee']);
        if(post_reg_fee > 0) {
            $('#post_reg_fee').val(formatDollar(post_reg_fee, 2));
        }
        var post_travel = Number(pd_req_reimb[0]['PostTravel']);
        if(post_travel > 0) {
            $('#post_travel_cost').val(formatDollar(post_travel, 2));
        }
        var post_mileage = Number(pd_req_reimb[0]['PostMileage']);
        if(post_mileage > 0) {
            $('#post_input_mileage').val(post_mileage);
        }
        var post_mil_cost = Number(pd_req_reimb[0]['PostMilCost']);
        if(post_mil_cost > 0) {
            $('#post_mileage_cost').html(formatDollar(post_mil_cost, 2));
        }
        var post_lodging = Number(pd_req_reimb[0]['PostLodging']);
        if(post_lodging > 0) {
            $('#post_lodging_cost').val(formatDollar(post_lodging, 2));
        }
        var post_num_brk = Number(pd_req_reimb[0]['PostNumBrk']);
        if(post_num_brk > 0) {
            $('#post_input_breakfast').val(post_num_brk);
        }
        var post_brk_cost = Number(pd_req_reimb[0]['PostBrkCost']);
        if(post_brk_cost > 0) {
            $('#post_breakfast_cost').html(formatDollar(post_brk_cost, 2));
        }
        var post_num_lun = Number(pd_req_reimb[0]['PostNumLun']);
        if(post_num_lun > 0) {
            $('#post_input_lunch').val(post_num_lun);
        }
        var post_lun_cost = Number(pd_req_reimb[0]['PostLunCost']);
        if(post_lun_cost > 0) {
            $('#post_lunch_cost').html(formatDollar(post_lun_cost, 2));
        }
        var post_num_din = Number(pd_req_reimb[0]['PostNumDin']);
        if(post_num_din > 0) {
            $('#post_input_dinner').val(post_num_din);
        }
        var post_din_cost = Number(pd_req_reimb[0]['PostDinCost']);
        if(post_din_cost > 0) {
            $('#post_dinner_cost').html(formatDollar(post_din_cost, 2));
        }
        var post_oth_cost = Number(pd_req_reimb[0]['PostOthCost']);
        if(post_oth_cost > 0) {
            $('#post_other_cost').val(formatDollar(post_oth_cost, 2));
        }
        var post_sub_total = Number(pd_req_reimb[0]['PostSubTotal']);
        if(post_sub_total > 0) {
            $('#post_sub_total').html(formatDollar(post_sub_total, 2));
        }
        var post_fun_cost = Number(pd_req_reimb[0]['PostFunCost']);
        if(post_fun_cost > 0) {
            $('#post_funding_other').val(formatDollar(post_fun_cost, 2));
        }
        var post_total_cost = Number(pd_req_reimb[0]['PostTotalCost']);
        if(post_total_cost > 0) {
            $('#post_total_cost').html(formatDollar(post_total_cost, 2));
        }
        var post_total_amt_request = Number(pd_req_reimb[0]['PostTotalAmtRequest']);
        if(post_total_amt_request > 0) {
            $('#post_total_amount_request').html(formatDollar(post_total_amt_request, 2));
        }
        var post_total_amt_approved = Number(pd_req_reimb[0]['PostTotalAmtApproved']);
        if(post_total_amt_approved > 0) {
            $('#post_total_amount_approved').html(formatDollar(post_total_amt_approved, 2));
        }
    }
    
    setPDLimitSummary();
}

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

function getSelectStepStatus() {
    var pd_step_status = new Array();
    pd_step_status = db_getPDRequest(PDRequestID);
    if (pd_step_status.length === 1) {
        PDReqStepID = pd_step_status[0]['PDReqStepID'];
        var pd_req_step_list = new Array();
        pd_req_step_list = db_getPDReqStep(PDReqStepID);
        if (pd_req_step_list.length === 1) {
            $('#current_step').html(pd_req_step_list[0][1]);
        }
        
        StatusID = pd_step_status[0]['StatusID'];
        var status_list = new Array();
        status_list = db_getStatus(StatusID);
        if (status_list.length === 1) {
            $('#current_status').html(status_list[0][1]);
        }
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
            
            str_comments += login_name + " : " + dt_stamp + "<br>" + note.replace(/\n/g, "<br>") + "<br><br>";
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
        var state = act_state[i][2];
        state_html += "<option value='" + state_id + "'>" + state + "</option>";
    }
    
    $("#activity_state").append(state_html);
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

////////////////////////////////////////////////////////////////////////////////
function justNarrativeAttachFile(PDRequestID) {
    var file = $('#just_narrative_file').get(0).files[0]; 
    var file_val = $('#just_narrative_file').val();
    if (file_val === "") {
        return "No Attachment";
    }
    
    var f_extension = getFileExtension(file.name);
    if (f_extension !== "pdf") {
        alert("Only pdf file can upload");
        return "No PDF";
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
        
        $("#just_narrative_attached_list").append(html);
        $("#just_narrative_file").filestyle('clear');
        
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
function paReqInfo1AttachFile(PDRequestID) {
    var file = $('#post_activity_info_1_file').get(0).files[0]; 
    var file_val = $('#post_activity_info_1_file').val();
    if (file_val === "") {
        return "No Attachment";
    }
    
    var f_extension = getFileExtension(file.name);
    if (f_extension !== "pdf") {
        alert("Only pdf file can upload");
        return "No PDF";
    }

    var file_data = new FormData();  
    var php_flname = PDRequestID + ":PDRequestID_" + post_activity_info_1_file_index + ":fileIndex_" + file.name;
    file_data.append("files[]", file, php_flname); 

    var resultID = uploadAttachFilePostInfo1(file_data);
    if (resultID === "") {
        return false;
    }
    else {
        var file_link_name = "post_info_1_" + PDRequestID + "_" + post_activity_info_1_file_index + "_" + file.name;
        var html = paReqInfo1AttachFileHTML(post_activity_info_1_file_index, file_link_name, file.name);
        
        $("#post_activity_info_1_attached_list").append(html);
        $("#post_activity_info_1_file").filestyle('clear');
        
        return resultID;
    }
}

function paReqInfo1AttachFileHTML(index, file_link_name, file_name) {    
    var html = "<div class='row' id='paReqInfo_1_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset3' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='paReqInfo_1_file_view_" + index + "'>" + file_name + "</a></div>";
    html += "<div class='span2'><button class='btn btn-danger span2' id='paReqInfo_1_file_remove_btn_" + index + "'>Remove File</button></div>";
    html += "</div>";
    
    post_activity_info_1_file_index++;
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////
function paReqInfo2AttachFile(PDRequestID) {
    var file = $('#post_activity_info_2_file').get(0).files[0]; 
    var file_val = $('#post_activity_info_2_file').val();
    if (file_val === "") {
        return "No Attachment";
    }
    
    var f_extension = getFileExtension(file.name);
    if (f_extension !== "pdf") {
        alert("Only pdf file can upload");
        return "No PDF";
    }

    var file_data = new FormData();  
    var php_flname = PDRequestID + ":PDRequestID_" + post_activity_info_2_file_index + ":fileIndex_" + file.name;
    file_data.append("files[]", file, php_flname); 

    var resultID = uploadAttachFilePostInfo2(file_data);
    if (resultID === "") {
        return false;
    }
    else {
        var file_link_name = "post_info_2_" + PDRequestID + "_" + post_activity_info_2_file_index + "_" + file.name;
        var html = paReqInfo2AttachFileHTML(post_activity_info_2_file_index, file_link_name, file.name);
        
        $("#post_activity_info_2_attached_list").append(html);
        $("#post_activity_info_2_file").filestyle('clear');
        
        return resultID;
    }
}

function paReqInfo2AttachFileHTML(index, file_link_name, file_name) {    
    var html = "<div class='row' id='paReqInfo_2_file_" + index + "'>";
    html += "<div class='row'>&nbsp;</div>";
    html += "<div class='span5 offset3' style='padding-top: 5px'><a href='attach_files/" + file_link_name + "' target='_blank' id='paReqInfo_2_file_view_" + index + "'>" + file_name + "</a></div>";
    html += "<div class='span2'><button class='btn btn-danger span2' id='paReqInfo_2_file_remove_btn_" + index + "'>Remove File</button></div>";
    html += "</div>";
    
    post_activity_info_2_file_index++;
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////
function postCalculateTotalHrs() {
    var post_pres_hr = Number($('#post_presenter_hrs').html());
    var post_part_hr = Number($('#post_participant_hrs').val());
    var post_total_hr = post_pres_hr + post_part_hr;
    if (post_total_hr > 0) {
        $('#post_total_hrs').html(post_total_hr.toFixed(2));
    }
    else {
        $('#post_total_hrs').html('');
    }
}

////////////////////////////////////////////////////////////////////////////////
function postCalculateSubTotal() {
    var post_reg_fee = Number(revertDollar($('#post_reg_fee').val()));
    var post_travel_cost = Number(revertDollar($('#post_travel_cost').val()));
    var post_mileage_cost = Number(revertDollar($('#post_mileage_cost').html()));
    var post_lodging_cost = Number(revertDollar($('#post_lodging_cost').val()));
    var post_breakfast_cost = Number(revertDollar($('#post_breakfast_cost').html()));
    var post_lunch_cost = Number(revertDollar($('#post_lunch_cost').html()));
    var post_dinner_cost = Number(revertDollar($('#post_dinner_cost').html()));
    var post_other_cost = Number(revertDollar($('#post_other_cost').val()));
    
    var post_sub_total = post_reg_fee + post_travel_cost + post_mileage_cost + post_lodging_cost + post_breakfast_cost + post_lunch_cost + post_dinner_cost + post_other_cost;
    if (post_sub_total > 0) {
        $('#post_sub_total').html(formatDollar(post_sub_total, 2));
    }
    else {
        $('#post_sub_total').html('');
    }
}

function postCalculateTotalCost() {
    var post_sub_total = Number(revertDollar($('#post_sub_total').html()));
    var post_funding_other = Number(revertDollar($('#post_funding_other').val()));
    var fs_approved = $('input[name="rdo_fs_approval"]:checked').val();
    var post_total_cost = 0;
    
    if (fs_approved === "1") {
        post_total_cost = post_sub_total - post_funding_other;
    }
    else {
        post_total_cost = post_sub_total;
    }
    
    if (post_total_cost === 0) {
        $('#post_total_cost').html('');
        $('#post_total_amount_request').html('');
    }
    else {
        $('#post_total_cost').html(formatDollar(post_total_cost, 2));
        $('#post_total_amount_request').html(formatDollar(post_total_cost, 2));
    }
}

////////////////////////////////////////////////////////////////////////////////
function getFileIndex(fl_name, f_name) {
    var temp = fl_name.replace("narrative_" + PDRequestID + "_", "");
    temp = temp.replace("_" + f_name, "");
    
    return temp;
}

function getPA1FileIndex(fl_name, f_name) {
    var temp = fl_name.replace("post_info_1_" + PDRequestID + "_", "");
    temp = temp.replace("_" + f_name, "");
    
    return temp;
}

function getPA2FileIndex(fl_name, f_name) {
    var temp = fl_name.replace("post_info_2_" + PDRequestID + "_", "");
    temp = temp.replace("_" + f_name, "");
    
    return temp;
}

////////////////////////////////////////////////////////////////////////////////
function sendPostActivityCreatorSubmitted() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Post-activity Professional Development Request has been submitted";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Post-activity Professional Development Request, title <strong>" + act_title + "</strong> has been submitted. ";
    message += "Your request will be forwarded to the IVC Professional Development Officer and Academic Affairs Committee, ";
    message += "You will receive an email notification of the decision regarding your application within in 10-15 business days. ";
    message += "In some circumstances, additional processing time may be required. <br><br>";
    message += "Please use the link below to review the status of your submission at any time.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.<br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

function sendPostActivityApproverSubmitted() {
    var approver_email = "bmckim@ivc.edu";
    var approver_name = "Brett McKim";
    var act_title = $('#activity_title').html();
    
    var subject = "New Post-activity Professional Development Request has been assigned to you";
    var message = "Dear Brett McKim,<br><br>";
    message += "A New Post-activity Professional Development Request, title <strong>" + act_title + "</strong> has been assigned to you for approval. ";
    message += "Please use the link below to start the approval process.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.";
    
    proc_sendEmail(approver_email, approver_name, subject, message);
}

function sendPostActivityApproverMoreInfo() {
    var approver_email = "bmckim@ivc.edu";
    var approver_name = "Brett McKim";
    var act_title = $('#activity_title').html();
    
    var subject = "More Information Post-activity Professional Development Request has been updated";
    var message = "Dear Brett McKim,<br><br>";
    message += "Post-activity Professional Development Request, title <strong>" + act_title + "</strong> has been updated and assigned to you for approval.<br>";
    message += "Please use the link below to start the approval process.<br><br>";
    message += "<a href='https://services.ivc.edu/PDRequest/Login.html'>Professional Development Request</a><br><br>";
    message += "Thank you.";
    
    proc_sendEmail(approver_email, approver_name, subject, message);
}
var pre_sub_date = "";

var m_hrs_step = null;
var m_hrs_status = null;
var m_reimb_step = null;
var m_reimb_status = null;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {     
        if (sessionStorage.getItem('m_PDRequestID') !== null) {
            setDefaultSetting();
            getActiveFundingSrcList();
            
            PDRequestID = sessionStorage.getItem('m_PDRequestID');
            getSelectPDRequest();
            getPDSystem();
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
    
    // pre-activity hours fields change ////////////////////////////////////////
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
    
    // post-activity hours fields change /////////////////////////////////////// 
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
    
    // pre-activity reimbursement fields change //////////////////////////////////
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
    
//    $("input[name=rdo_fs_approval]:radio").change(function () {
//        preCalculateTotalCost();
//    });
    
    // post-activity reimbursement fields change ///////////////////////////////   
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
    
//    $("input[name=rdo_fs_approval]:radio").change(function () {
//        postCalculateTotalCost();
//    });
    
    // user save as draft click ////////////////////////////////////////////////
    $('#btn_save_draft').click(function() {
        updateJustArea();
        updateNarrative();
        updatePAReqInfo1();
        updatePAReqInfo2();
        updateRequestDetail();
        updateComments(false);
        
        // insert log
        addLogHistorySaveAsDraft();
        window.open('home.html', '_self');
    });
    
    // user submit click ///////////////////////////////////////////////////////
    $('#btn_submit').click(function() {
        var err = formMainValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        updateJustArea();
        updateNarrative();
        updatePAReqInfo1();
        updatePAReqInfo2();
        updateRequestDetail();
        updateComments(true);
        updatePDReqHRProcess(2, 2);
        updatePDReqHRProcessStatusDate();
        
        addTransaction();
        sendPostActivityCreatorSubmitted();
        if (m_hrs_status === "5" || m_reimb_status === "5") {
            sendPostActivityApproverMoreInfo();
        }
        else {
            sendPostActivityApproverSubmitted();
        }
        
        // insert log
        addLogHistorySubmitted();
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
    
    // auto size
    $('#activity_description').autosize();
    $('#just_narrative_descrip').autosize();
    $('#post_activity_info_1_descrip').autosize();
    $('#post_activity_info_2_descrip').autosize();
    $('#fs_comments').autosize();
    $('#user_comments').autosize();
    
    // bootstrap filestyle
    $(":file").filestyle({classButton: "btn btn-primary"});
    
    // popover
    $('#other_cost_description').popover({content:"Parking, Air Port Shuttle, Internet etc", placement:"top"});
});

////////////////////////////////////////////////////////////////////////////////
function formMainValidation() {
    if (ResourceTypeID === "1") {
        if (m_hrs_status === "4") {
            return postRequiredFieldsValidation();
        }
        else {
            return "";
        }
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_status === "4" || m_reimb_status === "7") {
            return postRequiredFieldsValidation();
        }
        else {
            return "";
        }
    }
    else {
        if (m_hrs_status === "4" || m_reimb_status === "4" || m_reimb_status === "7") {
            return postRequiredFieldsValidation();
        }
        else {
            return "";
        }
    }
}

function postRequiredFieldsValidation() {
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

////////////////////////////////////////////////////////////////////////////////
function setDefaultSetting() {
    $('#post_activity_required_info').hide();
    $('.hrs_sections').hide();
    $('.reimb_sections').hide();
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
function updateJustArea() {        
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
        updatePDReqHrsSections();
    }
    else if (ResourceTypeID === "2") {
        updatePDReqReimbSections();
    }
    else {
        updatePDReqHrsSections();
        updatePDReqReimbSections();
    }
}

function updatePDReqHrsSections() {
    if (m_hrs_status === "4") {
        updatePDReqHoursPostActivity();
    }
    else {
        if (m_hrs_step === "1") {
            updatePDReqHoursPreActivity();
        }
        else {
            updatePDReqHoursPostActivity();
        }
    }
}

function updatePDReqReimbSections() {
    if (m_reimb_status === "4" || m_reimb_status === "7") {
        updatePDReqReimbPostActivity();
    }
    else {
        if (m_reimb_step === "1") {
            updatePDReqReimbPreActivity();
        }
        else {
            updatePDReqReimbPostActivity();
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function updatePDReqHoursPreActivity() {    
    var pre_input_hrs = Number($('#pre_input_hrs').val());
    var pre_pres_hrs = Number($('#pre_presenter_hrs').html());
    var pre_part_hrs = Number($('#pre_participant_hrs').val());
    var pre_total_hrs = Number($('#pre_total_hrs').html());
    
    db_updatePDReqHoursPreActivity(PDRequestID, pre_input_hrs, pre_pres_hrs, pre_part_hrs, pre_total_hrs);
}

function updatePDReqHoursPostActivity() {
    var post_input_hrs = Number($('#post_input_hrs').val());
    var post_pres_hrs = Number($('#post_presenter_hrs').html());
    var post_part_hrs = Number($('#post_participant_hrs').val());
    var post_total_hrs = Number($('#post_total_hrs').html());
    
    db_updatePDReqHoursPostActivity(PDRequestID, post_input_hrs, post_pres_hrs, post_part_hrs, post_total_hrs);
}

////////////////////////////////////////////////////////////////////////////////
function updatePDReqReimbPreActivity() {    
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

////////////////////////////////////////////////////////////////////////////////
//function updateStep(new_step_ID) {
//    if (PDRequestID !== "") {
//        db_updatePDRequestStep(PDRequestID, new_step_ID);
//    }
//}

//function updateStatus(new_status_ID) {
//    if (PDRequestID !== "") {
//        db_updatePDRequestStatus(PDRequestID, new_status_ID);
//    }
//}

function updateComments(submit) {
    var ckb_comm = false;
    var comments = "";
    if (submit === false) {
        ckb_comm = $('#ckb_comments').is(':checked');
        comments = textReplaceApostrophe($('#user_comments').val());
    }
    
    db_updatePDRequestComments(PDRequestID, comments, ckb_comm);
}

////////////////////////////////////////////////////////////////////////////////
function updatePDReqHRProcess(hrs_status_id, reimb_status_id) {    
    if (ResourceTypeID === "1") {
        if (m_hrs_step === "1" && m_hrs_status === "5") {
            db_updatePDReqHRProcessHrs(PDRequestID, null, 1, hrs_status_id);
            db_insertPDReqHRProcessLogHrs(PDRequestID, null, 1, hrs_status_id, "");
        }
        else {
            db_updatePDReqHRProcessHrs(PDRequestID, null, 2, hrs_status_id);
            db_insertPDReqHRProcessLogHrs(PDRequestID, null, 2, hrs_status_id, "");
        }
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_step === "1" && m_reimb_status === "5") {
            db_updatePDReqHRProcessReimb(PDRequestID, null, 1, reimb_status_id);
            db_insertPDReqHRProcessLogReimb(PDRequestID, null, 1, reimb_status_id, "");
        }
        else {
            db_updatePDReqHRProcessReimb(PDRequestID, null, 2, reimb_status_id);
            db_insertPDReqHRProcessLogReimb(PDRequestID, null, 2, reimb_status_id, "");
        }
    }
    else {
        if (m_hrs_step === "1" && m_hrs_status === "5") {
            db_updatePDReqHRProcessHrs(PDRequestID, null, 1, hrs_status_id);
            db_insertPDReqHRProcessLogHrs(PDRequestID, null, 1, hrs_status_id, "");
        }
        else {
            db_updatePDReqHRProcessHrs(PDRequestID, null, 2, hrs_status_id);
            db_insertPDReqHRProcessLogHrs(PDRequestID, null, 2, hrs_status_id, "");
        }
        
        if (m_reimb_step === "1" && m_reimb_status === "5") {
            db_updatePDReqHRProcessReimb(PDRequestID, null, 1, reimb_status_id);
            db_insertPDReqHRProcessLogReimb(PDRequestID, null, 1, reimb_status_id, "");
        }
        else {
            db_updatePDReqHRProcessReimb(PDRequestID, null, 2, reimb_status_id);
            db_insertPDReqHRProcessLogReimb(PDRequestID, null, 2, reimb_status_id, "");
        }
    }
}

function updatePDReqHRProcessStatusDate() {
    if (m_hrs_status === "4") {
        if (m_hrs_step === "1") {
            db_updatePDReqHRProcessHrsStatusDate(PDRequestID, false, false, false, true, false, false);
        }
    }
    
    if (m_reimb_status === "4" || m_reimb_status === "7") {
        if (m_reimb_step === "1") {
            db_updatePDReqHRProcessReimbStatusDate(PDRequestID, false, false, false, true, false, false);
        }
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
        pre_sub_date = convertDBDateToString(pd_request[0]['PreSubDate']);
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
            getSelectStepStatus();
            if (ResourceTypeID === "1") {
                $('.hrs_sections').show();
                getSelectPDReqHours();
                getSelectHrsSection();
            }
            else if (ResourceTypeID === "2") {
                $('.reimb_sections').show();
                getSelectPDReqReimb();
                getSelectReimbSection();
            }
            else {
                $('.hrs_sections').show();
                $('.reimb_sections').show();
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
        $('#pre_input_hrs').val(Number(pd_req_hours[0]['PreInputHr']).toFixed(2));
        $('#pre_presenter_hrs').html(Number(pd_req_hours[0]['PrePresHr']).toFixed(2));
        $('#pre_participant_hrs').val(Number(pd_req_hours[0]['PrePartHr']).toFixed(2));
        $('#pre_total_hrs').html(Number(pd_req_hours[0]['PreTotalHr']).toFixed(2));
        $('#pre_app_hrs').html(Number(pd_req_hours[0]['PreAppHr']).toFixed(2));
        $('#pre_not_app_hrs').html(Number(pd_req_hours[0]['PreNotAppHr']).toFixed(2));

        // post activity fields
        $('#post_input_hrs').val(Number(pd_req_hours[0]['PostInputHr']).toFixed(2));
        $('#post_presenter_hrs').html(Number(pd_req_hours[0]['PostPresHr']).toFixed(2));
        $('#post_participant_hrs').val(Number(pd_req_hours[0]['PostPartHr']).toFixed(2));
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
        
//        var fs_approved = pd_req_reimb[0]['FSApproved'];
//        if (fs_approved === "1") {
//            $('#fs_approved_2').prop("checked", true);
//        }
//        else {
//            $('#fs_approved_1').prop("checked", true);
//        }
//        $('#fs_comments').val(pd_req_reimb[0]['FSComments']);
        
        $('#pre_funding_other').val(formatDollar(Number(pd_req_reimb[0]['PreFunCost']), 2));
        $('#pre_total_cost').html(formatDollar(Number(pd_req_reimb[0]['PreTotalCost']), 2));
        $('#pre_total_amount_request').html(formatDollar(Number(pd_req_reimb[0]['PreTotalAmtRequest']), 2));
        $('#pre_total_amount_approved').html(formatDollar(Number(pd_req_reimb[0]['PreTotalAmtApproved']), 2));
        $('#pre_total_amount_pending_funds').html(formatDollar(Number(pd_req_reimb[0]['PreTotalAmtPendingFunds']), 2));
        $('#pre_total_amount_not_approved').html(formatDollar(Number(pd_req_reimb[0]['PreTotalAmtNotApproved']), 2));
        
        // post activity fields
        $('#post_reg_fee').val(formatDollar(Number(pd_req_reimb[0]['PostReqFee']), 2));
        $('#post_travel_cost').val(formatDollar(Number(pd_req_reimb[0]['PostTravel']), 2));
        $('#post_input_mileage').val(Number(pd_req_reimb[0]['PostMileage']));
        $('#post_mileage_cost').html(formatDollar(Number(pd_req_reimb[0]['PostMilCost']), 2));
        $('#post_lodging_cost').val(formatDollar(Number(pd_req_reimb[0]['PostLodging']), 2));
        $('#post_input_breakfast').val(Number(pd_req_reimb[0]['PostNumBrk']));
        $('#post_breakfast_cost').html(formatDollar(Number(pd_req_reimb[0]['PostBrkCost']), 2));
        $('#post_input_lunch').val(Number(pd_req_reimb[0]['PostNumLun']));
        $('#post_lunch_cost').html(formatDollar(Number(pd_req_reimb[0]['PostLunCost']), 2));
        $('#post_input_dinner').val(Number(pd_req_reimb[0]['PostNumDin']));
        $('#post_dinner_cost').html(formatDollar(Number(pd_req_reimb[0]['PostDinCost']), 2));
        $('#post_other_cost').val(formatDollar(Number(pd_req_reimb[0]['PostOthCost']), 2));
        $('#post_sub_total').html(formatDollar(Number(pd_req_reimb[0]['PostSubTotal']), 2));
        $('#post_funding_other').val(formatDollar(Number(pd_req_reimb[0]['PostFunCost']), 2));
        $('#post_total_cost').html(formatDollar(Number(pd_req_reimb[0]['PostTotalCost']), 2));
        $('#post_total_amount_request').html(formatDollar(Number(pd_req_reimb[0]['PostTotalAmtRequest']), 2));
        $('#post_total_amount_pending_funds').html(formatDollar(Number(pd_req_reimb[0]['PostTotalAmtPendingFunds']), 2));
        $('#post_total_amount_approved').html(formatDollar(Number(pd_req_reimb[0]['PostTotalAmtApproved']), 2));
        $('#post_total_amount_not_approved').html(formatDollar(Number(pd_req_reimb[0]['PostTotalAmtNotApproved']), 2));
    }
    
    setPDReqFundSrc();
    setPDReqFSComments();
    setPDLimitSummary();
}

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

function setPDReqFSComments() {
    var fs_comments =  db_getPDReqFSComments(PDRequestID, PDReqReimbID);
    $('#fs_comments').val(fs_comments).trigger('autosize.resize');
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
    var result = new Array();
    result = db_getPDReqHRProcess(PDRequestID);
    
    m_hrs_step = result[0]['HrsStepID'];
    m_reimb_step = result[0]['ReimbStepID'];
    m_hrs_status = result[0]['HrsStatusID'];
    m_reimb_status = result[0]['ReimbStatusID'];
    
    if (ResourceTypeID === "1") {
        var hrs_step = db_getPDReqStep(result[0]['HrsStepID']);
        var hrs_status = db_getStatus(result[0]['HrsStatusID']);
        if (m_hrs_status === "1" || m_hrs_status === "4") {
            $('#post_activity_required_info').show();
        }
        $('#hrs_current_step').html(hrs_step[0]['PDReqStep']);
        $('#hrs_current_status').html(hrs_status[0]['Status']);
    }
    else if (ResourceTypeID === "2") {
        var reimb_step = db_getPDReqStep(result[0]['ReimbStepID']);
        var reimb_status = db_getStatus(result[0]['ReimbStatusID']);
        if (m_reimb_status === "1" || m_reimb_status === "4" || m_reimb_status === "7") {
            $('#post_activity_required_info').show();
        }
        $('#reimb_current_step').html(reimb_step[0]['PDReqStep']);
        $('#reimb_current_status').html(reimb_status[0]['Status']);
    }
    else {
        var hrs_step = db_getPDReqStep(result[0]['HrsStepID']);
        var hrs_status = db_getStatus(result[0]['HrsStatusID']);
        var reimb_step = db_getPDReqStep(result[0]['ReimbStepID']);
        var reimb_status = db_getStatus(result[0]['ReimbStatusID']);
        if (m_hrs_status === "1" || m_hrs_status === "4" || m_reimb_status === "1" || m_reimb_status === "4" || m_reimb_status === "7") {
            $('#post_activity_required_info').show();
        }
        $('#hrs_current_step').html(hrs_step[0]['PDReqStep']);
        $('#hrs_current_status').html(hrs_status[0]['Status']);
        $('#reimb_current_step').html(reimb_step[0]['PDReqStep']);
        $('#reimb_current_status').html(reimb_status[0]['Status']);
    }
}

function getSelectHrsSection() {
    if (m_hrs_status === "1") {
        if (m_hrs_step === "1") {
            $('.post_hrs_class').hide();
        }
        else {
            $('.pre_hrs_class').prop('readonly', false);
        }
    }
    else if (m_hrs_status === "4" || m_hrs_status === "7") {
        $('.pre_hrs_class').prop('readonly', true);
        if (m_hrs_step === "2") {
            $('.post_hrs_class').prop('readonly', true);
        }
    }
    else if (m_hrs_status === "5") {
        if (m_hrs_step === "1") {
            $('.post_hrs_class').hide();
        }
        else {
            $('.pre_hrs_class').prop('readonly', true);
        }
    }
    else {
        $('.pre_hrs_class').prop('readonly', true);
        $('.post_hrs_class').prop('readonly', true);
        
        if (m_hrs_step === "1") {
            $('.post_hrs_class').hide();
        }
    }
}

function getSelectReimbSection() {
    if (m_reimb_status === "1") {
        if (m_reimb_step === "1") {
            $('.post_reimb_class').hide();
        }
        else {
            $('.pre_reimb_class').prop('readonly', false);
        }
    }
    else if (m_reimb_status === "4" || m_reimb_status === "7") {
        $('.pre_reimb_class').prop('readonly', true);
        if (m_reimb_step === "2") {
            $('.post_reimb_class').prop('readonly', true);
            $('.fs_list_class').prop('disabled', true);
            $('#other_cost_description').prop('readonly', true);
            $('#funding_other_source').prop('readonly', true);
            $('#fs_comments').prop('readonly', true);
        }
    }
    else if (m_reimb_status === "5") {
        if (m_reimb_step === "1") {
            $('.post_reimb_class').hide();
        }
        else {
            $('.pre_reimb_class').prop('readonly', true);
        }
    }
    else {
        $('.pre_reimb_class').prop('readonly', true);
        $('.post_reimb_class').prop('readonly', true);
        $('.fs_list_class').prop('disabled', true);
        $('#other_cost_description').prop('readonly', true);
        $('#funding_other_source').prop('readonly', true);
        $('#fs_comments').prop('readonly', true);
            
        if (m_reimb_step === "1") {
            $('.post_reimb_class').hide();
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
    pdsystem = db_getPDSystem(pre_sub_date);
    
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

////////////////////////////////////////////////////////////////////////////////
function preCalculateTotalCost() {
    var pre_sub_total = Number(revertDollar($('#pre_sub_total').html()));
    var pre_funding_other = Number(revertDollar($('#pre_funding_other').val()));
//    var fs_approved = $('input[name="rdo_fs_approval"]:checked').val();
//    var pre_total_cost = 0;
//    
//    if (fs_approved === "1") {
//        pre_total_cost = pre_sub_total - pre_funding_other;
//    }
//    else {
//        pre_total_cost = pre_sub_total;
//    }
    
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

function postCalculateTotalCost() {
    var post_sub_total = Number(revertDollar($('#post_sub_total').html()));
    var post_funding_other = Number(revertDollar($('#post_funding_other').val()));
//    var fs_approved = $('input[name="rdo_fs_approval"]:checked').val();
//    var post_total_cost = 0;
//    
//    if (fs_approved === "1") {
//        post_total_cost = post_sub_total - post_funding_other;
//    }
//    else {
//        post_total_cost = post_sub_total;
//    }
    
    var post_total_cost = post_sub_total - post_funding_other;
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
function addLogHistorySaveAsDraft() {
    var log_msg = "";
    if (ResourceTypeID === "1") {
        if (m_hrs_step === "1" && m_hrs_status === "4") {
            log_msg += "Hours Post-activity save as draft";
        }
        else {
            log_msg += "Hours " + $('#hrs_current_step').html() + " save as draft";
        }
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_step === "1" && (m_reimb_status === "4" || m_reimb_status === "7")) {
            log_msg += "Reimbursement Post-activity save as draft";
        }
        else {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " save as draft";
        }
    }
    else {
        if (m_hrs_step === "1" && m_hrs_status === "4") {
            log_msg += "Hours Post-activity save as draft\n";
        }
        else {
            log_msg += "Hours " + $('#hrs_current_step').html() + " save as draft\n";
        }
        
        if (m_reimb_step === "1" && (m_reimb_status === "4" || m_reimb_status === "7")) {
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
        if (m_hrs_step === "1" && m_hrs_status === "4") {
            log_msg += "Hours Post-activity submitted";
        }
        else {
            log_msg += "Hours " + $('#hrs_current_step').html() + " submitted";
        }
    }
    else if (ResourceTypeID === "2") {
        if (m_reimb_step === "1" && (m_reimb_status === "4" || m_reimb_status === "7")) {
            log_msg += "Reimbursement Post-activity submitted";
        }
        else {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " submitted";
        }
    }
    else {
        if (m_hrs_step === "1" && m_hrs_status === "4") {
            log_msg += "Hours Post-activity submitted\n";
        }
        else {
            log_msg += "Hours " + $('#hrs_current_step').html() + " submitted\n";
        }
        
        if (m_reimb_step === "1" && (m_reimb_status === "4" || m_reimb_status === "7")) {
            log_msg += "Reimbursement Post-activity submitted";
        }
        else {
            log_msg += "Reimbursement " + $('#reimb_current_step').html() + " submitted";
        }
    }
    
    db_insertLogHistory(PDRequestID, sessionStorage.getItem('m_loginName'), log_msg.trim());
}

////////////////////////////////////////////////////////////////////////////////
function sendPostActivityCreatorSubmitted() {
    var requestor_email = $('#email').html();
    var requestor_name = $('#requestor').html();
    var act_title = $('#activity_title').html();
    
    var subject = "Professional Development Request has been submitted";
    var message = "Dear " + requestor_name + ", <br><br>";
    message += "Your Professional Development Request, title <strong>" + act_title + "</strong> has been submitted. ";
    message += "Your request will be forwarded to the IVC Professional Development Officer and Academic Affairs Committee, ";
    message += "You will receive an email notification of the decision regarding your application within in 10-15 business days. ";
    message += "In some circumstances, additional processing time may be required. <br><br>";
    message += "Please use the link below to review the status of your submission at any time.<br><br>";
    
    var str_url = sessionStorage.getItem('m_parentSite') + "/PDRequest/Login.html";
    message += "<a href='" + str_url + "'>Professional Development Request</a><br><br>";
    message += "Thank you.<br>";
    message += "IVC Professional Development Officer<br>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(requestor_email, requestor_name, subject, message);
}

function sendPostActivityApproverSubmitted() {
    var approver_email = "bmckim@ivc.edu";
    // testing
    approver_email = "presidenttest@ivc.edu";
    var approver_name = "Brett McKim";
    var act_title = $('#activity_title').html();
    
    var subject = "New Professional Development Request has been assigned to you";
    var message = "Dear Brett McKim,<br><br>";
    message += "A New Professional Development Request, title <strong>" + act_title + "</strong> has been assigned to you for approval. ";
    message += "Please use the link below to start the approval process.<br><br>";
    
    var str_url = sessionStorage.getItem('m_parentSite') + "/PDRequest/Login.html";
    message += "<a href='" + str_url + "'>Professional Development Request</a><br><br>";
    message += "Thank you.";
    
    proc_sendEmail(approver_email, approver_name, subject, message);
}

function sendPostActivityApproverMoreInfo() {
    var approver_email = "bmckim@ivc.edu";
    // testing
    approver_email = "presidenttest@ivc.edu";
    var approver_name = "Brett McKim";
    var act_title = $('#activity_title').html();
    
    var subject = "More Information Professional Development Request has been updated";
    var message = "Dear Brett McKim,<br><br>";
    message += "Professional Development Request, title <strong>" + act_title + "</strong> has been updated and assigned to you for approval.<br>";
    message += "Please use the link below to start the approval process.<br><br>";
    
    var str_url = sessionStorage.getItem('m_parentSite') + "/PDRequest/Login.html";
    message += "<a href='" + str_url + "'>Professional Development Request</a><br><br>";
    message += "Thank you.";
    
    proc_sendEmail(approver_email, approver_name, subject, message);
}
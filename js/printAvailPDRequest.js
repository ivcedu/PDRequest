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
        $('#pre_reg_fee').html(formatDollar(Number(pd_req_reimb[0]['PreReqFee']), 2));
        $('#pre_travel_cost').html(formatDollar(Number(pd_req_reimb[0]['PreTravel']), 2));
        $('#pre_input_mileage').html(Number(pd_req_reimb[0]['PreMileage']));
        $('#pre_mileage_cost').html(formatDollar(Number(pd_req_reimb[0]['PreMilCost']), 2));
        $('#pre_lodging_cost').html(formatDollar(Number(pd_req_reimb[0]['PreLodging']), 2));
        $('#pre_input_breakfast').html(Number(pd_req_reimb[0]['PreNumBrk']));
        $('#pre_breakfast_cost').html(formatDollar(Number(pd_req_reimb[0]['PreBrkCost']), 2));
        $('#pre_input_lunch').html(Number(pd_req_reimb[0]['PreNumLun']));
        $('#pre_lunch_cost').html(formatDollar(Number(pd_req_reimb[0]['PreLunCost']), 2));
        $('#pre_input_dinner').html(Number(pd_req_reimb[0]['PreNumDin']));
        $('#pre_dinner_cost').html(formatDollar(Number(pd_req_reimb[0]['PreDinCost']), 2));
        $('#other_cost_description').html(pd_req_reimb[0]['OtherSource']);
        $('#pre_other_cost').html(formatDollar(Number(pd_req_reimb[0]['PreOthCost']), 2));
        $('#pre_sub_total').html(formatDollar(Number(pd_req_reimb[0]['PreSubTotal']), 2));
        $('#funding_other_source').html(pd_req_reimb[0]['FundingSource']);
        $('#pre_funding_other').html(formatDollar(Number(pd_req_reimb[0]['PreFunCost']), 2));
        $('#pre_total_cost').html(formatDollar(Number(pd_req_reimb[0]['PreTotalCost']), 2));
        $('#pre_total_amount_request').html(formatDollar(Number(pd_req_reimb[0]['PreTotalAmtRequest']), 2));
    }
    
    setPDReqFundSrc();
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
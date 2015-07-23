var login_etype = "";

var sys_hrs = 0.0;
var pd_request_hrs = 0.0;
var flex_hrs = 0.0;

var pd_limit = 0.0;
var amount_convert = 0.0;
var available_amount = 0.0;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        $('#show_admin').hide();
        $('#mod_popup_delete').modal('hide');
        $('#mod_popup_flex_week_delete').modal('hide');

        var usr_profile = userProfilePage();
        if (usr_profile === "") {
            var login_name = sessionStorage.getItem('m_loginName');
            $('#logn_name').text('Welcome ' + login_name);

            setAdminOption();
            setAllFiscalYrs();

            var fiscal_yrs = $('#all_fiscal_yrs').val();
            getLoginUserPDRequestList(fiscal_yrs);
            getLoginUserFlexWeekListByFiscalYrs(fiscal_yrs);

            // calculate header section
            setTotalFlexHrsRequired();
            setPDAmountSummary(fiscal_yrs);
        }
        else {
            window.open(usr_profile, '_self');
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
    
    $('#user_profile').click(function() {
        window.open('userProfile.html', '_self');
    });
    
    // report all pd request ///////////////////////////////////////////////////
//    $('#nav_report_usr_pd_request').click(function() {
//        sessionStorage.setItem('m_LoginID', LoginID);
//        window.open('rptUsrPDRequest.html', '_self');
//    });
    
    // report all flex week ////////////////////////////////////////////////////
//    $('#nav_report_usr_flex_week').click(function() {
//        sessionStorage.setItem('m_LoginID', LoginID);
//        window.open('rptUsrFlexWeek.html', '_self');
//    });
    
    // new pd request click ////////////////////////////////////////////////////
    $('#new_pd_request').click(function() {
        sessionStorage.removeItem("m_PDRequestID");
        
        sessionStorage.setItem('m_pd_limit', pd_limit);
        sessionStorage.setItem('m_amount_convert', amount_convert);
        sessionStorage.setItem('m_available_amount', available_amount);
        
        window.open('prePDRequest.html', '_self');
    });
    
    // available pd activity click /////////////////////////////////////////////
    $('#avail_pd_activity').click(function() {
        sessionStorage.setItem('m_LoginID', LoginID);
        window.open('availablePDRequest.html', '_self');
    });
    
    // available flex week click ///////////////////////////////////////////////
    $('#avail_flex_week').click(function() {
        sessionStorage.setItem('m_LoginID', LoginID);
        window.open('availableFlexWeek.html', '_self');
    });
    
    // administrator click /////////////////////////////////////////////////////
    $('#administrator').click(function() {
        sessionStorage.setItem('m_admin_page', "PDRequest_List");
        window.open('administrator.html', '_self');
    });
    
    // pd request click ////////////////////////////////////////////////////////
    $('#pd_request_list').on('click', 'a', function() {
        var str_Id = $(this).attr('id');
        var pd_request_ID = str_Id.replace("pd_request_ID_", "");
        var cur_step = $('#pd_request_step_' + pd_request_ID).html();
        var cur_status = $('#pd_request_status_' + pd_request_ID).html();
        
        sessionStorage.setItem('m_PDRequestID', pd_request_ID);
        sessionStorage.setItem('m_pd_limit', pd_limit);
        sessionStorage.setItem('m_amount_convert', amount_convert);
        sessionStorage.setItem('m_available_amount', available_amount);
        
        if (cur_status === "Submitted" || cur_status === "Approved Pending Funds" || cur_status === "Denied") {
            window.open('printPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
        }
        else if (cur_status === "Approved") {
            if (cur_step === "Pre-activity") {
                window.open('postPDRequest.html', '_self');
            }
            else {
                window.open('printPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
            }
        }
        else {
            if (cur_step === "Pre-activity") {
                window.open('prePDRequest.html', '_self');
            }
            else {
                window.open('postPDRequest.html', '_self');
            }
        }
    });
    
    // delete pd request click /////////////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_delete_PDRequest_"]', function() {
        var str_Id = $(this).attr('id');
        var pd_request_ID = str_Id.replace("btn_delete_PDRequest_", "");
        sessionStorage.setItem('m_PDRequestID', pd_request_ID);
        $('#mod_popup_delete').modal('show');
    });
    
    $('#mod_delete_yes').click(function() {
        var pd_request_ID = sessionStorage.getItem('m_PDRequestID');
        db_updatePDRequestStatus(pd_request_ID, 8);
        db_insertLogHistory(pd_request_ID, sessionStorage.getItem('m_loginName'), "PD Request Deleted");
        
        var fiscal_yrs = $('#all_fiscal_yrs').val();
        getLoginUserPDRequestList(fiscal_yrs);
        
        setTotalFlexHrsRequired();
        setPDAmountSummary(fiscal_yrs);
    });
    
    // flex week click /////////////////////////////////////////////////////////
    $('#flex_week_list').on('click', 'a', function() {
        var str_Id = $(this).attr('id');
        var flex_week_ID = str_Id.replace("flex_week_ID_", "");
        
        sessionStorage.setItem('m_FlexWeekID', flex_week_ID);
        window.open('printFlexWeek.html', '_self');
    });
    
    // delete pd request click /////////////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_delete_flex_week_ID_"]', function() {
        var str_Id = $(this).attr('id');
        var flex_week_ID = str_Id.replace("btn_delete_flex_week_ID_", "");
        sessionStorage.setItem('m_FlexWeekID', flex_week_ID);
        $('#mod_popup_flex_week_delete').modal('show');
    });
    
    $('#mod_flex_week_delete_yes').click(function() {
        var flex_week_ID = sessionStorage.getItem('m_FlexWeekID');
        db_deleteFlexWeek(flex_week_ID);
        
        var fiscal_yrs = $('#all_fiscal_yrs').val();
        getLoginUserFlexWeekListByFiscalYrs(fiscal_yrs);
        
        setTotalFlexHrsRequired();
    });
    
    // flex week activity hours fields change //////////////////////////////////
    $(document).on('change', 'input[id^="flex_hrs_"]', function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(input_val);
        }
    });
    
    // flex week confirmed checkbox click //////////////////////////////////////
    $('table').on('change', 'input[type=checkbox]', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        var flex_week_ID = currentId.replace("ckb_flex_week_confirmed_", "");
        
        var ckb = ($(this).is(':checked') ? true : false);
        if (ckb) {
            $('#flex_hrs_' + flex_week_ID).prop('disabled', false);
        }
        else {
            $('#flex_hrs_' + flex_week_ID).prop('disabled', true);
        }
    });
    
    // update confirmed selected flex week click ///////////////////////////////
    $('#btn_flex_week_confirmed').click(function() {        
        updateConfirmedFlexWeek();      
        alert("Confirmed flex week has been updated successfully");
        
        var fiscal_yrs = $('#all_fiscal_yrs').val();
        getLoginUserFlexWeekListByFiscalYrs(fiscal_yrs);
        setTotalFlexHrsRequired();
    });
    
    // mouseover popover ///////////////////////////////////////////////////////
    $('#logn_name').on('mouseover', function() {        
        $(this).popover({trigger:"manual", placement:"top"});
        $(this).popover('toggle');
    });
    
    // mouseleave popover //////////////////////////////////////////////////////
    $('#logn_name').on('mouseleave', function() {
        $(this).popover('hide');
    });
    
    // refresh flex week list button ///////////////////////////////////////////
    $('#btn_fiscal_yrs_refresh').click(function() { 
        resetHeaderVariable();
        
        var fiscal_yrs = $('#all_fiscal_yrs').val();
        getLoginUserPDRequestList(fiscal_yrs);
        getLoginUserFlexWeekListByFiscalYrs(fiscal_yrs);
        
        // calculate header section
        setTotalFlexHrsRequired();
        setPDAmountSummary(fiscal_yrs);
    });
    
    // popover
    $('#user_profile').popover({content:"Edit user profile setting", placement:"top"});
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function userProfilePage() {
    var login_email = sessionStorage.getItem('m_loginEmail');
    var result = new Array();
    result = db_getLogin(login_email);
    if (result.length === 0) {
        return "userProfile.html";
    }
    else {
        login_etype = result[0]['LoginEType'];
        LoginID = result[0]['LoginID'];
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function setAdminOption() {        
    var login_email = sessionStorage.getItem('m_loginEmail');
    var admin_list = new Array();
    admin_list = db_getAdministrator(login_email);
    
    if (admin_list.length > 0) {
        sessionStorage.setItem('m_Administrator', admin_list[0]['AdminSetting']);
        $('#show_admin').show();
    }
}

function setAllFiscalYrs() {
    var result = new Array();
    result = getAllFiscalYrs();
    
    var fiscal_html = "";
    for(var i = result.length - 1; i >= 0; i--) {
        fiscal_html += "<option value='" + result[i] + "'>" + result[i] + "</option>";
    }
    $("#all_fiscal_yrs").append(fiscal_html);
    $("#all_fiscal_yrs").val(sessionStorage.getItem('m_defaultFiscalYrs'));
    $('#all_fiscal_yrs').selectpicker('refresh');
}

function resetHeaderVariable() {
    sys_hrs = 0.0;
    pd_request_hrs = 0.0;
    flex_hrs = 0.0;

    pd_limit = 0.0;
    amount_convert = 0.0;
    available_amount = 0.0;
}

////////////////////////////////////////////////////////////////////////////////
function getLoginUserPDRequestList(fiscal_yrs) {    
    var result = new Array(); 
    result = db_getPDRequestListByFiscalYrs(LoginID, fiscal_yrs);
    
    $("#pd_body_tr").empty();   
    var pd_list_html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            pd_list_html += setPDRequestListHTML(result[i]['PDRequestID'], result[i]['ActTitle'], result[i]['StartDate'], result[i]['ResourceType'], result[i]['PDReqStep'], result[i]['Status']);
            getPDReqHours(result[i]['PDRequestID']);
        }
    }
    $("#pd_body_tr").append(pd_list_html);
}

function setPDRequestListHTML(PDRequestID, act_title, create_date, resource_type, step, status) {    
    var tbody = "<tr>";
    tbody += "<td class='span3'><a href=# id='pd_request_ID_" + PDRequestID +  "'>" + act_title + "</a></td>"; 
    tbody += "<td class='span1'>" + create_date + "</td>";
    tbody += "<td class='span3'>" + resource_type + "</td>"; 
    tbody += "<td class='span2' id='pd_request_step_" + PDRequestID + "'>" + step + "</td>";  
    tbody += "<td class='span2' id='pd_request_status_" + PDRequestID + "'>" + status + "</td>";
    if (status === "Draft") {
        tbody += "<td class='span1 text-center'><button class='btn btn-mini' id='btn_delete_PDRequest_" + PDRequestID + "'><i class='icon-trash icon-black'></i></button></td>";
    }
    else {
        tbody += "<td class='span1 text-center'></td>";
    }
    tbody += "</tr>";
    
    return tbody;
}

////////////////////////////////////////////////////////////////////////////////
function deleteAttachFileByPDRequestID(PDRequestID) {
    var attach_files = new Array();
    attach_files = db_getNarrativeAttach(PDRequestID);
    if (attach_files.length > 0) {
        for (var i = 0; i < attach_files.length; i++) {
            var fl_name = attach_files[i]['FileLinkName'];
            deleteAttachFileJustNarrative(fl_name);
        }
    }
    
    var attach_files_2 = new Array();
    attach_files_2 = db_getPAReqInfo1(PDRequestID);
    if (attach_files_2.length > 0) {
        for (var i = 0; i < attach_files_2.length; i++) {
            var fl_name = attach_files_2[i]['FileLinkName'];
            deleteAttachFilePAReqInfo1(fl_name);
        }
    }
    
    var attach_files_3 = new Array();
    attach_files_3 = db_getPAReqInfo2(PDRequestID);
    if (attach_files_3.length > 0) {
        for (var i = 0; i < attach_files_3.length; i++) {
            var fl_name = attach_files_3[i]['FileLinkName'];
            deleteAttachFilePAReqInfo2(fl_name);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function getLoginUserFlexWeekListByFiscalYrs(fiscal_yrs) {    
    var result = new Array(); 
    result = db_getFlexWeekListByFiscalYrs(LoginID, fiscal_yrs);
    
    $("#fw_body_tr").empty();
    var fw_list_html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var start_date = result[i]['StartDate'] + " " + result[i]['StartTime'];
            var end_date = result[i]['EndDate'] + " " + result[i]['EndTime'];
            fw_list_html += setFlexWeekListHTML(result[i]['FlexWeekID'], result[i]['ActTitle'], result[i]['ActPresenter'], start_date, end_date, result[i]['FWHours']);
            flex_hrs += Number(result[i]['FWHours']);
            
//            setFlexWeekEnableFields(result[i]['FlexWeekID'], result[i]['FWHours'], result[i]['Confirmed'], end_date);
//            
//            if (result[i]['Confirmed'] === "1") {
//                flex_hrs += Number(result[i]['FWHours']);
//            } 
        }
    }
    $("#fw_body_tr").append(fw_list_html);
}

function setFlexWeekListHTML(FlexWeekID, act_title, act_presenter, start_date, end_date, fw_hrs) {    
    var tbody = "<tr class='row_tr form-horizontal' id='flex_week_ID_" + FlexWeekID + "'>";
    tbody += "<td class='span4'><a href=# id='flex_week_ID_" + FlexWeekID +  "'>" + act_title + "</a></td>"; 
    tbody += "<td class='span3'>" + act_presenter + "</td>"; 
    tbody += "<td class='span2'>" + start_date + "</td>";  
    tbody += "<td class='span2'>" + end_date + "</td>";
    tbody += "<td class='span1' style='text-align: center;'>" + fw_hrs + "</td>";
//    tbody += "<td class='span1'><input class='span12' type='text' style='text-align: center;' id='flex_hrs_" + FlexWeekID + "'/></td>";
//    tbody += "<td class='span1 text-center' style='padding-bottom: 7px;'><input type='checkbox' id='ckb_flex_week_confirmed_" + FlexWeekID + "'></td>"; 
//    tbody += "<td class='span1 text-center'><button class='btn btn-mini' id='btn_delete_flex_week_ID_" + FlexWeekID + "'><i class='icon-trash icon-black'></i></button></td>";
    tbody += "</tr>";
    
    return tbody;
}

//function setFlexWeekEnableFields(FlexWeekID, fw_hrs, confirmed, end_date) {
//    var dt_end_date = new Date(end_date);
//    var dt_cur_date = new Date();
//    
//    $('#flex_hrs_' + FlexWeekID).val(fw_hrs);
//    $('#flex_hrs_' + FlexWeekID).prop('disabled', true);
//    
//    if (dt_cur_date > dt_end_date) {
//        if (confirmed === "1") {
//            $('#ckb_flex_week_confirmed_' + FlexWeekID).prop('checked', true);
//            $('#flex_hrs_' + FlexWeekID).prop('disabled', false);
//        }
//        $('#ckb_flex_week_confirmed_' + FlexWeekID).prop('disabled', false);
//    }
//    else {
//        $('#ckb_flex_week_confirmed_' + FlexWeekID).prop('disabled', true);
//    }
//}

////////////////////////////////////////////////////////////////////////////////
function setTotalFlexHrsRequired() {
    if (login_etype === "Full Time Faculty") {
        getSystemFlexHrs();
    
        $('#sys_flex_hrs').html(sys_hrs);
        $('#total_hrs_attended').html((pd_request_hrs + flex_hrs).toFixed(2));
        $('#total_hrs_balance').html((sys_hrs - pd_request_hrs - flex_hrs).toFixed(2));

        var balance = sys_hrs - pd_request_hrs - flex_hrs;
        if (balance > 0) {
            $('#total_hrs_balance').css('color', 'red');
        }
        else {
            $('#total_hrs_balance').css('color', 'green');
        }
    }
    else {
        $('#flex_hrs_summary').hide();
    }
}

function getSystemFlexHrs() {
    var pdsystem = new Array();
    pdsystem = db_getPDSystem();
    
    for(var i = 0; i < pdsystem.length; i++) {
        var sys_name = pdsystem[i][1];
        if (sys_name === "Total_FH_Required") {
            sys_hrs = Number(pdsystem[i][2]).toFixed(2);
            break;
        }
    }
}

function getPDReqHours(PDRequestID) {
    var result = new Array(new Array()); 
    result = db_getPDReqHours(PDRequestID);
    
    if (result.length === 1) {
        pd_request_hrs += Number(result[0]['PostAppHr']);
    }
}

function setPDAmountSummary(fiscal_yrs) {
    calculateEncumberedAmt(fiscal_yrs);
    
    if (login_etype === "Staff") {
        $('#pd_amount_summary').hide();
    }
    else {
        if (login_etype === "Full Time Faculty") {
            getSystemPDAmount("FullTimeLimit");
        }
        else {
            getSystemPDAmount("PartTimeLimit");
        }
        
        available_amount = pd_limit - amount_convert;
        $('#sys_pd_limit_amount').html(formatDollar(pd_limit, 2));
        $('#pd_amount_convert').html(formatDollar(amount_convert, 2));
        $('#pd_available_amount').html(formatDollar(available_amount, 2));
        
        if (available_amount < 0) {
            $('#pd_available_amount').css('color', 'red');
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

function calculateEncumberedAmt(fiscal_yrs) {   
    var result = new Array(new Array()); 
    result = db_getPDReqReimbByLoginFiscalYrs(LoginID, fiscal_yrs);
    
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

////////////////////////////////////////////////////////////////////////////////
function updateConfirmedFlexWeek() {
    var rowCount = $('#flex_week_list tr').length;
    for (var i = 1; i < rowCount; i++) {
        var currentId = $('#flex_week_list tr').eq(i).attr('id');
        var fw_ID = currentId.replace("flex_week_ID_", "");
        var fw_hrs = $('#flex_hrs_' + fw_ID).val();
        var ckb_confirmed = ($('#ckb_flex_week_confirmed_' + fw_ID).is(':checked') ? true : false);
        
        if(fw_hrs === "") {
            fw_hrs = "0.00";
        }
        db_updateFlexWeekConfirmed(fw_ID, fw_hrs, ckb_confirmed);
    }
}
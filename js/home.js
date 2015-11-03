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
        var pd_request_ID = $(this).attr('id').replace("pd_request_ID_", "");
        var hrs_step = $('#pd_request_hrs_step_' + pd_request_ID).html();
        var hrs_status = $('#pd_request_hrs_status_' + pd_request_ID).html();
        var reimb_step = $('#pd_request_reimb_step_' + pd_request_ID).html();
        var reimb_status = $('#pd_request_reimb_status_' + pd_request_ID).html();
        
        sessionStorage.setItem('m_PDRequestID', pd_request_ID);
        sessionStorage.setItem('m_pd_limit', pd_limit);
        sessionStorage.setItem('m_amount_convert', amount_convert);
        sessionStorage.setItem('m_available_amount', available_amount);
        
        if (hrs_step !== "" && hrs_status !== "" && typeof reimb_step === 'undefined' && typeof reimb_status === 'undefined') {
            if (hrs_step === "Pre-activity" && hrs_status === "Draft") {
                window.open('prePDRequest.html', '_self');
                return false;
            }
            else if ((hrs_step === "Pre-activity" && hrs_status === "Submitted") || (hrs_step === "Pre-activity" && hrs_status === "Denied")
                    || (hrs_step === "Post-activity" && hrs_status === "Submitted") || (hrs_step === "Post-activity" && hrs_status === "Approved") || (hrs_step === "Post-activity" && hrs_status === "Denied")) {
                window.open('printPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
                return false;
            }
            else {
                window.open('postPDRequest.html', '_self');
                return false;
            }
        }
        else if (typeof hrs_step === 'undefined' && typeof hrs_status === 'undefined' && reimb_step !== "" && reimb_status !== "") {
            if (reimb_step === "Pre-activity" && reimb_status === "Draft") {
                window.open('prePDRequest.html', '_self');
                return false;
            }
            else if ((reimb_step === "Pre-activity" && reimb_status === "Submitted") || (reimb_step === "Pre-activity" && reimb_status === "Denied") 
                    || (reimb_step === "Post-activity" && reimb_status === "Submitted") || (reimb_step === "Post-activity" && reimb_status === "Approved") 
                    || (reimb_step === "Post-activity" && reimb_status === "Denied") || (reimb_step === "Post-activity" && reimb_status === "Approved Pending Funds")) {
                window.open('printPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
                return false;
            }
            else {
                window.open('postPDRequest.html', '_self');
                return false;
            }
        }
        else {
            if ((hrs_step === "Pre-activity" && hrs_status === "Draft" && reimb_step === "Pre-activity" && reimb_status === "Draft")
                || (hrs_step === "Pre-activity" && hrs_status === "Draft" && reimb_step === "Pre-activity" && reimb_status === "More Information")
                || (hrs_step === "Pre-activity" && hrs_status === "Draft" && reimb_step === "Pre-activity" && reimb_status === "Submitted")
                || (hrs_step === "Pre-activity" && hrs_status === "More Information" && reimb_step === "Pre-activity" && reimb_status === "Draft")
                || (hrs_step === "Pre-activity" && hrs_status === "More Information" && reimb_step === "Pre-activity" && reimb_status === "More Information")
                || (hrs_step === "Pre-activity" && hrs_status === "More Information" && reimb_step === "Pre-activity" && reimb_status === "Submitted")
                || (hrs_step === "Pre-activity" && hrs_status === "Submitted" && reimb_step === "Pre-activity" && reimb_status === "Draft")
                || (hrs_step === "Pre-activity" && hrs_status === "Submitted" && reimb_step === "Pre-activity" && reimb_status === "More Information")) {
                window.open('prePDRequest.html', '_self');
                return false;
            }
            else if ((hrs_step === "Pre-activity" && hrs_status === "Draft") 
                    || (hrs_step === "Pre-activity" && hrs_status === "Approved")
                    || (hrs_step === "Pre-activity" && hrs_status === "More Information")
                    || (hrs_step === "Post-activity" && hrs_status === "Draft")
                    || (hrs_step === "Post-activity" && hrs_status === "More Information")
                    || (reimb_step === "Pre-activity" && reimb_status === "Draft")
                    || (reimb_step === "Pre-activity" && reimb_status === "Approved")
                    || (reimb_step === "Pre-activity" && reimb_status === "Approved Pending Funds") 
                    || (reimb_step === "Pre-activity" && reimb_status === "More Information")
                    || (reimb_step === "Post-activity" && reimb_status === "Draft")
                    || (reimb_step === "Post-activity" && reimb_status === "More Information")) {
                window.open('postPDRequest.html', '_self');
                return false;
            }
            else {
                window.open('printPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
                return false;
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
    
    // mouseover popover ///////////////////////////////////////////////////////
    $('#logn_name').on('mouseover', function() {        
        $(this).popover({trigger:"manual", placement:"top"});
        $(this).popover('toggle');
    });
    
    // mouseleave popover //////////////////////////////////////////////////////
    $('#logn_name').on('mouseleave', function() {
        $(this).popover('hide');
    });
    
    // fiscal year change event ////////////////////////////////////////////////    
    $('#all_fiscal_yrs').change(function() {
        resetHeaderVariable();
        
        var fiscal_yrs = $(this).val();
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
            pd_list_html += setPDRequestListHTML(result[i]['PDRequestID'], result[i]['ResourceTypeID'], result[i]['ResourceType'], result[i]['ActTitle'], result[i]['StartDate'], 
                                                result[i]['HrsStep'], result[i]['HrsStatus'], result[i]['ReimbStep'], result[i]['ReimbStatus'], i%2);
            getPDReqHours(result[i]['PDRequestID']);
        }
    }
    $("#pd_body_tr").append(pd_list_html);
}

function setPDRequestListHTML(PDRequestID, resource_type_id, resource_type, act_title, create_date, hrs_step, hrs_status, reimb_step, reimb_status, index) {
    var set_tr_color = "<tr style='background-color: #DCDCDC'>";    
    if (index) {
        set_tr_color = "<tr>";
    }
    
    var tbody = "";
    if (resource_type_id === "3") {
        tbody += set_tr_color;
        tbody += "<td class='span3'><a href=# id='pd_request_ID_" + PDRequestID +  "'>" + act_title + "</a></td>"; 
        tbody += "<td class='span1'>" + create_date + "</td>";
        tbody += "<td class='span2'>Hours</td>"; 
        tbody += "<td class='span2' id='pd_request_hrs_step_" + PDRequestID + "'>" + hrs_step + "</td>";  
        tbody += "<td class='span3' id='pd_request_hrs_status_" + PDRequestID + "'>" + hrs_status + "</td>";
        if (hrs_step === "Pre-activity" && hrs_status === "Draft" && reimb_step === "Pre-activity" && reimb_status === "Draft") {
            tbody += "<td class='span1 text-center'><button class='btn btn-mini' id='btn_delete_PDRequest_" + PDRequestID + "'><i class='icon-trash icon-black'></i></button></td>";
        }
        else {
            tbody += "<td class='span1 text-center'></td>";
        }
        tbody += "</tr>";
        
        tbody += set_tr_color;
        tbody += "<td class='span3'></td>";
        tbody += "<td class='span1'></td>";
        tbody += "<td class='span2'>Reimbursement</td>"; 
        tbody += "<td class='span2' id='pd_request_reimb_step_" + PDRequestID + "'>" + reimb_step + "</td>";  
        tbody += "<td class='span3' id='pd_request_reimb_status_" + PDRequestID + "'>" + reimb_status + "</td>";
        tbody += "<td class='span1 text-center'></td>";
        tbody += "</tr>";
    }
    else {
        tbody += set_tr_color;
        tbody += "<td class='span3'><a href=# id='pd_request_ID_" + PDRequestID +  "'>" + act_title + "</a></td>"; 
        tbody += "<td class='span1'>" + create_date + "</td>";
        tbody += "<td class='span2'>" + resource_type + "</td>"; 
        if (resource_type_id === "1") {
            tbody += "<td class='span2' id='pd_request_hrs_step_" + PDRequestID + "'>" + hrs_step + "</td>";  
            tbody += "<td class='span3' id='pd_request_hrs_status_" + PDRequestID + "'>" + hrs_status + "</td>";
        }
        else {
            tbody += "<td class='span2' id='pd_request_reimb_step_" + PDRequestID + "'>" + reimb_step + "</td>";  
            tbody += "<td class='span3' id='pd_request_reimb_status_" + PDRequestID + "'>" + reimb_status + "</td>";
        }
        
        if (hrs_status === "Draft" || reimb_status === "Draft") {
            tbody += "<td class='span1 text-center'><button class='btn btn-mini' id='btn_delete_PDRequest_" + PDRequestID + "'><i class='icon-trash icon-black'></i></button></td>";
        }
        else {
            tbody += "<td class='span1 text-center'></td>";
        }
        tbody += "</tr>";
    }
    
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
    tbody += "</tr>";
    
    return tbody;
}

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
    var all_fiscal_yrs = $('#all_fiscal_yrs').val();
    var pdsystem = new Array();
    pdsystem = db_getPDSystem(all_fiscal_yrs);
    
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
    var all_fiscal_yrs = $('#all_fiscal_yrs').val();
    var pdsystem = new Array();
    pdsystem = db_getPDSystem(all_fiscal_yrs);
    
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

////////////////////////////////////////////////////////////////////////////////
function updateConfirmedFlexWeek() {
    var rowCount = $('#flex_week_list tr').length;
    for (var i = 1; i < rowCount; i++) {
        var currentId = $('#flex_week_list tr').eq(i).attr('id');
        var fw_ID = currentId.replace("flex_week_ID_", "");
        var fw_hrs = $('#flex_hrs_' + fw_ID).val();
        var ckb_confirmed = $('#ckb_flex_week_confirmed_' + fw_ID).is(':checked');
        
        if(fw_hrs === "") {
            fw_hrs = "0.00";
        }
        db_updateFlexWeekConfirmed(fw_ID, fw_hrs, ckb_confirmed);
    }
}
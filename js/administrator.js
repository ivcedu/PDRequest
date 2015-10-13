var avail_flex_week_ID = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {   
        $('#mod_system_setting').modal('hide');
        $('#mod_popup_flex_week_delete_admin').modal('hide');
        $('#mod_fiscal_yrs').modal('hide');
        setFlexWeekFiscalYrs();
        setModFiscalYrs();
        
        if (sessionStorage.getItem('m_admin_page') === "PDRequest_List") {
            $('#pd_request_section').show();
            $('#flex_week_section').hide();
            getAdminPDRequestList();
            initPDRequestTable();
        }
        else {
            $('#pd_request_section').hide();
            $('#flex_week_section').show();

            var fiscal_yrs = $('#fw_fiscal_yrs').val();
            getAvailFlexWeekListByFiscalYrs(fiscal_yrs);
            initFlexWeekTable();
        }      
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initPDRequestTable() {
    $("#pd_request_tbl").tablesorter({ widgets: ['stickyHeaders'] });
}

function initFlexWeekTable() {
    $("#flex_week_tbl").tablesorter({ widgets: ['stickyHeaders'] });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // admin selection btn click ///////////////////////////////////////////////
    $('#nav_pd_request').click(function() {
        sessionStorage.setItem('m_admin_page', "PDRequest_List");
        $('#pd_request_section').show();
        $('#flex_week_section').hide();
        getAdminPDRequestList();
        initPDRequestTable();
    });
    
    $('#nav_flex_week').click(function() {
        sessionStorage.setItem('m_admin_page', "FlexWeek_List");
        $('#pd_request_section').hide();
        $('#flex_week_section').show();

        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailFlexWeekListByFiscalYrs(fiscal_yrs);
        initFlexWeekTable();
    });
    
    // report click ////////////////////////////////////////////////////////////
    $('#nav_report_justification').click(function() {
        $('#mod_fiscal_yrs').modal('show');
    });
    
    $('#mod_btn_fiscal_yrs_run').click(function() {
        var mod_fiscal_yrs = $('#mod_opt_fiscal_yrs').val();
        var url_html = "FiscalYrs=" + mod_fiscal_yrs;
        location.href = "php/db_saveFlexWeekJustificationReportCSV.php?" + url_html;
        $('#mod_fiscal_yrs').modal('hide');  
    });
    
    $('#nav_report_college_originate_event').click(function() {
        window.open('rptAdmFlexDetail.html', '_self');
    });
    
    $('#nav_report_pd_week').click(function() {
        window.open('rptAdmFlexWeek.html', '_self');
    });
    
    $('#nav_report_pd_tracking_doc').click(function() {
        window.open('rptAdmPDTrackingDoc.html', '_self');
    });
    
    $('#nav_report_pd_deleted_list').click(function() {
        window.open('rptPDDeletedList.html', '_self');
    });
    
    // pd system setting click /////////////////////////////////////////////////
    $('#nav_pd_setting').click(function() {
        getPDSystem();
        $('#mod_system_setting').modal('show');
    });
    
    $('#mod_btn_sys_save').click(function() {
        var err = systemSettingValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        updatePDSystem();
        alert("System setting has been updated successfully");
    });
    
    $('#mod_sys_mil_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(formatDollar(input_val, 3));
        }
    });
    
    $('#mod_sys_brk_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(formatDollar(input_val, 2));
        }
    });
    
    $('#mod_sys_lun_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(formatDollar(input_val, 2));
        }
    });
    
    $('#mod_sys_din_cost').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(formatDollar(input_val, 2));
        }
    });
    
    $('#mod_sys_fh_required').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(input_val);
        }
    });
    
    $('#mod_sys_ph_required').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);
        $(this).val(input_val);
    });
    
    $('#mod_sys_ffl_required').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));
        $(this).val(formatDollar(input_val, 2));
    });
    
    $('#mod_sys_pfl_required').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));
        $(this).val(formatDollar(input_val, 2));
    });
    
    // funding src setting click ///////////////////////////////////////////////
    $('#nav_fund_src_setting').click(function() {
        window.open('fundSrcTypeSetting.html', '_self');
    });
    
    // general nav btn click ///////////////////////////////////////////////////
    $('#home').click(function() {
        sessionStorage.removeItem("m_PDRequestID");
        sessionStorage.removeItem("m_admin_click");
        window.open('home.html', '_self');
    });
    
    $('#logout').click(function() {
        var parent_site = sessionStorage.getItem('m_parentSite');
        sessionStorage.clear();
        window.open(parent_site, '_self');
    });
    
    $('#refresh').click(function() {
        getAdminPDRequestList();
        initPDRequestTable();
    });
    
    // pd request click ////////////////////////////////////////////////////////
    $('#pd_request_tbl').on('click', 'a', function() {
        var str_Id = $(this).attr('id');
        var pd_request_ID = str_Id.replace("pd_request_ID_", "");
        var cur_step = $('#pd_request_step_' + pd_request_ID).html();
        
        sessionStorage.setItem('m_PDRequestID', pd_request_ID);
        sessionStorage.setItem('m_PDRequestStep', cur_step);
        sessionStorage.setItem('m_admin_click', "Admin_Click");
        
        window.open('adminPDRequest.html?pdrequest_id=' + pd_request_ID, '_self');
    });
    
    // avail flex week click ////////////////////////////////////////////////////////
    $('#flex_week_tbl').on('click', 'a', function() {
        var str_Id = $(this).attr('id');
        var avail_flex_week_ID = str_Id.replace("avail_flex_week_ID_", "");
        
        sessionStorage.setItem('m_AvailFlexWeekID', avail_flex_week_ID);
        window.open('adminAddFlexWeek.html', '_self');
    });
    
    // add flexweek btn click //////////////////////////////////////////////////
    $('#btn_add_flex_week').click(function() {
        sessionStorage.removeItem("m_AvailFlexWeekID");
        window.open('adminAddFlexWeek.html', '_self');
    });
    
    // delete flexweek click ///////////////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_delete_flex_week_"]', function() {
        var str_Id = $(this).attr('id');
        avail_flex_week_ID = str_Id.replace("btn_delete_flex_week_", "");
        $('#mod_popup_flex_week_delete_admin').modal('show');
    });
    
    $('#mod_flex_week_delete_admin_yes').click(function() {
        db_deleteAvailFlexWeek(avail_flex_week_ID);
        
        var result = new Array(); 
        result = db_getFlexWeekByAFWID(avail_flex_week_ID);
        for(var i = 0; i < result.length; i++) {
            db_deleteFlexWeek(result[i]['FlexWeekID']);
            sendDeleteFlexWeek(result[i]['Email'], result[i]['Name'], result[i]['ActTitle']);
        }
        
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailFlexWeekListByFiscalYrs(fiscal_yrs);
        initFlexWeekTable();
    });
    
    // fiscal year change event ////////////////////////////////////////////////    
    $('#fw_fiscal_yrs').change(function() {
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailFlexWeekListByFiscalYrs(fiscal_yrs);
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function systemSettingValidation() {
    var err = "";

    if ($('#mod_sys_mil_cost').val().replace(/\s+/g, '') === "") {
        err += "Mileage cost is a required field\n";
    }
    if ($('#mod_sys_brk_cost').val().replace(/\s+/g, '') === "") {
        err += "Breakfast cost is a required field\n";
    }
    if ($('#mod_sys_lun_cost').val().replace(/\s+/g, '') === "") {
        err += "Lunch cost is a required field\n";
    }
    if ($('#mod_sys_din_cost').val().replace(/\s+/g, '') === "") {
        err += "Dinner cost is a required field\n";
    }
    if ($('#mod_sys_fh_required').val().replace(/\s+/g, '') === "") {
        err += "Full time PD Flex hours is a required field\n";
    }
    if ($('#mod_sys_ph_required').val().replace(/\s+/g, '') === "") {
        err += "Part time PD Flex hours is a required field\n";
    }
    if ($('#mod_sys_ffl_required').val().replace(/\s+/g, '') === "") {
        err += "Full time faculty limit amount is a required field\n";
    }
    if ($('#mod_sys_pfl_required').val().replace(/\s+/g, '') === "") {
        err += "Part time faculty limit amount is a required field\n";
    }

    return err;
}

////////////////////////////////////////////////////////////////////////////////
function setFlexWeekFiscalYrs() {
    var result = new Array();
    result = db_getAvailFlexWeekFiscalYrs();
    
    var fiscal_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $("#fw_fiscal_yrs").append(fiscal_html);
    $("#fw_fiscal_yrs").val(sessionStorage.getItem('m_defaultFiscalYrs'));
    $('#fw_fiscal_yrs').selectpicker('refresh');
}

function setModFiscalYrs() {
    var result = new Array();
    result = db_getFlexWeekFiscalYrs();
    
    var fiscal_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $("#mod_opt_fiscal_yrs").append(fiscal_html);
    $('#mod_opt_fiscal_yrs').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getAdminPDRequestList() {    
    var result = new Array(); 
    result = db_getPDRequestAdminList();
    
    $("#pd_request_body_tr").empty();
    var str_html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            str_html += setPDRequestAdminList(result[i]['PDRequestID'], result[i]['ResourceTypeID'], result[i]['ResourceType'], result[i]['ActTitle'], result[i]['CreateDate'], result[i]['Name'], 
                                              result[i]['HrsStep'], result[i]['HrsStatus'], result[i]['ReimbStep'], result[i]['ReimbStatus'], i%2);
        }
    }
    $("#pd_request_body_tr").append(str_html);
}

function setPDRequestAdminList(PDRequestID, resource_type_id, resource_type, act_title, create_date, requestor, hrs_step, hrs_status, reimb_step, reimb_status, index) {    
    var set_tr_color = "<tr style='background-color: #DCDCDC'>";    
    if (index) {
        set_tr_color = "<tr>";
    }
    
    var tbody = "";
    if (resource_type_id === "3") {
        tbody += set_tr_color;
        tbody += "<td class='span2'><a href=# id='pd_request_ID_" + PDRequestID +  "'>" + act_title + "</a></td>"; 
        tbody += "<td class='span1'>" + create_date + "</td>";
        tbody += "<td class='span2'>" + requestor + "</td>";
        tbody += "<td class='span2'>Hours</td>"; 
        tbody += "<td class='span2' id='pd_request_hrs_step_" + PDRequestID + "'>" + hrs_step + "</td>";  
        tbody += "<td class='span3' id='pd_request_hrs_status_" + PDRequestID + "'>" + hrs_status + "</td>";
        tbody += "</tr>";
        
        tbody += set_tr_color;
        tbody += "<td class='span2'></td>";
        tbody += "<td class='span1'></td>";
        tbody += "<td class='span2'></td>";
        tbody += "<td class='span2'>Reimbursement</td>"; 
        tbody += "<td class='span2' id='pd_request_reimb_step_" + PDRequestID + "'>" + reimb_step + "</td>";  
        tbody += "<td class='span3' id='pd_request_reimb_status_" + PDRequestID + "'>" + reimb_status + "</td>";
        tbody += "</tr>";
    }
    else {
        tbody += set_tr_color;
        tbody += "<td class='span2'><a href=# id='pd_request_ID_" + PDRequestID +  "'>" + act_title + "</a></td>"; 
        tbody += "<td class='span1'>" + create_date + "</td>";
        tbody += "<td class='span2'>" + requestor + "</td>";
        tbody += "<td class='span2'>" + resource_type + "</td>"; 
        if (resource_type_id === "1") {
            tbody += "<td class='span2' id='pd_request_hrs_step_" + PDRequestID + "'>" + hrs_step + "</td>";  
            tbody += "<td class='span3' id='pd_request_hrs_status_" + PDRequestID + "'>" + hrs_status + "</td>";
        }
        else {
            tbody += "<td class='span2' id='pd_request_reimb_step_" + PDRequestID + "'>" + reimb_step + "</td>";  
            tbody += "<td class='span3' id='pd_request_reimb_status_" + PDRequestID + "'>" + reimb_status + "</td>";
        }
        tbody += "</tr>";
    }
    
    return tbody;
}

////////////////////////////////////////////////////////////////////////////////
function getAvailFlexWeekListByFiscalYrs(fiscal_yrs) {
    var result = new Array(); 
    result = db_getAvailFlexWeekListAdminByFiscalYrs(fiscal_yrs);
    
    $("#flex_week_body_tr").empty();
    var html_list = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            html_list += setAvailFlexWeekListHTML(result[i]['AvailFlexWeekID'], result[i]['ActTitle'], result[i]['StartDate'], result[i]['ActPresenter'], result[i]['Location'], result[i]['AdminName']);
        }
    }
    $("#flex_week_body_tr").append(html_list);
}

function setAvailFlexWeekListHTML(AvailFlexWeekID, act_title, start_date, act_presenter, location, admin_name) {
    var tbody = "<tr>";
    tbody += "<td class='span3'><a href=# id='avail_flex_week_ID_" + AvailFlexWeekID +  "'>" + act_title + "</a></td>";
    tbody += "<td class='span1'>" + start_date + "</td>";
    tbody += "<td class='span3'>" + act_presenter + "</td>";
    tbody += "<td class='span2'>" + location + "</td>"; 
    tbody += "<td class='span2'>" + admin_name + "</td>"; 
    tbody += "<td class='span1 text-center'><button class='btn btn-mini' id='btn_delete_flex_week_" + AvailFlexWeekID + "'><i class='icon-trash icon-black'></i></button></td>";
    tbody += "</tr>";
    return tbody;
}

////////////////////////////////////////////////////////////////////////////////
function getPDSystem() {
    var pdsystem = new Array();
    pdsystem = db_getPDSystem();
    
    for(var i = 0; i < pdsystem.length; i++) {
        var sys_name = pdsystem[i][1];
        
        if (sys_name === "Breakfast") {
            $('#mod_sys_brk_cost').val(formatDollar(Number(pdsystem[i][2]), 2));
        }
        else if (sys_name === "Lunch") {
            $('#mod_sys_lun_cost').val(formatDollar(Number(pdsystem[i][2]), 2));
        }
        else if (sys_name === "Dinner") {
            $('#mod_sys_din_cost').val(formatDollar(Number(pdsystem[i][2]), 2));
        }
        else if (sys_name === "Mileage") {            
            $('#mod_sys_mil_cost').val(formatDollar(Number(pdsystem[i][2]), 3));
        }
        else if (sys_name === "Total_FH_Required") {
            $('#mod_sys_fh_required').val(Number(pdsystem[i][2]).toFixed(2));
        }
        else if (sys_name === "Total_PH_Required") {
            $('#mod_sys_ph_required').val(Number(pdsystem[i][2]).toFixed(2));
        }
        else if (sys_name === "FullTimeLimit") {            
            $('#mod_sys_ffl_required').val(formatDollar(Number(pdsystem[i][2]), 2));
        }
        else if (sys_name === "PartTimeLimit") {            
            $('#mod_sys_pfl_required').val(formatDollar(Number(pdsystem[i][2]), 2));
        }
    }
}

function updatePDSystem() {
    var mod_sys_brk_cost = revertDollar($('#mod_sys_brk_cost').val());
    db_updatePDSystem(1, mod_sys_brk_cost);
    
    var mod_sys_lun_cost = revertDollar($('#mod_sys_lun_cost').val());
    db_updatePDSystem(2, mod_sys_lun_cost);
    
    var mod_sys_din_cost = revertDollar($('#mod_sys_din_cost').val());
    db_updatePDSystem(3, mod_sys_din_cost);
    
    var mod_sys_mil_cost = revertDollar($('#mod_sys_mil_cost').val());
    db_updatePDSystem(4, mod_sys_mil_cost);
    
    var mod_sys_fh_required = Number($('#mod_sys_fh_required').val());
    db_updatePDSystem(5, mod_sys_fh_required);
    
    var mod_sys_ph_required = Number($('#mod_sys_ph_required').val());
    db_updatePDSystem(6, mod_sys_ph_required);
    
    var mod_sys_ffl_required = revertDollar($('#mod_sys_ffl_required').val());
    db_updatePDSystem(7, mod_sys_ffl_required);
    
    var mod_sys_pfl_required = revertDollar($('#mod_sys_pfl_required').val());
    db_updatePDSystem(8, mod_sys_pfl_required);
}

////////////////////////////////////////////////////////////////////////////////
function sendDeleteFlexWeek(email, name, act_title) {
    var subject = "Flex Week Activity has been deleted from Administrator";
    var message = "Dear " + name + ",<br/><br/>";
    message += "Flex week activity, title <strong>" + act_title + "</strong> has been <strong>deleted</strong> from your list by Professional Development administrator.<br/>";
    message += "Should you have any questions, please contact Stefanie Alvarez (<a href='mailto:salvarez@ivc.edu'>salvarez@ivc.edu</a>, phone: 949-451-5709, Location: A 304).<br/><br/>";
    message += "Thank you.<br/>";
    message += "IVC Professional Development Officer<br/>";
    message += "flexofficer@ivc.edu";
    
    proc_sendEmail(email, name, subject, message);
}
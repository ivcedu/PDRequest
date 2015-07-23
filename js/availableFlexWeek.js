var no_select;
var usr_login_ID = "";
var flex_week_id = "";
var usr_fw_hrs = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {   
        usr_login_ID = sessionStorage.getItem('m_LoginID');
        setFlexWeekFiscalYrs();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailFlexWeekList(fiscal_yrs);
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#avail_flex_week_tbl").tablesorter({ 
        headers: { 
            6: {sorter:'inputs'}
        }
    });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // general nav btn click ///////////////////////////////////////////////////
    $('#nav_home').click(function() {
        sessionStorage.removeItem("m_AvailFlexWeekID");
        window.open('home.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
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
    
    // add selected flex week click ////////////////////////////////////////////
    $('#btn_add_selected_fw_to_user').click(function() {        
        updateSelectedFlexWeek();      
        alert("Available flex week has been updated successfully");
        window.open('home.html', '_self');
    });
    
    // table row flex week click ///////////////////////////////////////////////
    $('table').on('click', 'a', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        var avail_flex_week_ID = currentId.replace("act_title_", "");
        
        sessionStorage.setItem('m_AvailFlexWeekID', avail_flex_week_ID);
        window.open('userAddFlexWeek.html', '_self');
    });
    
    // table row checkbox click ////////////////////////////////////////////////
    $('table').on('change', 'input[type=checkbox]', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('id');
        var flex_week_ID = currentId.replace("ckb_flex_week_ID_", "");
        
        var ckb = ($(this).is(':checked') ? true : false);
        if (ckb) {
            $('#flex_hrs_' + flex_week_ID).prop('disabled', false);
        }
        else {
            $('#flex_hrs_' + flex_week_ID).prop('disabled', true);
        }
    });
    
    // refresh flex week list button ///////////////////////////////////////////
    $('#btn_fw_list_refresh').click(function() {
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getAvailFlexWeekList(fiscal_yrs);
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

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

////////////////////////////////////////////////////////////////////////////////
function getAvailFlexWeekList(fiscal_yrs) {    
    var result = new Array(); 
    result = db_getAvailFlexWeekList2(usr_login_ID, fiscal_yrs);
    
    $("#body_tr").empty();
    var tbl_html = "";
    for(var i = 0; i < result.length; i++) { 
        tbl_html += setAvailFlexWeekListHTML2(result[i]['AvailFlexWeekID'], result[i]['ActTitle'], result[i]['ActPresenter'], result[i]['Location'], 
                                                result[i]['StartDate'], result[i]['StartTime'], result[i]['EndDate'], result[i]['EndTime'], result[i]['ActDescrip'], 
                                                result[i]['FWHours'], result[i]['FlexWeekID'], result[i]['UserFWHrs']);
    }
    $("#body_tr").append(tbl_html);
}

function setAvailFlexWeekListHTML2(AvailFlexWeekID, act_title, act_presenter, location, start_date, start_time, end_date, end_time, act_descrip, fw_hours, usr_flex_week_id, user_fw_hrs) {  
    var html = "";
    html += "<tr class='row_tr form-horizontal' id='avail_flex_week_ID_" + AvailFlexWeekID + "'>";
    if (usr_flex_week_id === null) {
        html += "<td class='col_50' style='padding-bottom: 7px;'><input type='checkbox' id='ckb_flex_week_ID_" + AvailFlexWeekID + "'></td>"; 
    }
    else {
        html += "<td class='col_50' style='padding-bottom: 7px;'><input type='checkbox' checked id='ckb_flex_week_ID_" + AvailFlexWeekID + "'></td>"; 
    }
    html += "<td class='col_250'><a href=# id='act_title_" + AvailFlexWeekID +  "'>" + act_title + "</a></td>";
    html += "<td class='col_250'>" + act_presenter + "</td>";
    html += "<td class='col_250'>" + location + "</td>";
    html += "<td class='col_150'>" + start_date + " " + start_time + "</td>";
    html += "<td class='col_150'>" + end_date + " " + end_time + "</td>";
    if (usr_flex_week_id === null) {
        html += "<td class='col_100'><input class='col_100' type='text' style='text-align: center;' value='" + fw_hours + "' id='flex_hrs_" + AvailFlexWeekID + "'/></td>";
    }
    else {
        html += "<td class='col_100'><input class='col_100' type='text' style='text-align: center;' value='" + user_fw_hrs + "' id='flex_hrs_" + AvailFlexWeekID + "'/></td>";
    }
    html += "<td class='col_300'>" + act_descrip + "</td>";
    html += "<td class='col_100' style='display: none;' id='usr_flex_week_ID_" + AvailFlexWeekID + "'>" + usr_flex_week_id + "</td>";
    html += "</tr>";
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////
function addUserFlexWeekFromList(avail_flex_week_ID, login_id, fw_hours) {
    var flex_week_ID = copyFlexWeek(avail_flex_week_ID, login_id, fw_hours);
    copyFWJustArea(avail_flex_week_ID, flex_week_ID);
    insertFlexWeekUserInfo(flex_week_ID, avail_flex_week_ID);
}

function getLoginID() {    
    var name = textReplaceApostrophe(sessionStorage.getItem('m_loginName'));
    var email = textReplaceApostrophe(sessionStorage.getItem('m_loginEmail'));
    var depart = textReplaceApostrophe(sessionStorage.getItem('m_loginDepart'));
    var phone = textReplaceApostrophe(sessionStorage.getItem('m_loginPhone'));
    var division = textReplaceApostrophe(sessionStorage.getItem('m_loginDiv'));
    var emp_type = textReplaceApostrophe(sessionStorage.getItem('m_empType'));
    
    var login = new Array();
    login = db_getLogin(email);
    
    if (login.length === 0) {
        return db_insertLogin(name, email, depart, phone, division, emp_type);
    }
    else {
        return login[0][0];
    }
}

function copyFlexWeek(avail_flex_week_ID, login_ID, fw_hours) {
    var today = new Date();
    var day = today.getDate();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    var cur_date = mon + "/" + day + "/" + yr;
    
    return db_copyFlexWeek(avail_flex_week_ID, login_ID, cur_date, fw_hours);
}

function copyFWJustArea(avail_flex_week_ID, flex_week_ID) {
    return db_copyFWJustArea(avail_flex_week_ID, flex_week_ID);
}

function insertFlexWeekUserInfo(flex_week_ID, avail_flex_week_ID) {
    var requestor = textReplaceApostrophe(sessionStorage.getItem('m_loginName'));
    var email = textReplaceApostrophe(sessionStorage.getItem('m_loginEmail'));
    var depart = textReplaceApostrophe(sessionStorage.getItem('m_loginDepart'));
    var phone = textReplaceApostrophe(sessionStorage.getItem('m_loginPhone'));
    var division = textReplaceApostrophe(sessionStorage.getItem('m_loginDiv'));
    
    return db_insertFlexWeekUserInfo(flex_week_ID, avail_flex_week_ID, requestor, email, depart, phone, division);
}

//////////////////////////////////////////////////////////////////////////////
function updateSelectedFlexWeek() {
    var rowCount = $('#avail_flex_week_tbl tr').length;
    for (var i = 1; i < rowCount; i++) {
        var currentId = $('#avail_flex_week_tbl tr').eq(i).attr('id');
        var fw_ID = currentId.replace("avail_flex_week_ID_", "");
        
        var ckb = ($('#ckb_flex_week_ID_' + fw_ID).is(':checked') ? true : false);
        var usr_fw_ID = $('#usr_flex_week_ID_' + fw_ID).html();

        if (ckb) {
            var fw_hrs = $('#flex_hrs_' + fw_ID).val();
            if (fw_hrs === "") {
                fw_hrs = "0.00";
            }
            
            if (usr_fw_ID === "null") {
                addUserFlexWeekFromList(fw_ID, usr_login_ID, fw_hrs);
            }
            else {
                db_updateFlexWeek(usr_fw_ID, fw_hrs);
            }
        }
        else {
            if (usr_fw_ID !== "null") {
                db_deleteFlexWeek(usr_fw_ID);
            }
        }
    }
}
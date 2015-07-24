////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        setFlexWeekFiscalYrs();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getFlexDetailList("", "", "All", fiscal_yrs);
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#flex_detail_tbl").tablesorter({ widgets: ['stickyHeaders'] });
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {    
    $('#nav_admin').click(function() {
        window.open('administrator.html', '_self');
    });
    
    $('#start_date').change(function() {
        var start_date = $(this).val();
        $('#end_date').datepicker( "option", "minDate", new Date(start_date));
    });
    
    $('#btn_to_excel').click(function() {
        var start_date = textReplaceApostrophe($('#start_date').val());
        var end_date = textReplaceApostrophe($('#end_date').val());
        var fw_just_id = $('#justification_id').val();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        
        var url_html = "StartDate=" + start_date + "&EndDate=" + end_date + "&FWJustID=" + fw_just_id + "&FiscalYrs=" + fiscal_yrs;
        location.href = "php/db_saveFlexWeekDetailCSV.php?" + url_html;
    });
    
    $('#btn_refresh').click(function() {
        var start_date = textReplaceApostrophe($('#start_date').val());
        var end_date = textReplaceApostrophe($('#end_date').val());
        var fw_just_id = $('#justification_id').val();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        
        getFlexDetailList(start_date, end_date, fw_just_id, fiscal_yrs);
        initializeTable();
    });
    
    // datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function setFlexWeekFiscalYrs() {
    var result = new Array();
    result = db_getFlexWeekFiscalYrs();
    
    var fiscal_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $("#fw_fiscal_yrs").append(fiscal_html);
    $("#fw_fiscal_yrs").val(sessionStorage.getItem('m_defaultFiscalYrs'));
    $('#fw_fiscal_yrs').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getFlexDetailList(start_date, end_date, fw_just_id, fiscal_yrs) {
    var result = new Array(); 
    result = db_getFlexWeekDetail(start_date, end_date, fw_just_id, fiscal_yrs);
    
    $("#body_tr").empty();
    var str_html = "";
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var fw_hrs = Number(result[i]['FWHours']).toFixed(2);
            var confirm = (result[i]['Confirmed'] ===  "1") ? "Yes" : "No";
            str_html += setFlexDetailListHTML(result[i]['LoginName'], result[i]['ActTitle'], result[i]['StartDate'], result[i]['EndDate'], fw_hrs, confirm);
        }
        $("#body_tr").append(str_html);
    }
    
    $("#flex_detail_tbl").trigger("update");
}

function setFlexDetailListHTML(faculty_name, activity_title, start_date, end_date, fw_hrs, confirm) {    
    var tbl_html = "<tr>";
    tbl_html += "<td class='span3'>" + faculty_name + "</td>";
    tbl_html += "<td class='span5'>" + activity_title + "</td>";
    tbl_html += "<td class='span1'>" + start_date + "</td>";
    tbl_html += "<td class='span1'>" + end_date + "</td>";
    tbl_html += "<td class='span1'>" + fw_hrs + "</td>";
    tbl_html += "<td class='span1'>" + confirm + "</td>";
    tbl_html += "</tr>";
    return tbl_html;
}
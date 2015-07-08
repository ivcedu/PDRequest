////////////////////////////////////////////////////////////////////////////////
window.onload = function() {   
    if (sessionStorage.key(0) !== null) {
        setPDRequestFiscalYrs();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        getChancellorFlexWeekList("", "", "All", fiscal_yrs);
        initializeTable();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function initializeTable() {
    $("#chancellor_flex_week_tbl").tablesorter({ widgets: ['stickyHeaders'] });
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
        var etype = $('#employee_type').val();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        
        var url_html = "StartDate=" + start_date + "&EndDate=" + end_date + "&EType=" + etype + "&FiscalYrs=" + fiscal_yrs;
        location.href = "php/db_saveChancellorFlexWeekCSV.php?" + url_html;
    });
    
    $('#btn_refresh').click(function() {
        var start_date = textReplaceApostrophe($('#start_date').val());
        var end_date = textReplaceApostrophe($('#end_date').val());
        var etype = $('#employee_type').val();
        var fiscal_yrs = $('#fw_fiscal_yrs').val();
        
        getChancellorFlexWeekList(start_date, end_date, etype, fiscal_yrs);
        initializeTable();
    });
    
    // datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function setPDRequestFiscalYrs() {
    var result = new Array();
    result = db_getAvailPDRequestFiscalYrs();
    
    var fiscal_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $("#fw_fiscal_yrs").append(fiscal_html);
    $('#fw_fiscal_yrs').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getChancellorFlexWeekList(start_date, end_date, etype, fiscal_yrs) {
    var result = new Array(); 
    result = db_getChancellorFlexWeek(start_date, end_date, etype, fiscal_yrs);
    
    $("#body_tr").empty();
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            var request_hrs = Number(result[i]['RequestHrs']).toFixed(2);
            var approved_hrs = Number(result[i]['ApprovedHrs']).toFixed(2);
            var request_amount = formatDollar(Number(result[i]['RequestAmount']), 2);
            var approved_amount = formatDollar(Number(result[i]['ApprovedAmount']), 2);
            setChancellorFlexWeekListHTML(result[i]['FacultyName'], result[i]['Employee'], request_hrs, approved_hrs, request_amount, approved_amount);
        }
    }
    
    $("#chancellor_flex_week_tbl").trigger("update");
}

function setChancellorFlexWeekListHTML(faculty_name, employee, request_hrs, approved_hrs, request_amount, approved_amount) {    
    var tbl_html = "<tr>";
    tbl_html += "<td class='span2'>" + faculty_name + "</td>";
    tbl_html += "<td class='span2'>" + employee + "</td>";
    tbl_html += "<td class='span2'>" + request_hrs + "</td>";
    tbl_html += "<td class='span2'>" + approved_hrs + "</td>";
    tbl_html += "<td class='span2'>" + request_amount + "</td>";
    tbl_html += "<td class='span2'>" + approved_amount + "</td>";
    tbl_html += "</tr>";
    
    $("#body_tr").append(tbl_html);
}
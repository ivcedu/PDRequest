////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        setPDSettingFiscalYrs();
        getPDSettingValues();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {  
    $('#nav_admin').click(function() {
        window.open('administrator.html', '_self');
    });
    
    // pd system apply date list change event //////////////////////////////////
    $('#system_fiscal_yrs_list').change(function() {
        if ($(this).val() === "New System Setting") {
            resetPDSettingValues();
        }
        else {
            getPDSettingValues();
        }
    });
    
    // breakfast fields change /////////////////////////////////////////////////
    $('#sel_breakfast').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    // lunch fields change /////////////////////////////////////////////////////
    $('#sel_lunch').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    // dinner fields change ////////////////////////////////////////////////////
    $('#sel_dinner').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    // mileage fields change ///////////////////////////////////////////////////
    $('#sel_mileage').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    // total ft required fields change /////////////////////////////////////////
    $('#sel_fh_required').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(input_val.toFixed(2));
    });
    
    // total pt required fields change /////////////////////////////////////////
    $('#sel_ph_required').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(input_val.toFixed(2));
    });
    
    // full time limit fields change ///////////////////////////////////////////
    $('#sel_ft_limit').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    // part time limit fields change ///////////////////////////////////////////
    $('#sel_pt_limit').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, ''));         
        $(this).val(formatDollar(input_val, 2));
    });
    
    // save button click ///////////////////////////////////////////////////////
    $('#btn_save').click(function() {
        var system_fiscal_yrs_list = $('#system_fiscal_yrs_list').val();
        if (system_fiscal_yrs_list === "New System Setting") {
            addPDSystemValues();
            alert("New PD System Setting has been entered successfully");
        }
        else {
            updatePDSystemValues();
            alert(system_fiscal_yrs_list + " PD System Setting has been updated successfully");
        }
        
        setPDSettingFiscalYrs();
        getPDSettingValues();
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
});

////////////////////////////////////////////////////////////////////////////////
function resetPDSettingValues() {
    $('#sel_fiscal_yrs').val("");
    $('#sel_breakfast').val("");
    $('#sel_lunch').val("");
    $('#sel_dinner').val("");
    $('#sel_mileage').val("");
    $('#sel_fh_required').val("");
    $('#sel_ph_required').val("");
    $('#sel_ft_limit').val("");
    $('#sel_pt_limit').val("");
}

////////////////////////////////////////////////////////////////////////////////
function setPDSettingFiscalYrs() {
    var result = new Array();
    result = db_getPDSystemFiscalYrsList();
    
    $("#system_fiscal_yrs_list").empty();
    var fiscal_yrs_list_html = "";
    for(var i = 0; i < result.length; i++) {
        fiscal_yrs_list_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    fiscal_yrs_list_html += "<option value='New System Setting'>New System Setting</option>";
    
    $("#system_fiscal_yrs_list").append(fiscal_yrs_list_html);
    $('#system_fiscal_yrs_list').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getPDSettingValues() {
    var fiscal_yrs = $('#system_fiscal_yrs_list').val();
    $('#sel_fiscal_yrs').val(fiscal_yrs);
    
    var result = new Array();
    result = db_getPDSystemByFiscalYrs(fiscal_yrs);
    
    for(var i = 0; i < result.length; i++) {
        if (result[i]['PDSystem'] === "Breakfast") {
            $('#sel_breakfast').val(formatDollar(Number(result[i]['PDAmt']), 2));
            continue;
        }
        if (result[i]['PDSystem'] === "Lunch") {
            $('#sel_lunch').val(formatDollar(Number(result[i]['PDAmt']), 2));
            continue;
        }
        if (result[i]['PDSystem'] === "Dinner") {
            $('#sel_dinner').val(formatDollar(Number(result[i]['PDAmt']), 2));
            continue;
        }
        if (result[i]['PDSystem'] === "Mileage") {
            $('#sel_mileage').val(formatDollar(Number(result[i]['PDAmt']), 2));
            continue;
        }
        if (result[i]['PDSystem'] === "Total_FH_Required") {
            $('#sel_fh_required').val(Number(result[i]['PDAmt']).toFixed(2));
            continue;
        }
        if (result[i]['PDSystem'] === "Total_PH_Required") {
            $('#sel_ph_required').val(Number(result[i]['PDAmt']).toFixed(2));
            continue;
        }
        if (result[i]['PDSystem'] === "FullTimeLimit") {
            $('#sel_ft_limit').val(formatDollar(Number(result[i]['PDAmt']), 2));
            continue;
        }
        if (result[i]['PDSystem'] === "PartTimeLimit") {
            $('#sel_pt_limit').val(formatDollar(Number(result[i]['PDAmt']), 2));
            continue;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function addPDSystemValues() {
    var sel_fiscal_yrs = $('#sel_fiscal_yrs').val();
    
    var sel_breakfast = revertDollar($('#sel_breakfast').val());
    db_insertPDSystem("Breakfast", sel_fiscal_yrs, sel_breakfast);
    var sel_lunch = revertDollar($('#sel_lunch').val());
    db_insertPDSystem("Lunch", sel_fiscal_yrs, sel_lunch);
    var sel_dinner = revertDollar($('#sel_dinner').val());
    db_insertPDSystem("Dinner", sel_fiscal_yrs, sel_dinner);
    var sel_mileage = revertDollar($('#sel_mileage').val());
    db_insertPDSystem("Mileage", sel_fiscal_yrs, sel_mileage);
    var sel_fh_required = $('#sel_fh_required').val();
    db_insertPDSystem("Total_FH_Required", sel_fiscal_yrs, sel_fh_required);
    var sel_ph_required = $('#sel_ph_required').val();
    db_insertPDSystem("Total_PH_Required", sel_fiscal_yrs, sel_ph_required);
    var sel_ft_limit = revertDollar($('#sel_ft_limit').val());
    db_insertPDSystem("FullTimeLimit", sel_fiscal_yrs, sel_ft_limit);
    var sel_pt_limit = revertDollar($('#sel_pt_limit').val());
    db_insertPDSystem("PartTimeLimit", sel_fiscal_yrs, sel_pt_limit);
    
    addPDSystemLog(" add " + sel_fiscal_yrs + " new system setting");
}

////////////////////////////////////////////////////////////////////////////////
function updatePDSystemValues() {
    var fiscal_yrs = $('#system_fiscal_yrs_list').val();
    var sel_fiscal_yrs = $('#sel_fiscal_yrs').val();
    
    var sel_breakfast = revertDollar($('#sel_breakfast').val());
    db_updatePDSystem("Breakfast", fiscal_yrs, sel_fiscal_yrs, sel_breakfast);
    var sel_lunch = revertDollar($('#sel_lunch').val());
    db_updatePDSystem("Lunch", fiscal_yrs, sel_fiscal_yrs, sel_lunch);
    var sel_dinner = revertDollar($('#sel_dinner').val());
    db_updatePDSystem("Dinner", fiscal_yrs, sel_fiscal_yrs, sel_dinner);
    var sel_mileage = revertDollar($('#sel_mileage').val());
    db_updatePDSystem("Mileage", fiscal_yrs, sel_fiscal_yrs, sel_mileage);
    var sel_fh_required = $('#sel_fh_required').val();
    db_updatePDSystem("Total_FH_Required", fiscal_yrs, sel_fiscal_yrs, sel_fh_required);
    var sel_ph_required = $('#sel_ph_required').val();
    db_updatePDSystem("Total_PH_Required", fiscal_yrs, sel_fiscal_yrs, sel_ph_required);
    var sel_ft_limit = revertDollar($('#sel_ft_limit').val());
    db_updatePDSystem("FullTimeLimit", fiscal_yrs, sel_fiscal_yrs, sel_ft_limit);
    var sel_pt_limit = revertDollar($('#sel_pt_limit').val());
    db_updatePDSystem("PartTimeLimit", fiscal_yrs, sel_fiscal_yrs, sel_pt_limit);
    
    addPDSystemLog(" update " + fiscal_yrs + " new system setting");
}

////////////////////////////////////////////////////////////////////////////////
function addPDSystemLog(str_log_status) {
    var login_name = sessionStorage.getItem('m_loginName');
    var note = login_name + str_log_status + "\n";
    
    note += "PD System Apply Date: " + $('#sel_fiscal_yrs').val() + "\n";
    note += "Breakfast: " + $('#sel_breakfast').val() + "\n";
    note += "Lunch: " + $('#sel_lunch').val() + "\n";
    note += "Dinner: " + $('#sel_dinner').val() + "\n";
    note += "Mileage: " + $('#sel_mileage').val() + "\n";
    note += "Total FH Required: " + $('#sel_fh_required').val() + "\n";
    note += "Total PH Required: " + $('#sel_ph_required').val() + "\n";
    note += "Full Time Limit: " + $('#sel_ft_limit').val() + "\n";
    note += "Part Time Limit: " + $('#sel_pt_limit').val() + "\n";
    
    db_insertPDSystemLog(login_name, note);
}
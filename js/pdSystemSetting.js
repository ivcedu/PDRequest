////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        setPDSettingApplyDate();
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
    $('#system_app_date_list').change(function() {
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
        var system_app_date_list = $('#system_app_date_list').val();
        if (system_app_date_list === "New System Setting") {
            addPDSystemValues();
        }
        else {
            updatePDSystemValues();
        }
        
        setPDSettingApplyDate();
        getPDSettingValues();
    });
    
    // selectpicker
    $('.selectpicker').selectpicker();
    
    // datepicker
    $('#sel_apply_date').datepicker();
});

////////////////////////////////////////////////////////////////////////////////
function resetPDSettingValues() {
    $('#sel_apply_date').val("");
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
function setPDSettingApplyDate() {
    var result = new Array();
    result = db_getPDSystemApplyDateList();
    
    $("#system_app_date_list").empty();
    var app_date_list_html = "";
    for(var i = 0; i < result.length; i++) {
        var apply_date = convertDBDateToString(result[i]['ApplyDate']);
        app_date_list_html += "<option value='" + apply_date + "'>" + apply_date + "</option>";
    }
    app_date_list_html += "<option value='New System Setting'>New System Setting</option>";
    
    $("#system_app_date_list").append(app_date_list_html);
    $('#system_app_date_list').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getPDSettingValues() {
    var apply_date = $('#system_app_date_list').val();
    $('#sel_apply_date').val(apply_date);
    
    var result = new Array();
    result = db_getPDSystemByApplyDate(apply_date);
    
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
    var sel_apply_date = $('#sel_apply_date').val();
    
    var sel_breakfast = revertDollar($('#sel_breakfast').val());
    db_insertPDSystem("Breakfast", sel_apply_date, sel_breakfast);
    var sel_lunch = revertDollar($('#sel_lunch').val());
    db_insertPDSystem("Lunch", sel_apply_date, sel_lunch);
    var sel_dinner = revertDollar($('#sel_dinner').val());
    db_insertPDSystem("Dinner", sel_apply_date, sel_dinner);
    var sel_mileage = revertDollar($('#sel_mileage').val());
    db_insertPDSystem("Mileage", sel_apply_date, sel_mileage);
    var sel_fh_required = $('#sel_fh_required').val();
    db_insertPDSystem("Total_FH_Required", sel_apply_date, sel_fh_required);
    var sel_ph_required = $('#sel_ph_required').val();
    db_insertPDSystem("Total_PH_Required", sel_apply_date, sel_ph_required);
    var sel_ft_limit = revertDollar($('#sel_ft_limit').val());
    db_insertPDSystem("FullTimeLimit", sel_apply_date, sel_ft_limit);
    var sel_pt_limit = revertDollar($('#sel_pt_limit').val());
    db_insertPDSystem("PartTimeLimit", sel_apply_date, sel_pt_limit);
}

////////////////////////////////////////////////////////////////////////////////
function updatePDSystemValues() {
    var apply_date = $('#system_app_date_list').val();
    var sel_apply_date = $('#sel_apply_date').val();
    
    var sel_breakfast = revertDollar($('#sel_breakfast').val());
    db_updatePDSystem("Breakfast", apply_date, sel_apply_date, sel_breakfast);
    var sel_lunch = revertDollar($('#sel_lunch').val());
    db_updatePDSystem("Lunch", apply_date, sel_apply_date, sel_lunch);
    var sel_dinner = revertDollar($('#sel_dinner').val());
    db_updatePDSystem("Dinner", apply_date, sel_apply_date, sel_dinner);
    var sel_mileage = revertDollar($('#sel_mileage').val());
    db_updatePDSystem("Mileage", apply_date, sel_apply_date, sel_mileage);
    var sel_fh_required = $('#sel_fh_required').val();
    db_updatePDSystem("Total_FH_Required", apply_date, sel_apply_date, sel_fh_required);
    var sel_ph_required = $('#sel_ph_required').val();
    db_updatePDSystem("Total_PH_Required", apply_date, sel_apply_date, sel_ph_required);
    var sel_ft_limit = revertDollar($('#sel_ft_limit').val());
    db_updatePDSystem("FullTimeLimit", apply_date, sel_apply_date, sel_ft_limit);
    var sel_pt_limit = revertDollar($('#sel_pt_limit').val());
    db_updatePDSystem("PartTimeLimit", apply_date, sel_apply_date, sel_pt_limit);
}
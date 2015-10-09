////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {
        setFiscalYrs();
        getActState();
        if (sessionStorage.getItem('m_AvailFlexWeekID') !== null) {
            getSelectAvailFlexWeek(sessionStorage.getItem('m_AvailFlexWeekID'));
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {     
    $('#nav_home').click(function() {
        sessionStorage.removeItem("m_AvailFlexWeekID");
        window.open('home.html', '_self');
    });
    
    $('#nav_administrator').click(function() {
        sessionStorage.removeItem("m_AvailFlexWeekID");
        window.open('administrator.html', '_self');
    });
    
    $('#nav_logout').click(function() {
        var parent_site = sessionStorage.getItem('m_parentSite');
        sessionStorage.clear();
        window.open(parent_site, '_self');
    });
    
    $('#start_date').change(function() {
        var start_date = $(this).val();
        $('#end_date').datepicker( "option", "minDate", new Date(start_date));
    });
    
    // flex week activity hours fields change //////////////////////////////////
    $('#flex_week_activity_hours').change(function() {      
        var input_val = Number($(this).val().replace(/[^0-9\.]/g, '')).toFixed(2);
        if (input_val <= 0) {
            $(this).val('');
        }
        else {          
            $(this).val(input_val);
        }
    }); 
    
    // submit click ////////////////////////////////////////////////////////////
    $('#btn_submit').click(function() {       
        var err = formMainValidation();
        if (err !== "") {
            alert(err);
            return false;
        }
        
        var administrator_ID = getAdministratorID();
        if (administrator_ID === "") {
            return false;
        }
        
        var avail_flex_week_ID = sessionStorage.getItem('m_AvailFlexWeekID');
        updateAvailFlexWeek(avail_flex_week_ID, administrator_ID);
        
        window.open('administrator.html', '_self');
    });
    
    // auto size
    $('#activity_description').autosize();
    
    // datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // timepicker
    $('#start_time').timepicker();
    $('#end_time').timepicker();
});

////////////////////////////////////////////////////////////////////////////////
function formMainValidation() {
    var err = "";
    
    if ($('#activity_title').val().replace(/\s+/g, '') === "") {
        err += "Activity Title is a required field\n";
    }
    if ($('#activity_presenter').val().replace(/\s+/g, '') === "") {
        err += "Activity Presenter is a required field\n";
    }
    if ($('#location').val().replace(/\s+/g, '') === "") {
        err += "Location is a required field\n";
    }
    if ($('#activity_city').val().replace(/\s+/g, '') === "") {
        err += "Activity City is a required field\n";
    }
    if ($('#activity_state').val() === "Select...") {
        err += "Activity State is a required field\n";
    }
    if ($('#activity_description').val().replace(/\s+/g, '') === "") {
        err += "Activity Description is a required field\n";
    }
    if ($('#start_date').val().replace(/\s+/g, '') === "") {
        err += "Start Date is a required field\n";
    }
    if ($('#start_time').val().replace(/\s+/g, '') === "") {
        err += "Start Time is a required field\n";
    }
    if ($('#end_date').val().replace(/\s+/g, '') === "") {
        err += "End Date is a required field\n";
    }
    if ($('#end_time').val().replace(/\s+/g, '') === "") {
        err += "End Time is a required field\n";
    }
    if ($('#flex_week_activity_hours').val().replace(/\s+/g, '') === "") {
        err += "Flex Week Activity Hours is a required field\n";
    }

    return err;
}

function setClearJustArea() {
    $("#FWJust1").prop('checked', false);
    $("#FWJust2").prop('checked', false);
    $("#FWJust3").prop('checked', false);
    $("#FWJust4").prop('checked', false);
    $("#FWJust5").prop('checked', false);
    $("#FWJust6").prop('checked', false);
    $("#FWJust7").prop('checked', false);
    $("#FWJust8").prop('checked', false);
    $("#FWJust9").prop('checked', false);
}

////////////////////////////////////////////////////////////////////////////////
function getAdministratorID() {
    var login_email = sessionStorage.getItem("m_loginEmail");
    var admin_list = new Array();
    admin_list = db_getAdministrator(login_email);
    
    if (admin_list.length > 0) {
        return admin_list[0][0];
    }
    else {
        return "";
    }
}

function setFiscalYrs() {
    var today = new Date();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    
    var fiscal_yrs_0 = (yr - 1) + "-" + yr;
    var fiscal_yrs_1 = yr + "-" + (yr + 1);
    var fiscal_yrs_2 = (yr + 1) + "-" + (yr + 2);
    
    var fiscal_html ="";
    if (mon > 6) {
        fiscal_html += "<option value='" + fiscal_yrs_1 + "'>" + fiscal_yrs_1 + "</option>";
        fiscal_html += "<option value='" + fiscal_yrs_2 + "'>" + fiscal_yrs_2 + "</option>";
    }
    else {
        fiscal_html += "<option value='" + fiscal_yrs_0 + "'>" + fiscal_yrs_0 + "</option>";
        fiscal_html += "<option value='" + fiscal_yrs_1 + "'>" + fiscal_yrs_1 + "</option>";
    }
    
    $("#fiscal").append(fiscal_html);    
    $('#fiscal').selectpicker('refresh');
}

function getActState() {
    var act_state = new Array();
    act_state = db_getActState();
    
    var state_html = "<option value='Select...'>Select...</option>";
    for(var i = 0; i < act_state.length; i++) { 
        var state_id = act_state[i][0];
        var state = act_state[i]['State'];
        state_html += "<option value='" + state_id + "'>" + state + "</option>";
    }
    
    $("#activity_state").append(state_html);
    $('#activity_state').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getSelectAvailFlexWeek(AvailFlexWeekID) {
    var avail_flex_week = new Array();
    avail_flex_week = db_getAvailFlexWeek(AvailFlexWeekID);
    
    if (avail_flex_week.length === 1) {
        $('#activity_title').val(avail_flex_week[0]['ActTitle']);
        $('#activity_presenter').val(avail_flex_week[0]['ActPresenter']);
        $('#location').val(avail_flex_week[0]['Location']);
        $('#activity_city').val(avail_flex_week[0]['ActCity']);
        $('#activity_state').val(avail_flex_week[0]['ActStateID']);
        $('#activity_description').val(avail_flex_week[0]['ActDescrip']);
        $('#activity_link').val(avail_flex_week[0]['ActLink']);
        $('#start_date').val(avail_flex_week[0]['StartDate']);
        $('#start_time').val(avail_flex_week[0]['StartTime']);
        $('#end_date').val(avail_flex_week[0]['EndDate']);
        $('#end_time').val(avail_flex_week[0]['EndTime']);
        $('#flex_week_activity_hours').val(avail_flex_week[0]['FWHours']);
        
        getSelectAvailFWJustArea(AvailFlexWeekID);
    }
}

function getSelectAvailFWJustArea(AvailFlexWeekID) {
    var avail_fw_just_area = new Array();
    avail_fw_just_area = db_getAvailFWJustArea(AvailFlexWeekID);
    
    setClearJustArea();
    if (avail_fw_just_area.length === 1) {
        if (avail_fw_just_area[0]['FWJust1'] === "1") {
            $("#FWJust1").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust2'] === "1") {
            $("#FWJust2").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust3'] === "1") {
            $("#FWJust3").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust4'] === "1") {
            $("#FWJust4").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust5'] === "1") {
            $("#FWJust5").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust6'] === "1") {
            $("#FWJust6").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust7'] === "1") {
            $("#FWJust7").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust8'] === "1") {
            $("#FWJust8").prop('checked', true);
        }
        if (avail_fw_just_area[0]['FWJust9'] === "1") {
            $("#FWJust9").prop('checked', true);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function updateAvailFlexWeek(AvailFlexWeekID, AdministratorID) {
    var act_title = textReplaceApostrophe($('#activity_title').val());
    var fiscal_yrs = $('#fiscal').val();
    var act_presenter = textReplaceApostrophe($('#activity_presenter').val());
    var location = textReplaceApostrophe($('#location').val());
    var act_city = textReplaceApostrophe($('#activity_city').val());
    var act_state_ID = $('#activity_state').val();
    var act_descrip = textReplaceApostrophe($('#activity_description').val());
    var act_link = textReplaceApostrophe($('#activity_link').val());
    var start_date = textReplaceApostrophe($('#start_date').val());
    var start_time = textReplaceApostrophe($('#start_time').val());
    var end_date = textReplaceApostrophe($('#end_date').val());
    var end_time = textReplaceApostrophe($('#end_time').val());
    var flex_week_activity_hours = Number($('#flex_week_activity_hours').val());
    
    if (AvailFlexWeekID === null) {
        AvailFlexWeekID = db_insertAvailFlexWeek(AdministratorID, act_title, fiscal_yrs, act_presenter, location, act_city, act_state_ID, act_descrip, act_link, 
                                                    start_date, start_time, end_date, end_time, flex_week_activity_hours);
        updateAvailFWJustArea(AvailFlexWeekID, false);
    }
    else {
        db_updateAvailFlexWeek(AvailFlexWeekID, AdministratorID, act_title, fiscal_yrs, act_presenter, location, act_city, act_state_ID, act_descrip, act_link, 
                                start_date, start_time, end_date, end_time, flex_week_activity_hours);
        updateAvailFWJustArea(AvailFlexWeekID, true);
    }
}

function updateAvailFWJustArea(AvailFlexWeekID, update) {
    var FWJust1 = $('#FWJust1').is(':checked');
    var FWJust2 = $('#FWJust2').is(':checked');
    var FWJust3 = $('#FWJust3').is(':checked');
    var FWJust4 = $('#FWJust4').is(':checked');
    var FWJust5 = $('#FWJust5').is(':checked');
    var FWJust6 = $('#FWJust6').is(':checked');
    var FWJust7 = $('#FWJust7').is(':checked');
    var FWJust8 = $('#FWJust8').is(':checked');
    var FWJust9 = $('#FWJust9').is(':checked');
    
    if (update === false) {
        db_insertAvailFWJustArea(AvailFlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9);
    }
    else {
        db_updateAvailFWJustArea(AvailFlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9);
    }
}
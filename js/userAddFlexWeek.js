////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) {        
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
    $('#nav_print').click(function() {
        window.print();
    });
    
    $('#nav_close').click(function() {
        window.open('availableFlexWeek.html', '_self');
        return false;
    });
});

////////////////////////////////////////////////////////////////////////////////
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

function getActStateByState(State) {
    var state_list = new Array();
    state_list = db_getActStateByState(State);
    
    if (state_list.length === 1) {
        return state_list[0]['ActStateID'];
    }
    else {
        return "";
    }
}

function getSelectAvailFlexWeek(AvailFlexWeekID) {
    var avail_flex_week = new Array();
    avail_flex_week = db_getAvailFlexWeek(AvailFlexWeekID);
    
    if (avail_flex_week.length === 1) {
        $('#activity_title').html(avail_flex_week[0]['ActTitle']);
        $('#activity_presenter').html(avail_flex_week[0]['ActPresenter']);
        $('#location').html(avail_flex_week[0]['Location']);
        $('#activity_city').html(avail_flex_week[0]['ActCity']);
        $('#activity_state').html(getActStateByID(avail_flex_week[0]['ActStateID']));
        $('#activity_description').html(avail_flex_week[0]['ActDescrip']);
        $('#activity_link').html(avail_flex_week[0]['ActLink']);
        $('#start_date').html(avail_flex_week[0]['StartDate']);
        $('#start_time').html(avail_flex_week[0]['StartTime']);
        $('#end_date').html(avail_flex_week[0]['EndDate']);
        $('#end_time').html(avail_flex_week[0]['EndTime']);
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
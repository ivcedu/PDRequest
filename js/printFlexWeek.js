////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    if (sessionStorage.key(0) !== null) { 
        if (sessionStorage.getItem('m_FlexWeekID') !== null) {
            var flex_week_ID = sessionStorage.getItem('m_FlexWeekID');
            getSelectFlexWeekUserInfo(flex_week_ID);
            getSelectFlexWeek(flex_week_ID);
            getSelectFWJustArea(flex_week_ID);
        }
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {       
    $('#nav_close').click(function() {
        sessionStorage.removeItem("m_FlexWeekID");
        window.close();
    });
    
    $('#nav_print').click(function() {
        window.print();
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

////////////////////////////////////////////////////////////////////////////////
function getSelectFlexWeekUserInfo(flex_week_ID) {
    var flex_week_user_info = new Array();
    flex_week_user_info = db_getFlexWeekUserInfo(flex_week_ID);
    
    if (flex_week_user_info.length === 1) {
        $('#requestor').html(flex_week_user_info[0]['Name']);
        $('#email').html(flex_week_user_info[0]['Email']);
        $('#department').html(flex_week_user_info[0]['Depart']);
        $('#phone').html(flex_week_user_info[0]['Phone']);
        $('#school').html(flex_week_user_info[0]['Division']);
    }
}

function getSelectFlexWeek(flex_week_ID) {
    var flex_week = new Array();
    flex_week = db_getFlexWeek(flex_week_ID);
    
    if (flex_week.length === 1) {
        $('#print_title').html(flex_week[0]['ActTitle']);
        
        $('#current_date').html(flex_week[0]['curDate']);
        $('#activity_title').html(flex_week[0]['ActTitle']);
        $('#activity_presenter').html(flex_week[0]['ActPresenter']);
        $('#location').html(flex_week[0]['Location']);
        $('#activity_city').html(flex_week[0]['ActCity']);
        $('#activity_state').html(getActStateByID(flex_week[0]['ActStateID']));
        $('#activity_description').html(flex_week[0]['ActDescrip']);
        $('#activity_link').html(flex_week[0]['ActLink']);
        $('#start_date').html(flex_week[0]['StartDate']);
        $('#start_time').html(flex_week[0]['StartTime']);
        $('#end_date').html(flex_week[0]['EndDate']);
        $('#end_time').html(flex_week[0]['EndTime']);
        $('#flex_week_activity_hours').html(flex_week[0]['FWHours']);
    }
}

function getSelectFWJustArea(flex_week_ID) {
    var fw_just_area = new Array();
    fw_just_area = db_getFWJustArea(flex_week_ID);
    
    setClearJustArea();
    if (fw_just_area.length === 1) {
        if (fw_just_area[0]['FWJust1'] === "1") {
            $("#FWJust1").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust2'] === "1") {
            $("#FWJust2").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust3'] === "1") {
            $("#FWJust3").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust4'] === "1") {
            $("#FWJust4").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust5'] === "1") {
            $("#FWJust5").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust6'] === "1") {
            $("#FWJust6").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust7'] === "1") {
            $("#FWJust7").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust8'] === "1") {
            $("#FWJust8").prop('checked', true);
        }
        if (fw_just_area[0]['FWJust9'] === "1") {
            $("#FWJust9").prop('checked', true);
        }
    }
}
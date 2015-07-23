var sys_breakfast_amt = 0.0;
var sys_lunch_amt = 0.0;
var sys_dinner_amt = 0.0;
var sys_mileage_amt = 0.0;

var PDRequestID = "";
var LoginID = "";
var ResourceTypeID = "";
var StatusID = "1";
var PDReqStepID = "1";

var PDReqUserInfoID = "";
var PDJustAreaID = "";
var PDReqHoursID = "";
var PDReqReimbID = "";
var NarrativeID = "";
var PAReqInfo1ID = "";
var PAReqInfo2ID = "";

var just_narrative_file_index = 1;
var post_activity_info_1_file_index = 1;
var post_activity_info_2_file_index = 1;

////////////////////////////////////////////////////////////////////////////////
function localData_login(loginName, loginEmail, loginDepart, loginPhone, loginDiv, empType) {    
    sessionStorage.setItem('m_loginName', loginName);
    sessionStorage.setItem('m_loginEmail', loginEmail);
    sessionStorage.setItem('m_loginDepart', objToString(loginDepart));
    sessionStorage.setItem('m_loginPhone', objToString(loginPhone));
    sessionStorage.setItem('m_loginDiv', objToString(loginDiv));
    sessionStorage.setItem('m_empType', objToString(empType));
}

function objToString(obj) {
    if (obj === null) {
        return "";
    }
    else {
        return obj;
    }
}

////////////////////////////////////////////////////////////////////////////////
function formatDollar(num, digit) {    
    var negative = "";
    var p = num.toFixed(digit).split(".");
    if (p[0].substr(0, 1) === "-") {
        negative = "-";
        p[0] = p[0].substr(1, p[0].length);
    }
    
    var result = p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
    
    if (negative !== "") {
        return "-$" + result;
    }
    else {
        return "$" + result;
    }
}

function revertDollar(amount) {
    var result = 0;
    
    if(amount !== "") {
        amount = amount.replace("$", "");
        amount = amount.replace(/\,/g,'');
        result = Number(amount);
    }
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function textTruncate(t_size, t_value) {
    var t_default = t_value.length;
    var tr_text = "";
    
    if (t_default > t_size) {
        tr_text = t_value.substring(0, t_size);
        tr_text += " ...";
    }
    else
        tr_text = t_value;
    
    return tr_text;
}

////////////////////////////////////////////////////////////////////////////////
function textReplaceApostrophe(str_value) {
    return str_value.replace(/'/g, "''");
}

////////////////////////////////////////////////////////////////////////////////
function getFileExtension(file_name) {
    return file_name.substr((file_name.lastIndexOf('.') +1)).toLowerCase();
}

////////////////////////////////////////////////////////////////////////////////
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

////////////////////////////////////////////////////////////////////////////////
function convertDBDateTimeToString(date_time) {
    if (date_time === null || date_time === "") {
        return "";
    }
    else {
        var a = date_time.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var sel_date_time = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

        var day = sel_date_time.getDate();
        var mon = sel_date_time.getMonth()+1;
        var yrs = sel_date_time.getFullYear();
        var hrs = sel_date_time.getHours();
        var min = sel_date_time.getMinutes();
        var shift = "AM";
        if (hrs >= 12) {
            if (hrs > 12) {
                hrs -= 12;
            }
            shift = "PM";
        }

        if (min < 10) {
            min = "0" + min;
        }

        return mon + "/" + day + "/" + yrs + " " + hrs + ":" + min + " " + shift;
    }
}

////////////////////////////////////////////////////////////////////////////////
function getAllFiscalYrs() {
    var today = new Date();
    var start_yr = 2014;
    var cur_yr = today.getFullYear();
    var loop = cur_yr - start_yr;
    
    var ar_fiscal_yrs = [];
    for (var i = 0; i <= loop; i++) {
        var str_fy = (start_yr + i) + "-" + (start_yr + i + 1);
        ar_fiscal_yrs.push(str_fy);
    }
    
    return ar_fiscal_yrs;
}

////////////////////////////////////////////////////////////////////////////////
function getTermStart() {
    var curDate = new Date();
    var yrs = curDate.getFullYear();
    
    if (new Date() < new Date('7/1/' + yrs)) {
        return "7/1/" + (yrs - 1);
    }
    else {
        return "7/1/" + yrs;
    }
}

function getTermEnd() {
    var curDate = new Date();
    var yrs = curDate.getFullYear();
    
    if (new Date() < new Date('7/1/' + yrs)) {
        return "6/30/" + yrs;
    }
    else {
        return "6/30/" + (yrs + 1);
    }
}

////////////////////////////////////////////////////////////////////////////////
function getCurrentFiscalYrs() {
    var today = new Date();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();

    if (mon > 6) {
        return yr + "-" + (yr + 1);
    }
    else {
        return (yr - 1) + "-" + yr;
    }
}
var url_login_id = "";
var url_pd_request_id = "";
var url_cur_status_id = "";
var url_cur_step_id = "";
var pd_limit = 0.0;
var amt_encumbered = 0.0;
var available_amount = 0.0;

var fiscal_yrs = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        getURLParameters();
        getAmountEmcombered();
        setPDAmountSummary();
        
        sessionStorage.setItem('m_PDRequestID', url_pd_request_id);
        sessionStorage.setItem('m_pd_limit', pd_limit);
        sessionStorage.setItem('m_amt_encumbered', amt_encumbered);
        sessionStorage.setItem('m_available_amount', available_amount);
        
        if (url_cur_status_id === "2" || url_cur_status_id === "6") {
            window.open('printPDRequest.html?pdrequest_id=' + url_pd_request_id, '_self');
        }
        else if (url_cur_status_id === "4" || url_cur_status_id === "7") {
            if (url_cur_step_id === "1") {
                window.open('postPDRequest.html', '_self');
            }
            else {
                window.open('printPDRequest.html?pdrequest_id=' + url_pd_request_id, '_self');
            }
        }
        else {
            if (url_cur_step_id === "1") {
                window.open('prePDRequest.html', '_self');
            }
            else {
                window.open('postPDRequest.html', '_self');
            }
        }
    }
    else {
        sessionStorage.setItem('m_url_param', location.href);
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
function getURLParameters() {
    var searchStr = location.search;
    var searchArray = new Array();
    while (searchStr!=='') 
    {
        var name, value;
        // strip off leading ? or &
        if ((searchStr.charAt(0)==='?')||(searchStr.charAt(0)==='&')) 
            searchStr = searchStr.substring(1,searchStr.length);
        // find name
        name = searchStr.substring(0,searchStr.indexOf('='));
        // find value
        if (searchStr.indexOf('&')!==-1) 
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.indexOf('&'));
        else 
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.length);
        // add pair to an associative array
        value = value.replace("%20", " ");
        searchArray[name] = value;
        // cut first pair from string
        if (searchStr.indexOf('&')!==-1) 
            searchStr =  searchStr.substring(searchStr.indexOf('&')+1,searchStr.length);
        else 
            searchStr = '';
    }
    
    url_login_id = searchArray['login_id'];
    url_pd_request_id = searchArray['pd_request_id'];
    url_cur_status_id = searchArray['cur_status_id'];
    url_cur_step = searchArray['cur_step'];
}

////////////////////////////////////////////////////////////////////////////////
function getLoginEmployeeType() {
    var email = sessionStorage.getItem('m_loginEmail');
    var login = new Array();
    login = db_getLogin(email);
    
    if (login.length === 1) {
        return login[0]['LoginEType'];
    }
    else {
        return "";
    }
}

function getAmountEmcombered() {
    var result = new Array(); 
    result = db_getPDRequestList(url_login_id, getTermStart(), getTermEnd());
    
    if (result.length !== 0) {
        for(var i = 0; i < result.length; i++) { 
            getConvertAmount(result[i]['PDRequestID'], result[i]['PDReqStepID'], result[i]['StatusID']);
        }
    }
}

function getConvertAmount(PDRequestID, PDReqStepID, StatusID) {
    var result = new Array(new Array()); 
    result = db_getPDReqReimb(PDRequestID);
    
    if (result.length === 1) {
        if (PDReqStepID === "1") {
            if (StatusID === "4") {
                amt_encumbered += Number(result[0]['PreTotalAmtApproved']);
            }
        }
        else {
            if (StatusID === "4") {
                amt_encumbered += Number(result[0]['PostTotalAmtApproved']);
            }
            else if (StatusID === "2" || StatusID === "5" || StatusID === "7") {
                amt_encumbered += Number(result[0]['PreTotalAmtApproved']);
            }
        }
    }
}

function setPDAmountSummary() {
    var login_etype = getLoginEmployeeType();
    
    var pd_request = new Array();
    pd_request = db_getPDRequest(url_pd_request_id);
    fiscal_yrs = pd_request[0]['FiscalYrs'];
    
    if (login_etype === "Full Time Faculty") {
        getSystemPDAmount("FullTimeLimit");
    }
    else if (login_etype === "Part Time Faculty") {
        getSystemPDAmount("PartTimeLimit");
    }

    available_amount = pd_limit - amt_encumbered;
}

function getSystemPDAmount(pd_system) {
    var pdsystem = new Array();
    pdsystem = db_getPDSystem(fiscal_yrs);
    
    for(var i = 0; i < pdsystem.length; i++) {
        var sys_name = pdsystem[i][1];
        if (sys_name === pd_system) {
            pd_limit = Number(pdsystem[i][2]);
            break;
        }
    }
}
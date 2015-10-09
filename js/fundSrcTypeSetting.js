////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        getFundSrcTypeList();
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
    
    // active checkbox change event ////////////////////////////////////////////
    $('#fund_src_list').on('change', 'input[id^="active_"]', function() {
        var fund_src_type_id = $(this).attr('id').replace("active_", "");
        if ($(this).is(':checked')) {
            $('#fund_type_' + fund_src_type_id).prop('readonly', false);
            $('#admin_name_' + fund_src_type_id).prop('readonly', false);
            $('#admin_email_' + fund_src_type_id).prop('readonly', false);
            $('#descrip_' + fund_src_type_id).prop('readonly', false);
        }
        else {
            $('#fund_type_' + fund_src_type_id).prop('readonly', true);
            $('#admin_name_' + fund_src_type_id).prop('readonly', true);
            $('#admin_email_' + fund_src_type_id).prop('readonly', true);
            $('#descrip_' + fund_src_type_id).prop('readonly', true);
        }
    });
    
    // update fund src type button click ///////////////////////////////////////
    $('#fund_src_list').on('click', '[id^="btn_update_id_"]', function() {
        var fund_src_type_id = $(this).attr('id').replace("btn_update_id_", "");
        var err = formValidation(fund_src_type_id);
        if (err !== "") {
            alert(err);
            return false;
        }
        
        if (updateFundSrcType(fund_src_type_id)) {
            alert("Funding source has been update successfully");
            getFundSrcTypeList();
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function formValidation(fund_src_type_id) {
    var err = "";
    if ($('#fund_type_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source name is a required\n";
    }
    if ($('#admin_name_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source administrator name is a required\n";
    }
    if ($('#admin_email_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source admin email is a required\n";
    }
    if ($('#descrip_' + fund_src_type_id).val().replace(/\s+/g, '') === "") {
        err += "Funding source discription is a required\n";
    }
    return err;
}

////////////////////////////////////////////////////////////////////////////////
function updateFundSrcType(fund_src_type_id) {
    var active = $('#active_' + fund_src_type_id).is(':checked');
    var fund_src_type = textReplaceApostrophe($('#fund_type_' + fund_src_type_id).val());
    var fund_src_admin = textReplaceApostrophe($('#admin_name_' + fund_src_type_id).val());
    var fund_src_email = textReplaceApostrophe($('#admin_email_' + fund_src_type_id).val());
    var fund_src_descrip = textReplaceApostrophe($('#descrip_' + fund_src_type_id).val());
    
    return db_updateFundSrcType(fund_src_type_id, active, fund_src_type, fund_src_admin, fund_src_email, fund_src_descrip);
}

////////////////////////////////////////////////////////////////////////////////
function getFundSrcTypeList() {
    var result = new Array(); 
    result = db_getFundSrcTypeAll();
    
    $('#fund_src_list').empty();
    for(var i = 0; i < result.length; i++) { 
        setFundSrcTypeListHTML(result[i]['FundSrcTypeID']);
    
        if (result[i]['Active'] === "1") {
            $('#active_' + result[i]['FundSrcTypeID']).prop('checked', true);
            $('#fund_type_' + result[i]['FundSrcTypeID']).prop('readonly', false);
            $('#admin_name_' + result[i]['FundSrcTypeID']).prop('readonly', false);
            $('#admin_email_' + result[i]['FundSrcTypeID']).prop('readonly', false);
            $('#descrip_' + result[i]['FundSrcTypeID']).prop('readonly', false);
        }
        else {
            $('#fund_type_' + result[i]['FundSrcTypeID']).prop('readonly', true);
            $('#admin_name_' + result[i]['FundSrcTypeID']).prop('readonly', true);
            $('#admin_email_' + result[i]['FundSrcTypeID']).prop('readonly', true);
            $('#descrip_' + result[i]['FundSrcTypeID']).prop('readonly', true);
        }
        
        $('#fund_type_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcType']);
        $('#admin_name_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcAdmin']);
        $('#admin_email_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcEmail']);
        $('#descrip_' + result[i]['FundSrcTypeID']).autosize();
        $('#descrip_' + result[i]['FundSrcTypeID']).val(result[i]['FundSrcDescrip']).trigger('autosize.resize');
    }
}

function setFundSrcTypeListHTML(fund_src_type_id) {
    var list_html = "";
    list_html += "<div class='row-fluid'>";
    list_html += "<div class='span1' style='padding-top: 5px;'>" + fund_src_type_id + "</div>";
    list_html += "<div class='span1' style='padding-top: 2px;'><input type='checkbox' id='active_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span3'><input type='text' class='span12' style='font-weight: bold;' id='fund_type_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span3'><input type='text' class='span12' id='admin_name_" + fund_src_type_id + "'></div>";
    list_html += "<div class='span3'><input type='text' class='span12' id='admin_email_" + fund_src_type_id + "'></div>";  
    list_html += "<div class='span1 form-horizontal'><button class='btn span12' id='btn_update_id_" + fund_src_type_id + "'><i class='icon-circle-arrow-up icon-black'></i></button></div>";
    list_html += "</div>";
    list_html += "<div class='row-fluid'>";
    list_html += "<div class='span2'>Description:</div>";
    list_html += "<div class='span10'><textarea class='span12' style='resize: vertical;' id='descrip_" + fund_src_type_id + "'></textarea></div>";
    list_html += "</div>";
    list_html += "<div class='row-fluid' style='border-bottom: solid 1px;'></div>";
    list_html += "<br>";
    $('#fund_src_list').append(list_html);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * Created By: Rich Kim
 * Created: 9/7/2017
 * Modified: 
 * Version: 1.0.0
 * Description: PD Request automatic encumbered amount calculation base on fiscal year
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const step_pre_activity_id = "1";
const step_post_activity_id = "2";

const status_draft_id = "1";
const status_submitted_id = "2";
const status_processing_id = "3";
const status_approved_id = "4";
const status_more_information_id = "5";
const status_denied_id = "6";
const status_approved_pending_funds_id = "7";
const status_deleted_id = "8";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pd_encumbered = (function() {
    var encumbered_amount = 0.00;
    
    function calculateEncumberedAmt(login_id, fiscal_yrs) {
        var result = new Array();
        result = db_getPDReqReimbByLoginFiscalYrs(login_id, fiscal_yrs);
        
        for (var i = 0; i < result.length; i++) {
            if (result[i]['ReimbStepID'] === step_pre_activity_id) {
                if (result[i]['ReimbStatusID'] === status_approved_id) {
                    encumbered_amount += Number(result[i]['PreTotalAmtApproved']);
                }
                else {
                    continue;
                }
            }
            else {
                if (result[i]['ReimbStatusID'] === status_approved_id) {
                    var dist_paid = Number(result[i]['DistPaid']);
                    if (dist_paid === 0) {
                        encumbered_amount += dist_paid;
                    }
                    else {
                        encumbered_amount += Number(result[i]['PostTotalAmtApproved']);
                    }
                }
                else {
                    continue;
                }
            }
        }
    }
    
    return {
        getAmount: function(login_id, fiscal_yrs) {
            calculateEncumberedAmt(login_id, fiscal_yrs);
            return encumbered_amount;
        }
    };

})();
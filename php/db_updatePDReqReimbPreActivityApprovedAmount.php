<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PreTotalAmtApproved = $_POST['PreTotalAmtApproved'];
        $PreTotalAmtNotApproved = $_POST['PreTotalAmtNotApproved'];
        $PreTotalAmtPendingFunds = $_POST['PreTotalAmtPendingFunds'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                    ."SET PreTotalAmtApproved = '".$PreTotalAmtApproved."', PreTotalAmtNotApproved = '".$PreTotalAmtNotApproved."', PreTotalAmtPendingFunds = '".$PreTotalAmtPendingFunds."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
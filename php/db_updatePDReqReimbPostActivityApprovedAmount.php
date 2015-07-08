<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PostTotalAmtApproved = $_POST['PostTotalAmtApproved'];
        $PostTotalAmtNotApproved = $_POST['PostTotalAmtNotApproved'];
        $PostTotalAmtPendingFunds = $_POST['PostTotalAmtPendingFunds'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                    ."SET PostTotalAmtApproved = '".$PostTotalAmtApproved."', PostTotalAmtNotApproved = '".$PostTotalAmtNotApproved."', PostTotalAmtPendingFunds = '".$PostTotalAmtPendingFunds."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
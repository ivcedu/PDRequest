<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PostTotalAmtApproved = filter_input(INPUT_POST, 'PostTotalAmtApproved');
    $PostTotalAmtNotApproved = filter_input(INPUT_POST, 'PostTotalAmtNotApproved');
    $PostTotalAmtPendingFunds = filter_input(INPUT_POST, 'PostTotalAmtPendingFunds');

    $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                ."SET PostTotalAmtApproved = '".$PostTotalAmtApproved."', PostTotalAmtNotApproved = '".$PostTotalAmtNotApproved."', PostTotalAmtPendingFunds = '".$PostTotalAmtPendingFunds."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
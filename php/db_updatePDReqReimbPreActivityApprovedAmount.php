<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PreTotalAmtApproved = filter_input(INPUT_POST, 'PreTotalAmtApproved');
    $PreTotalAmtNotApproved = filter_input(INPUT_POST, 'PreTotalAmtNotApproved');
    $PreTotalAmtPendingFunds = filter_input(INPUT_POST, 'PreTotalAmtPendingFunds');

    $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                ."SET PreTotalAmtApproved = '".$PreTotalAmtApproved."', PreTotalAmtNotApproved = '".$PreTotalAmtNotApproved."', PreTotalAmtPendingFunds = '".$PreTotalAmtPendingFunds."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
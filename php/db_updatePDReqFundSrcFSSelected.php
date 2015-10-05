<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');
    $FundSrcTypeID = filter_input(INPUT_POST, 'FundSrcTypeID');
    $FSSelected = filter_input(INPUT_POST, 'FSSelected');

    $query = "UPDATE [IVCPD].[dbo].[PDReqFundSrc] "
                ."SET FSSelected = '".$FSSelected."' "
                . "WHERE PDRequestID = '".$PDRequestID."' AND PDReqReimbID = '".$PDReqReimbID."' AND FundSrcTypeID = '".$FundSrcTypeID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
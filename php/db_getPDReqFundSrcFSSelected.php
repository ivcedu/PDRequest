<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');
    $FundSrcTypeID = filter_input(INPUT_POST, 'FundSrcTypeID');

    $query = "SELECT FSSelected FROM [IVCPD].[dbo].[PDReqFundSrc] "
            . "WHERE PDRequestID = '".$PDRequestID."' AND PDReqReimbID = '".$PDReqReimbID."' AND FundSrcTypeID = '".$FundSrcTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["FSSelected"]);
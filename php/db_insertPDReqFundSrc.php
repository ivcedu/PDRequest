<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');
    $FundSrcTypeID = filter_input(INPUT_POST, 'FundSrcTypeID');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqFundSrc] (PDRequestID, PDReqReimbID, FundSrcTypeID) "
            . "VALUES ('$PDRequestID', '$PDReqReimbID', '$FundSrcTypeID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
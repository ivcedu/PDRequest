<?php
    require("config.php");
    
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $ResourceTypeID = filter_input(INPUT_POST, 'ResourceTypeID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $PDReqStepID = filter_input(INPUT_POST, 'PDReqStepID');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    $ActTitle = filter_input(INPUT_POST, 'ActTitle');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "INSERT INTO [IVCPD].[dbo].[PDRequest] (LoginID, ResourceTypeID, StatusID, PDReqStepID, FiscalYrs, ActTitle, StartDate, EndDate) "
                ."VALUES ('$LoginID', '$ResourceTypeID', '$StatusID', '$PDReqStepID', '$FiscalYrs', '$ActTitle', '$StartDate', '$EndDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
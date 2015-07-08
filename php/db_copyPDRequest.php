<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $LoginID = filter_input(INPUT_POST, 'LoginID');

    $query = "INSERT INTO [IVCPD].[dbo].[PDRequest] (LoginID, ResourceTypeID, StatusID, PDReqStepID, FiscalYrs, ActTitle, ActOrganizer, ActCity, ActStateID, ActDescrip, ActLink, StartDate, EndDate, CreateDate) "
                ."SELECT ".$LoginID.", ResourceTypeID, 1, 1, FiscalYrs, ActTitle, ActOrganizer, ActCity, ActStateID, ActDescrip, ActLink, StartDate, EndDate, CONVERT(VARCHAR(10),getdate(),101) "
                ."FROM [IVCPD].[dbo].[PDRequest] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
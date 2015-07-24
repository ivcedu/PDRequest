<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $NewPDRequestID = filter_input(INPUT_POST, 'NewPDRequestID');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqHours] (PDRequestID, PreInputHr, PrePresHr, PrePartHr, PreTotalHr) "
                ."SELECT ".$NewPDRequestID.", PreInputHr, PrePresHr, PrePartHr, PreTotalHr "
                ."FROM [IVCPD].[dbo].[PDReqHours] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
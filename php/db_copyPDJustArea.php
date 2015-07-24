<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $NewPDRequestID = filter_input(INPUT_POST, 'NewPDRequestID');

    $query = "INSERT INTO [IVCPD].[dbo].[PDJustArea] (PDRequestID, JustArea_1, JustArea_2, JustArea_3, JustArea_4, JustArea_5, JustArea_6, JustArea_7, JustArea_8, JustArea_9) "
                ."SELECT ".$NewPDRequestID.", JustArea_1, JustArea_2, JustArea_3, JustArea_4, JustArea_5, JustArea_6, JustArea_7, JustArea_8, JustArea_9 "
                ."FROM [IVCPD].[dbo].[PDJustArea] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
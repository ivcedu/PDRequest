<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $NewPDRequestID = filter_input(INPUT_POST, 'NewPDRequestID');

    $query = "INSERT INTO [IVCPD].[dbo].[Narrative] (PDRequestID, Narrative) "
                ."SELECT ".$NewPDRequestID.", Narrative "
                ."FROM [IVCPD].[dbo].[Narrative] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $LogMsg = filter_input(INPUT_POST, 'LogMsg');
    
    $query = "INSERT INTO [IVCPD].[dbo].[LogHistory] (PDRequestID, LoginName, LogMsg) "
                ."VALUES ('$PDRequestID', '$LoginName', '$LogMsg')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $Result = $dbConn->lastInsertId();

    echo json_encode($Result);
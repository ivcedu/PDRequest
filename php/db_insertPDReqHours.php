<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqHours] (PDRequestID) VALUES ('$PDRequestID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
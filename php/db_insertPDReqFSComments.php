<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');
    $Comments = filter_input(INPUT_POST, 'Comments');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqFSComments] (PDRequestID, PDReqReimbID, Comments) "
            . "VALUES ('$PDRequestID', '$PDReqReimbID', '$Comments')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
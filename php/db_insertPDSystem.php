<?php
    require("config.php");
    
    $PDSystem = filter_input(INPUT_POST, 'PDSystem');
    $ApplyDate = filter_input(INPUT_POST, 'ApplyDate');
    $PDAmt = filter_input(INPUT_POST, 'PDAmt');

    $query = "INSERT INTO [IVCPD].[dbo].[PDSystem] (PDSystem, ApplyDate, PDAmt) "
                ."VALUES ('$PDSystem', '$ApplyDate', '$PDAmt')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
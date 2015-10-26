<?php
    require("config.php");
    
    $PDSystem = filter_input(INPUT_POST, 'PDSystem');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    $PDAmt = filter_input(INPUT_POST, 'PDAmt');

    $query = "INSERT INTO [IVCPD].[dbo].[PDSystem] (PDSystem, FiscalYrs, PDAmt) "
                ."VALUES ('$PDSystem', '$FiscalYrs', '$PDAmt')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
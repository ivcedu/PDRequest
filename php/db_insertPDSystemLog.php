<?php
    require("config.php");
    
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $Note = filter_input(INPUT_POST, 'Note');

    $query = "INSERT INTO [IVCPD].[dbo].[PDSystemLog] (LoginName, Note) "
                ."VALUES ('$LoginName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
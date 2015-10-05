<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $ReimbAdminID = filter_input(INPUT_POST, 'ReimbAdminID');
    $ReimbStepID = filter_input(INPUT_POST, 'ReimbStepID');
    $ReimbStatusID = filter_input(INPUT_POST, 'ReimbStatusID');
    $ReimbComments = filter_input(INPUT_POST, 'ReimbComments');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqHRProcessLog] (PDRequestID, ReimbAdminID, ReimbStepID, ReimbStatusID, ReimbComments, ReimbDTStamp) "
            . "VALUES ('$PDRequestID', '$ReimbAdminID', '$ReimbStepID', '$ReimbStatusID', '$ReimbComments', getdate())";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
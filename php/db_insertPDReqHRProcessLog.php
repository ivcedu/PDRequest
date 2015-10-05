<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $HrsAdminID = filter_input(INPUT_POST, 'HrsAdminID');
    $HrsStepID = filter_input(INPUT_POST, 'HrsStepID');
    $HrsStatusID = filter_input(INPUT_POST, 'HrsStatusID');
    $HrsComments = filter_input(INPUT_POST, 'HrsComments');
    $ReimbAdminID = filter_input(INPUT_POST, 'ReimbAdminID');
    $ReimbStepID = filter_input(INPUT_POST, 'ReimbStepID');
    $ReimbStatusID = filter_input(INPUT_POST, 'ReimbStatusID');
    $ReimbComments = filter_input(INPUT_POST, 'ReimbComments');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqHRProcessLog] (PDRequestID, HrsAdminID, HrsStepID, HrsStatusID, HrsComments, HrsDTStamp, ReimbAdminID, ReimbStepID, ReimbStatusID, ReimbComments, ReimbDTStamp) "
            . "VALUES ('$PDRequestID', '$HrsAdminID', '$HrsStepID', '$HrsStatusID', '$HrsComments', getdate(), '$ReimbAdminID', '$ReimbStepID', '$ReimbStatusID', '$ReimbComments', getdate())";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
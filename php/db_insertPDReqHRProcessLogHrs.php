<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $HrsAdminID = filter_input(INPUT_POST, 'HrsAdminID');
    $HrsStepID = filter_input(INPUT_POST, 'HrsStepID');
    $HrsStatusID = filter_input(INPUT_POST, 'HrsStatusID');
    $HrsComments = filter_input(INPUT_POST, 'HrsComments');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqHRProcessLog] (PDRequestID, HrsAdminID, HrsStepID, HrsStatusID, HrsComments, HrsDTStamp) "
            . "VALUES ('$PDRequestID', '$HrsAdminID', '$HrsStepID', '$HrsStatusID', '$HrsComments', getdate())";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
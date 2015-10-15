<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $ReimbAdminID = filter_input(INPUT_POST, 'ReimbAdminID');
    $ReimbStepID = filter_input(INPUT_POST, 'ReimbStepID');
    $ReimbStatusID = filter_input(INPUT_POST, 'ReimbStatusID');
    
    $update_query = "";
    if ($ReimbAdminID !== "") {
        $update_query = "ReimbAdminID = '".$ReimbAdminID."', ";
    }

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] "
            . "SET ".$update_query."ReimbStepID = '".$ReimbStepID."', ReimbStatusID = '".$ReimbStatusID."', ReimbDTStamp = getdate() "
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
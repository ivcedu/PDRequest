<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $HrsAdminID = filter_input(INPUT_POST, 'HrsAdminID');
    $HrsStepID = filter_input(INPUT_POST, 'HrsStepID');
    $HrsStatusID = filter_input(INPUT_POST, 'HrsStatusID');
    $ReimbAdminID = filter_input(INPUT_POST, 'ReimbAdminID');
    $ReimbStepID = filter_input(INPUT_POST, 'ReimbStepID');
    $ReimbStatusID = filter_input(INPUT_POST, 'ReimbStatusID');

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] SET "
            . "HrsAdminID = '".$HrsAdminID."', HrsStepID = '".$HrsStepID."', HrsStatusID = '".$HrsStatusID."', HrsDTStamp = getdate(), "
            . "ReimbAdminID = '".$ReimbAdminID."', ReimbStepID = '".$ReimbStepID."', ReimbStatusID = '".$ReimbStatusID."', ReimbDTStamp = getdate() "
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
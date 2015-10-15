<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $HrsAdminID = filter_input(INPUT_POST, 'HrsAdminID');
    $HrsStepID = filter_input(INPUT_POST, 'HrsStepID');
    $HrsStatusID = filter_input(INPUT_POST, 'HrsStatusID');
    
    $update_query = "";
    if ($HrsAdminID !== "") {
        $update_query = "HrsAdminID = '".$HrsAdminID."', ";
    }

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] "
            . "SET ".$update_query."HrsStepID = '".$HrsStepID."', HrsStatusID = '".$HrsStatusID."', HrsDTStamp = getdate() "
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $ReimbPreSubDate = filter_input(INPUT_POST, 'ReimbPreSubDate');
    $ReimbPreAprDate = filter_input(INPUT_POST, 'ReimbPreAprDate');
    $ReimbPrePendingAprDate = filter_input(INPUT_POST, 'ReimbPrePendingAprDate');
    $ReimbPostSubDate = filter_input(INPUT_POST, 'ReimbPostSubDate');
    $ReimbPostAprDate = filter_input(INPUT_POST, 'ReimbPostAprDate');
    $ReimbPostPendingAprDate = filter_input(INPUT_POST, 'ReimbPostPendingAprDate');
    
    $update_query = "";
    if ($ReimbPreSubDate === "true") {
        $update_query .= "ReimbPreSubDate = GETDATE(), ";
    }
    if ($ReimbPreAprDate === "true") {
        $update_query .= "ReimbPreAprDate = GETDATE(), ";
    }
    if ($ReimbPrePendingAprDate === "true") {
        $update_query .= "ReimbPrePendingAprDate = GETDATE(), ";
    }
    if ($ReimbPostSubDate === "true") {
        $update_query .= "ReimbPostSubDate = GETDATE(), ";
    }
    if ($ReimbPostAprDate === "true") {
        $update_query .= "ReimbPostAprDate = GETDATE(), ";
    }
    if ($ReimbPostPendingAprDate === "true") {
        $update_query .= "ReimbPostPendingAprDate = GETDATE(), ";
    }
    $update_query = rtrim($update_query, ", ") . " ";

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] SET "
            . $update_query
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
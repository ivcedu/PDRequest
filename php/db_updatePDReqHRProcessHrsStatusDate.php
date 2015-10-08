<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $HrsPreSubDate = filter_input(INPUT_POST, 'HrsPreSubDate');
    $HrsPreAprDate = filter_input(INPUT_POST, 'HrsPreAprDate');
    $HrsPrePendingAprDate = filter_input(INPUT_POST, 'HrsPrePendingAprDate');
    $HrsPostSubDate = filter_input(INPUT_POST, 'HrsPostSubDate');
    $HrsPostAprDate = filter_input(INPUT_POST, 'HrsPostAprDate');
    $HrsPostPendingAprDate = filter_input(INPUT_POST, 'HrsPostPendingAprDate');
    
    $update_query = "";
    if ($HrsPreSubDate === "true") {
        $update_query .= "HrsPreSubDate = GETDATE(), ";
    }
    if ($HrsPreAprDate === "true") {
        $update_query .= "HrsPreAprDate = GETDATE(), ";
    }
    if ($HrsPrePendingAprDate === "true") {
        $update_query .= "HrsPrePendingAprDate = GETDATE(), ";
    }
    if ($HrsPostSubDate === "true") {
        $update_query .= "HrsPostSubDate = GETDATE(), ";
    }
    if ($HrsPostAprDate === "true") {
        $update_query .= "HrsPostAprDate = GETDATE(), ";
    }
    if ($HrsPostPendingAprDate === "true") {
        $update_query .= "HrsPostPendingAprDate = GETDATE(), ";
    }
    $update_query = rtrim($update_query, ", ") . " ";

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] SET "
            . $update_query
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
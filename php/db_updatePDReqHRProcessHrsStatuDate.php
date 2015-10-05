<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $HrsPreSubDate = filter_input(INPUT_POST, 'HrsPreSubDate');
    $HrsPreAprDate = filter_input(INPUT_POST, 'HrsPreAprDate');
    $HrsPrePendingAprDate = filter_input(INPUT_POST, 'HrsPrePendingAprDate');
    $HrsPostSubDate = filter_input(INPUT_POST, 'HrsPostSubDate');
    $HrsPostAprDate = filter_input(INPUT_POST, 'HrsPostAprDate');
    $HrsPostPendingAprDate = filter_input(INPUT_POST, 'HrsPostPendingAprDate');
    
    $hrs_pre_sub_date = null;
    $hrs_pre_apr_date = null;
    $hrs_pre_pending_apr_date = null;
    $hrs_post_sub_date = null;
    $hrs_post_apr_date = null;
    $hrs_post_pending_apr_date = null;
    
    if ($HrsPreSubDate === "true") {
        $hrs_pre_sub_date = "getdate()";
    }
    if ($HrsPreAprDate === "true") {
        $hrs_pre_apr_date = "getdate()";
    }
    if ($HrsPrePendingAprDate === "true") {
        $hrs_pre_pending_apr_date = "getdate()";
    }
    if ($HrsPostSubDate === "true") {
        $hrs_post_sub_date = "getdate()";
    }
    if ($HrsPostAprDate === "true") {
        $hrs_post_apr_date = "getdate()";
    }
    if ($HrsPostPendingAprDate === "true") {
        $hrs_post_pending_apr_date = "getdate()";
    }

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] SET"
            . "HrsPreSubDate = '".$hrs_pre_sub_date."', HrsPreAprDate = '".$hrs_pre_apr_date."', HrsPrePendingAprDate = '".$hrs_pre_pending_apr_date."', "
            . "HrsPostSubDate = '".$hrs_post_sub_date."', HrsPostAprDate = '".$hrs_post_apr_date."', HrsPostPendingAprDate = '".$hrs_post_pending_apr_date."', "
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
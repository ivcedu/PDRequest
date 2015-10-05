<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $ReimbPreSubDate = filter_input(INPUT_POST, 'ReimbPreSubDate');
    $ReimbPreAprDate = filter_input(INPUT_POST, 'ReimbPreAprDate');
    $ReimbPrePendingAprDate = filter_input(INPUT_POST, 'ReimbPrePendingAprDate');
    $ReimbPostSubDate = filter_input(INPUT_POST, 'ReimbPostSubDate');
    $ReimbPostAprDate = filter_input(INPUT_POST, 'ReimbPostAprDate');
    $ReimbPostPendingAprDate = filter_input(INPUT_POST, 'ReimbPostPendingAprDate');

    $reimb_pre_sub_date = null;
    $reimb_pre_apr_date = null;
    $reimb_pre_pending_apr_date = null;
    $reimb_post_sub_date = null;
    $reimb_post_apr_date = null;
    $reimb_post_pending_apr_date = null;
    
    if ($ReimbPreSubDate === "true") {
        $reimb_pre_sub_date = "getdate()";
    }
    if ($ReimbPreAprDate === "true") {
        $reimb_pre_apr_date = "getdate()";
    }
    if ($ReimbPrePendingAprDate === "true") {
        $reimb_pre_pending_apr_date = "getdate()";
    }
    if ($ReimbPostSubDate === "true") {
        $reimb_post_sub_date = "getdate()";
    }
    if ($ReimbPostAprDate === "true") {
        $reimb_post_apr_date = "getdate()";
    }
    if ($ReimbPostPendingAprDate === "true") {
        $reimb_post_pending_apr_date = "getdate()";
    }

    $query = "UPDATE [IVCPD].[dbo].[PDReqHRProcess] SET"
            . "ReimbPreSubDate = '".$reimb_pre_sub_date."', ReimbPreAprDate = '".$reimb_pre_apr_date."', ReimbPrePendingAprDate = '".$reimb_pre_pending_apr_date."', "
            . "ReimbPostSubDate = '".$reimb_post_sub_date."', ReimbPostAprDate = '".$reimb_post_apr_date."', ReimbPostPendingAprDate = '".$reimb_post_pending_apr_date."' "
            . "WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
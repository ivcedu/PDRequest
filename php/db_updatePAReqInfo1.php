<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PAReqInfo1 = filter_input(INPUT_POST, 'PAReqInfo1');

    $query = "UPDATE [IVCPD].[dbo].[PAReqInfo1] "
                ."SET PAReqInfo1 = '".$PAReqInfo1."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PAReqInfo2 = filter_input(INPUT_POST, 'PAReqInfo2');

    $query = "UPDATE [IVCPD].[dbo].[PAReqInfo2] "
                ."SET PAReqInfo2 = '".$PAReqInfo2."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
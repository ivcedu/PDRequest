<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqStepID = filter_input(INPUT_POST, 'PDReqStepID');

    $query = "UPDATE [IVCPD].[dbo].[PDRequest] SET PDReqStepID = '".$PDReqStepID."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
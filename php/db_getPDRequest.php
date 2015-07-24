<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');

    $query = "SELECT pdrq.*, trdc.ReqNum "
                ."FROM [IVCPD].[dbo].[PDRequest] AS pdrq LEFT JOIN [IVCPD].[dbo].[TracDoc] AS trdc ON pdrq.PDRequestID = trdc.PDRequestID "
                ."WHERE pdrq.PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');

    $query = "SELECT * FROM [IVCPD].[dbo].[PDReqFundSrc] "
            . "WHERE PDRequestID = '".$PDRequestID."' AND PDReqReimbID = '".$PDReqReimbID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
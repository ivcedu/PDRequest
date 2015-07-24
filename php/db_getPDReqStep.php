<?php
    require("config.php");

    $PDReqStepID = filter_input(INPUT_POST, 'PDReqStepID');

    $query = "SELECT * FROM [IVCPD].[dbo].[PDReqStep] WHERE PDReqStepID = '".$PDReqStepID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
<?php
    require("config.php");

    $ActTitle = filter_input(INPUT_POST, 'ActTitle');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');

    $query = "SELECT * FROM [IVCPD].[dbo].[PDRequest] WHERE ActTitle = '".$ActTitle."' AND FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
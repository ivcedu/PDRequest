<?php
    require("config.php");

    $ActTitle = filter_input(INPUT_POST, 'ActTitle');

    $query = "SELECT * FROM [IVCPD].[dbo].[PDRequest] WHERE ActTitle = '".$ActTitle."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
<?php
    require("config.php");

    $ActStateID = filter_input(INPUT_POST, 'ActStateID');

    $query = "SELECT * FROM [IVCPD].[dbo].[ActState] WHERE ActStateID = '".$ActStateID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
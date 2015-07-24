<?php
    require("config.php");

    $ResourceType = filter_input(INPUT_POST, 'ResourceType');

    $query = "SELECT * FROM [IVCPD].[dbo].[ResourceType] WHERE ResourceType = '".$ResourceType."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
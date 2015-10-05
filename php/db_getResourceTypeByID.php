<?php
    require("config.php");

    $ResourceTypeID= filter_input(INPUT_POST, 'ResourceTypeID');

    $query = "SELECT ResourceType FROM [IVCPD].[dbo].[ResourceType] WHERE ResourceTypeID = '".$ResourceTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["ResourceType"]);
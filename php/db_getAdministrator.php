<?php
    require("config.php");

    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');

    $query = "SELECT * FROM [IVCPD].[dbo].[Administrator] WHERE AdminEmail = '".$AdminEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
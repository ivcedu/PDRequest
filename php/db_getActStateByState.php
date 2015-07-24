<?php
    require("config.php");
    
    $State = filter_input(INPUT_POST, 'State');

    $query = "SELECT * FROM [IVCPD].[dbo].[ActState] WHERE State = '".$State."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
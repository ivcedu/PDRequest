<?php
    require("config.php");
    
    $LoginID = filter_input(INPUT_POST, 'LoginID');

    $query = "SELECT * FROM [IVCPD].[dbo].[Login] WHERE LoginID = '".$LoginID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
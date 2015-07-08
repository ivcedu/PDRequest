<?php
    require("config.php");
      
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "SELECT * FROM [IVCPD].[dbo].[Status] WHERE StatusID = '".$StatusID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
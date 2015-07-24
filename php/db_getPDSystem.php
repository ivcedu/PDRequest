<?php
    require("config.php");
      
    $query = "SELECT * FROM [IVCPD].[dbo].[PDSystem]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
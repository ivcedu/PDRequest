<?php
    require("config.php");
      
    $query = "SELECT ApplyDate FROM [IVCPD].[dbo].[PDSystem] GROUP BY ApplyDate ORDER BY ApplyDate DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
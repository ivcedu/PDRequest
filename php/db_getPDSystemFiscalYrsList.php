<?php
    require("config.php");
      
    $query = "SELECT FiscalYrs FROM [IVCPD].[dbo].[PDSystem] GROUP BY FiscalYrs ORDER BY FiscalYrs DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
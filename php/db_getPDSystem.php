<?php
    require("config.php");
    
    $ApplyDate = filter_input(INPUT_POST, 'ApplyDate');
      
    $query = "SELECT TOP 8 * FROM [IVCPD].[dbo].[PDSystem] WHERE ApplyDate <= '".$ApplyDate."' ORDER BY ApplyDate DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
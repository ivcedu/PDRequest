<?php
    require("config.php");
      
    $ApplyDate = filter_input(INPUT_POST, 'ApplyDate');
    
    $query = "SELECT * FROM [IVCPD].[dbo].[PDSystem] WHERE ApplyDate = '".$ApplyDate."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
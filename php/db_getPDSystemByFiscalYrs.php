<?php
    require("config.php");
      
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    
    $query = "SELECT * FROM [IVCPD].[dbo].[PDSystem] WHERE FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
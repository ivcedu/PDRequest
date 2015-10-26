<?php
    require("config.php");
    
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
      
    $query = "SELECT TOP 8 * FROM [IVCPD].[dbo].[PDSystem] WHERE FiscalYrs <= '".$FiscalYrs."' ORDER BY FiscalYrs DESC, PDSystemID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
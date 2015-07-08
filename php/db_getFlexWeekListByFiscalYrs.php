<?php
    require("config.php");
      
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');

    $query = "SELECT * FROM [IVCPD].[dbo].[FlexWeek] WHERE LoginID = '".$LoginID."' AND FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
<?php
    require("config.php");
    
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
        
    $query = "SELECT avfw.*, admn.* "
                ."FROM [IVCPD].[dbo].[AvailFlexWeek] AS avfw LEFT JOIN [IVCPD].[dbo].[Administrator] AS admn ON avfw.AdministratorID = admn.AdministratorID "
                ."WHERE avfw.FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
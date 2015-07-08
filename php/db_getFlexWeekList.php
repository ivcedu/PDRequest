<?php
    require("config.php");
      
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $TermStart = filter_input(INPUT_POST, 'TermStart');
    $TermEnd = filter_input(INPUT_POST, 'TermEnd');

    $query = "SELECT * FROM [IVCPD].[dbo].[FlexWeek] WHERE LoginID = '".$LoginID."' AND "
                ."CONVERT(DATETIME, StartDate) BETWEEN CONVERT(DATETIME, '".$TermStart."') and CONVERT(DATETIME, '".$TermEnd."')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
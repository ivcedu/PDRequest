<?php
    require("config.php");

    $FlexWeekID = filter_input(INPUT_POST, 'FlexWeekID');

    $query = "SELECT * FROM [IVCPD].[dbo].[FWJustArea] WHERE FlexWeekID = '".$FlexWeekID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
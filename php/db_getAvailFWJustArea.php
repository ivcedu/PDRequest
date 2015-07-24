<?php
    require("config.php");

    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');

    $query = "SELECT * FROM [IVCPD].[dbo].[AvailFWJustArea] WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
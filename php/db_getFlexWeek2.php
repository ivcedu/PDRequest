<?php
    require("config.php");

    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');
    $LoginID = filter_input(INPUT_POST, 'LoginID');

    $query = "SELECT * FROM [IVCPD].[dbo].[FlexWeek] WHERE AvailFlexWeekID = '".$AvailFlexWeekID."' AND LoginID = '".$LoginID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
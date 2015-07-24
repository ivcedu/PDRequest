<?php
    require("config.php");

    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');

    $query1 = "DELETE [IVCPD].[dbo].[AvailFWJustArea] WHERE AvailFlexWeekID = '".$AvailFlexWeekID ."'";
    $query2 = "DELETE [IVCPD].[dbo].[AvailFlexWeek] WHERE AvailFlexWeekID = '".$AvailFlexWeekID ."'";

    $cmd = $dbConn->prepare($query1);
    $result = $cmd->execute();     

    $cmd = $dbConn->prepare($query2);
    $result = $cmd->execute();   

    echo json_encode($result);
<?php
    require("config.php");

    $FlexWeekID = filter_input(INPUT_POST, 'FlexWeekID');

    $query1 = "DELETE [IVCPD].[dbo].[FWJustArea] WHERE FlexWeekID = '".$FlexWeekID ."'";
    $query2 = "DELETE [IVCPD].[dbo].[FlexWeekUserInfo] WHERE FlexWeekID = '".$FlexWeekID ."'";
    $query3 = "DELETE [IVCPD].[dbo].[FlexWeek] WHERE FlexWeekID = '".$FlexWeekID ."'";

    $cmd = $dbConn->prepare($query1);
    $result = $cmd->execute();     

    $cmd = $dbConn->prepare($query2);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query3);
    $result = $cmd->execute();   

    echo json_encode($result);
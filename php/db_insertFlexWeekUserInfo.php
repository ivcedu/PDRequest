<?php
    require("config.php");
    
    $FlexWeekID = filter_input(INPUT_POST, 'FlexWeekID');
    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');
    $Name = filter_input(INPUT_POST, 'Name');
    $Email = filter_input(INPUT_POST, 'Email');
    $Depart = filter_input(INPUT_POST, 'Depart');
    $Phone = filter_input(INPUT_POST, 'Phone');
    $Division = filter_input(INPUT_POST, 'Division');

    $query = "INSERT INTO [IVCPD].[dbo].[FlexWeekUserInfo] (FlexWeekID, AvailFlexWeekID, Name, Email, Depart, Phone, Division) "
                ."VALUES ('$FlexWeekID', '$AvailFlexWeekID', '$Name', '$Email', '$Depart', '$Phone', '$Division')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
<?php
    require("config.php");
    
    $ResultID = "";
    $FlexWeekID = $_POST['FlexWeekID'];
    $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
    $Name = $_POST['Name'];
    $Email = $_POST['Email'];
    $Depart = $_POST['Depart'];
    $Phone = $_POST['Phone'];
    $Division = $_POST['Division'];

    $query = "INSERT INTO [IVCPD].[dbo].[FlexWeekUserInfo] (FlexWeekID, AvailFlexWeekID, Name, Email, Depart, Phone, Division) "
                ."VALUES ('$FlexWeekID', '$AvailFlexWeekID', '$Name', '$Email', '$Depart', '$Phone', '$Division')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
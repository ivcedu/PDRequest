<?php
    require("config.php");

    $ResultID = "";
    $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
    $FWJust1 = $_POST['FWJust1'];
    $FWJust2 = $_POST['FWJust2'];
    $FWJust3 = $_POST['FWJust3'];
    $FWJust4 = $_POST['FWJust4'];
    $FWJust5 = $_POST['FWJust5'];
    $FWJust6 = $_POST['FWJust6'];
    $FWJust7 = $_POST['FWJust7'];
    $FWJust8 = $_POST['FWJust8'];
    $FWJust9 = $_POST['FWJust9'];

    $query = "INSERT INTO [IVCPD].[dbo].[AvailFWJustArea] "
                ."(AvailFlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9) "
                ."VALUES ('$AvailFlexWeekID', '$FWJust1', '$FWJust2', '$FWJust3', '$FWJust4', '$FWJust5', '$FWJust6', '$FWJust7', '$FWJust8', '$FWJust9')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
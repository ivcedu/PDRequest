<?php
    require("config.php");
    
    $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
    $FlexWeekID = $_POST['FlexWeekID'];

    $query = "INSERT INTO [IVCPD].[dbo].[FWJustArea] (FlexWeekID, AvailFlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9) "
                ."SELECT ".$FlexWeekID.", ".$AvailFlexWeekID.", FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9 "
                ."FROM [IVCPD].[dbo].[AvailFWJustArea] "
                ."WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
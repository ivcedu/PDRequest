<?php
    require("config.php");

    $FlexWeekID = filter_input(INPUT_POST, 'FlexWeekID');
    $FWJust1 = filter_input(INPUT_POST, 'FWJust1');
    $FWJust2 = filter_input(INPUT_POST, 'FWJust2');
    $FWJust3 = filter_input(INPUT_POST, 'FWJust3');
    $FWJust4 = filter_input(INPUT_POST, 'FWJust4');
    $FWJust5 = filter_input(INPUT_POST, 'FWJust5');
    $FWJust6 = filter_input(INPUT_POST, 'FWJust6');
    $FWJust7 = filter_input(INPUT_POST, 'FWJust7');
    $FWJust8 = filter_input(INPUT_POST, 'FWJust8');
    $FWJust9 = filter_input(INPUT_POST, 'FWJust9');

    $query = "INSERT INTO [IVCPD].[dbo].[FWJustArea] "
                ."(FlexWeekID, FWJust1, FWJust2, FWJust3, FWJust4, FWJust5, FWJust6, FWJust7, FWJust8, FWJust9) "
                ."VALUES ('$FlexWeekID', '$FWJust1', '$FWJust2', '$FWJust3', '$FWJust4', '$FWJust5', '$FWJust6', '$FWJust7', '$FWJust8', '$FWJust9')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
<?php
    require("config.php");

    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');
    $FWJust1 = filter_input(INPUT_POST, 'FWJust1');
    $FWJust2 = filter_input(INPUT_POST, 'FWJust2');
    $FWJust3 = filter_input(INPUT_POST, 'FWJust3');
    $FWJust4 = filter_input(INPUT_POST, 'FWJust4');
    $FWJust5 = filter_input(INPUT_POST, 'FWJust5');
    $FWJust6 = filter_input(INPUT_POST, 'FWJust6');
    $FWJust7 = filter_input(INPUT_POST, 'FWJust7');
    $FWJust8 = filter_input(INPUT_POST, 'FWJust8');
    $FWJust9 = filter_input(INPUT_POST, 'FWJust9');

    $query = "UPDATE [IVCPD].[dbo].[AvailFWJustArea] "
                ."SET FWJust1 = '".$FWJust1."', FWJust2 = '".$FWJust2."', FWJust3 = '".$FWJust3."', FWJust4 = '".$FWJust4."', FWJust5 = '".$FWJust5."', "
                ."FWJust6 = '".$FWJust6."', FWJust7 = '".$FWJust7."', FWJust8 = '".$FWJust8."', FWJust9 = '".$FWJust9."' "
                ."WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
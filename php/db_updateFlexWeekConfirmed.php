<?php
    require("config.php");

    $FlexWeekID = filter_input(INPUT_POST, 'FlexWeekID');
    $FWHours = filter_input(INPUT_POST, 'FWHours');
    $Confirmed = filter_input(INPUT_POST, 'Confirmed');

    $query = "UPDATE [IVCPD].[dbo].[FlexWeek] "
                ."SET FWHours = '".$FWHours."', Confirmed = '".$Confirmed."', Modified = getdate() "
                ."WHERE FlexWeekID = '".$FlexWeekID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
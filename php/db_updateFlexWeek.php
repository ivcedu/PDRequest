<?php
    require("config.php");

    $FlexWeekID = filter_input(INPUT_POST, 'FlexWeekID');
    $FWHours = filter_input(INPUT_POST, 'FWHours');

    $query = "UPDATE [IVCPD].[dbo].[FlexWeek] "
                ."SET FWHours = '".$FWHours."', Modified = getdate() "
                ."WHERE FlexWeekID = '".$FlexWeekID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
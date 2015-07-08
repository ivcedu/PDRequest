<?php
    require("config.php");
    
    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $curDate = filter_input(INPUT_POST, 'curDate');
    $FWHours = filter_input(INPUT_POST, 'FWHours');

    $query = "INSERT INTO [IVCPD].[dbo].[FlexWeek] (AvailFlexWeekID, LoginID, curDate, ActTitle, FiscalYrs, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) "
                ."SELECT ".$AvailFlexWeekID.", ".$LoginID.", '".$curDate."', ActTitle, FiscalYrs, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, ".$FWHours." "
                ."FROM [IVCPD].[dbo].[AvailFlexWeek] "
                ."WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
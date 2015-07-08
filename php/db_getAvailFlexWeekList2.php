<?php
    require("config.php");

    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
        
    $query = "SELECT avfw.AvailFlexWeekID, "
            . "avfw.ActTitle, "
            . "avfw.ActPresenter, "
            . "avfw.Location, "
            . "avfw.StartDate, "
            . "avfw.StartTime, "
            . "avfw.EndDate, "
            . "avfw.EndTime, "
            . "avfw.ActDescrip, "
            . "avfw.FWHours, "
            . "(SELECT FlexWeekID FROM [IVCPD].[dbo].[FlexWeek] WHERE avfw.AvailFlexWeekID = AvailFlexWeekID AND LoginID = '".$LoginID."') AS FlexWeekID, "
            . "(SELECT FWHours FROM [IVCPD].[dbo].[FlexWeek] WHERE avfw.AvailFlexWeekID = AvailFlexWeekID AND LoginID = '".$LoginID."') AS UserFWHrs "
            . "FROM [IVCPD].[dbo].[AvailFlexWeek] AS avfw "
            . "WHERE avfw.FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
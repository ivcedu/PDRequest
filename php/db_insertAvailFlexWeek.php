<?php
    require("config.php");

    $AdministratorID = filter_input(INPUT_POST, 'AdministratorID');
    $ActTitle = filter_input(INPUT_POST, 'ActTitle');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    $ActPresenter = filter_input(INPUT_POST, 'ActPresenter');
    $Location = filter_input(INPUT_POST, 'Location');
    $ActCity = filter_input(INPUT_POST, 'ActCity');
    $ActStateID = filter_input(INPUT_POST, 'ActStateID');
    $ActDescrip = filter_input(INPUT_POST, 'ActDescrip');
    $ActLink = filter_input(INPUT_POST, 'ActLink');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $StartTime = filter_input(INPUT_POST, 'StartTime');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    $EndTime = filter_input(INPUT_POST, 'EndTime');
    $FWHours = filter_input(INPUT_POST, 'FWHours');

    $query = "INSERT INTO [IVCPD].[dbo].[AvailFlexWeek] "
                ."(AdministratorID, ActTitle, FiscalYrs, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) "
                ."VALUES ('$AdministratorID', '$ActTitle', '$FiscalYrs', '$ActPresenter', '$Location', '$ActCity', '$ActStateID', '$ActDescrip', '$ActLink', "
                            ."'$StartDate', '$StartTime', '$EndDate', '$EndTime', '$FWHours')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
<?php
    require("config.php");

    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $curDate = filter_input(INPUT_POST, 'curDate');
    $ActTitle = filter_input(INPUT_POST, 'ActTitle');
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

    $query = "INSERT INTO [IVCPD].[dbo].[FlexWeek] "
                ."(LoginID, curDate, ActTitle, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) "
                ."VALUES ('$LoginID', '$curDate', '$ActTitle', '$ActPresenter', '$Location', '$ActCity', '$ActStateID', '$ActDescrip', '$ActLink', "
                            ."'$StartDate', '$StartTime', '$EndDate', '$EndTime', '$FWHours')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
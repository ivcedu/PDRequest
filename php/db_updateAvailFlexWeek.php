<?php
    require("config.php");

    $AvailFlexWeekID = filter_input(INPUT_POST, 'AvailFlexWeekID');
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

    $query = "UPDATE [IVCPD].[dbo].[AvailFlexWeek] "
                ."SET AdministratorID = '".$AdministratorID."', ActTitle = '".$ActTitle."', FiscalYrs = '".$FiscalYrs."', ActPresenter = '".$ActPresenter."', "
                ."Location = '".$Location."', ActCity = '".$ActCity."', ActStateID = '".$ActStateID."', "
                ."ActDescrip = '".$ActDescrip."', ActLink = '".$ActLink."', StartDate = '".$StartDate."', StartTime = '".$StartTime."', "
                ."EndDate = '".$EndDate."', EndTime = '".$EndTime."', FWHours = '".$FWHours."', Modified = getdate() "
                ."WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
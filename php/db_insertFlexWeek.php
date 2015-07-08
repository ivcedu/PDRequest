<?php
    require("config.php");

    $ResultID = "";
    $LoginID = $_POST['LoginID'];
    $curDate = $_POST['curDate'];
    $ActTitle = $_POST['ActTitle'];
    $ActPresenter = $_POST['ActPresenter'];
    $Location = $_POST['Location'];
    $ActCity = $_POST['ActCity'];
    $ActStateID = $_POST['ActStateID'];
    $ActDescrip = $_POST['ActDescrip'];
    $ActLink = $_POST['ActLink'];
    $StartDate = $_POST['StartDate'];
    $StartTime = $_POST['StartTime'];

    $EndDate = $_POST['EndDate'];
    $EndTime = $_POST['EndTime'];

    $FWHours = $_POST['FWHours'];

    $query = "INSERT INTO [IVCPD].[dbo].[FlexWeek] "
                ."(LoginID, curDate, ActTitle, ActPresenter, Location, ActCity, ActStateID, ActDescrip, ActLink, StartDate, StartTime, EndDate, EndTime, FWHours) "
                ."VALUES ('$LoginID', '$curDate', '$ActTitle', '$ActPresenter', '$Location', '$ActCity', '$ActStateID', '$ActDescrip', '$ActLink', "
                            ."'$StartDate', '$StartTime', '$EndDate', '$EndTime', '$FWHours')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
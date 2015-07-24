<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $Name = filter_input(INPUT_POST, 'Name');
    $Email = filter_input(INPUT_POST, 'Email');
    $Depart = filter_input(INPUT_POST, 'Depart');
    $Phone = filter_input(INPUT_POST, 'Phone');
    $Division = filter_input(INPUT_POST, 'Division');
    $EmployeeType = filter_input(INPUT_POST, 'EmployeeType');

    $query = "UPDATE [IVCPD].[dbo].[PDReqUserInfo] "
                ."SET Name = '".$Name."', Email = '".$Email."', Depart = '".$Depart."', Phone = '".$Phone."', Division = '".$Division."', EmployeeType = '".$EmployeeType."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
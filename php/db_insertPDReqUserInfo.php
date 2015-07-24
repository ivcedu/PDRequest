<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $Name = filter_input(INPUT_POST, 'Name');
    $Email = filter_input(INPUT_POST, 'Email');
    $Depart = filter_input(INPUT_POST, 'Depart');
    $Phone = filter_input(INPUT_POST, 'Phone');
    $Division = filter_input(INPUT_POST, 'Division');
    $EmployeeType = filter_input(INPUT_POST, 'EmployeeType');

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqUserInfo] (PDRequestID, Name, Email, Depart, Phone, Division, EmployeeType) "
                ."VALUES ('$PDRequestID', '$Name', '$Email', '$Depart', '$Phone', '$Division', '$EmployeeType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
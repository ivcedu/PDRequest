<?php
    require("config.php");
    
    $ResultID = "";
    $PDRequestID = $_POST['PDRequestID'];
    $Name = $_POST['Name'];
    $Email = $_POST['Email'];
    $Depart = $_POST['Depart'];
    $Phone = $_POST['Phone'];
    $Division = $_POST['Division'];
    $EmployeeType = $_POST['EmployeeType'];

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqUserInfo] (PDRequestID, Name, Email, Depart, Phone, Division, EmployeeType) "
                ."VALUES ('$PDRequestID', '$Name', '$Email', '$Depart', '$Phone', '$Division', '$EmployeeType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
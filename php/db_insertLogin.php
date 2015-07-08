<?php
    require("config.php");
    
    $ResultID = "";
    $LoginName = $_POST['LoginName'];
    $LoginEmail = $_POST['LoginEmail'];
    $LoginDepart = $_POST['LoginDepart'];
    $LoginPhone = $_POST['LoginPhone'];
    $LoginDiv = $_POST['LoginDiv'];
    $LoginEType = $_POST['LoginEType'];

    $query = "INSERT INTO [IVCPD].[dbo].[Login] (LoginName, LoginEmail, LoginDepart, LoginPhone, LoginDiv, LoginEType) "
                ."VALUES ('$LoginName', '$LoginEmail', '$LoginDepart', '$LoginPhone', '$LoginDiv', '$LoginEType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
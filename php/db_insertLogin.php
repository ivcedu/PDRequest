<?php
    require("config.php");
    
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
    $LoginDepart = filter_input(INPUT_POST, 'LoginDepart');
    $LoginPhone = filter_input(INPUT_POST, 'LoginPhone');
    $LoginDiv = filter_input(INPUT_POST, 'LoginDiv');
    $LoginEType = filter_input(INPUT_POST, 'LoginEType');

    $query = "INSERT INTO [IVCPD].[dbo].[Login] (LoginName, LoginEmail, LoginDepart, LoginPhone, LoginDiv, LoginEType) "
                ."VALUES ('$LoginName', '$LoginEmail', '$LoginDepart', '$LoginPhone', '$LoginDiv', '$LoginEType')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
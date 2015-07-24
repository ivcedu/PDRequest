<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PreAppHr = filter_input(INPUT_POST, 'PreAppHr');
    $PreNotAppHr = filter_input(INPUT_POST, 'PreNotAppHr');

    $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                ."SET PreAppHr = '".$PreAppHr."', PreNotAppHr = '".$PreNotAppHr."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
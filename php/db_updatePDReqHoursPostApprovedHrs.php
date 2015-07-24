<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PostAppHr = filter_input(INPUT_POST, 'PostAppHr');
    $PostNotAppHr = filter_input(INPUT_POST, 'PostNotAppHr');

    $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                ."SET PostAppHr = '".$PostAppHr."', PostNotAppHr = '".$PostNotAppHr."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
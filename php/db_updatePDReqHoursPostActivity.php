<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PostInputHr = filter_input(INPUT_POST, 'PostInputHr');
    $PostPresHr= filter_input(INPUT_POST, 'PostPresHr');
    $PostPartHr = filter_input(INPUT_POST, 'PostPartHr');
    $PostTotalHr = filter_input(INPUT_POST, 'PostTotalHr');

    $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                ."SET PostInputHr = '".$PostInputHr."', PostPresHr = '".$PostPresHr."', PostPartHr = '".$PostPartHr."', PostTotalHr = '".$PostTotalHr."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
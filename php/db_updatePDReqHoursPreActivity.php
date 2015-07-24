<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PreInputHr = filter_input(INPUT_POST, 'PreInputHr');
    $PrePresHr = filter_input(INPUT_POST, 'PrePresHr');
    $PrePartHr = filter_input(INPUT_POST, 'PrePartHr');
    $PreTotalHr = filter_input(INPUT_POST, 'PreTotalHr');

    $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                ."SET PreInputHr = '".$PreInputHr."', PrePresHr = '".$PrePresHr."', PrePartHr = '".$PrePartHr."', PreTotalHr = '".$PreTotalHr."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
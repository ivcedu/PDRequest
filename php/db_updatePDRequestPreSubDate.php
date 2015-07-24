<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');

    $query = "UPDATE [IVCPD].[dbo].[PDRequest] "
                ."SET PreSubDate = getdate() "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
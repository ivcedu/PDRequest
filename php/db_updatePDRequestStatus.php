<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "UPDATE [IVCPD].[dbo].[PDRequest] SET StatusID = '".$StatusID."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
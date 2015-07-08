<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');

    $query = "DELETE [IVCPD].[dbo].[TracDoc] WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();  

    echo json_encode($result);
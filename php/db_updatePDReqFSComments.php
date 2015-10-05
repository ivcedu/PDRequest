<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');
    $Comments = filter_input(INPUT_POST, 'Comments');

    $query = "UPDATE [IVCPD].[dbo].[PDReqFSComments] "
                ."SET Comments = '".$Comments."' "
                . "WHERE PDRequestID = '".$PDRequestID."' AND PDReqReimbID = '".$PDReqReimbID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
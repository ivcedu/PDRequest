<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $Comments = filter_input(INPUT_POST, 'Comments');
    $ckbCom = filter_input(INPUT_POST, 'ckbCom');

    $query = "UPDATE [IVCPD].[dbo].[PDRequest] "
                ."SET Comments = '".$Comments."', ckbCom = '".$ckbCom."', Modified = getdate() "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
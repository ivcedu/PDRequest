<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $Narrative = filter_input(INPUT_POST, 'Narrative');

    $query = "UPDATE [IVCPD].[dbo].[Narrative] "
                ."SET Narrative = '".$Narrative."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
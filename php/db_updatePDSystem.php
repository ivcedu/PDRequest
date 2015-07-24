<?php
    require("config.php");

    $PDSystemID = filter_input(INPUT_POST, 'PDSystemID');
    $PDAmt = filter_input(INPUT_POST, 'PDAmt');

    $query = "UPDATE [IVCPD].[dbo].[PDSystem] "
                ."SET PDAmt = '".$PDAmt."' "
                ."WHERE PDSystemID = '".$PDSystemID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
<?php
    require("config.php");

    $PDSystem = filter_input(INPUT_POST, 'PDSystem');
    $ApplyDateList = filter_input(INPUT_POST, 'ApplyDateList');
    $ApplyDate = filter_input(INPUT_POST, 'ApplyDate');
    $PDAmt = filter_input(INPUT_POST, 'PDAmt');

    $query = "UPDATE [IVCPD].[dbo].[PDSystem] "
                ."SET PDAmt = '".$PDAmt."', ApplyDate = '".$ApplyDate."' "
                ."WHERE PDSystem = '".$PDSystem."' AND ApplyDate = '".$ApplyDateList."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $JustArea_1 = filter_input(INPUT_POST, 'JustArea_1');
    $JustArea_2 = filter_input(INPUT_POST, 'JustArea_2');
    $JustArea_3 = filter_input(INPUT_POST, 'JustArea_3');
    $JustArea_4 = filter_input(INPUT_POST, 'JustArea_4');
    $JustArea_5 = filter_input(INPUT_POST, 'JustArea_5');
    $JustArea_6 = filter_input(INPUT_POST, 'JustArea_6');
    $JustArea_7 = filter_input(INPUT_POST, 'JustArea_7');
    $JustArea_8 = filter_input(INPUT_POST, 'JustArea_8');
    $JustArea_9 = filter_input(INPUT_POST, 'JustArea_9');

    $query = "UPDATE [IVCPD].[dbo].[PDJustArea] "
                ."SET JustArea_1 = '".$JustArea_1."', JustArea_2 = '".$JustArea_2."', JustArea_3 = '".$JustArea_3."', JustArea_4 = '".$JustArea_4."', JustArea_5 = '".$JustArea_5."', "
                ."JustArea_6 = '".$JustArea_6."', JustArea_7 = '".$JustArea_7."', JustArea_8 = '".$JustArea_8."', JustArea_9 = '".$JustArea_9."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
<?php
    require("config.php");
    
    $TracDocID = filter_input(INPUT_POST, 'TracDocID');
    $ReqNum = filter_input(INPUT_POST, 'ReqNum');
    $DistPaid = filter_input(INPUT_POST, 'DistPaid');
    $Comments = filter_input(INPUT_POST, 'Comments');

    $query = "UPDATE [IVCPD].[dbo].[TracDoc] "
                ."SET ReqNum = '".$ReqNum."', DistPaid = '".$DistPaid."', Comments = '".$Comments."', Modified = getdate() "
                ."WHERE TracDocID = '".$TracDocID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
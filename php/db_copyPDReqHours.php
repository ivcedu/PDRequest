<?php
    require("config.php");
    
    $ResultID = "";
    $PDRequestID = $_POST['PDRequestID'];
    $NewPDRequestID = $_POST['NewPDRequestID'];

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqHours] (PDRequestID, PreInputHr, PrePresHr, PrePartHr, PreTotalHr) "
                ."SELECT ".$NewPDRequestID.", PreInputHr, PrePresHr, PrePartHr, PreTotalHr "
                ."FROM [IVCPD].[dbo].[PDReqHours] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
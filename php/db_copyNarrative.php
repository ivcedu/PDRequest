<?php
    require("config.php");
    
    $ResultID = "";
    $PDRequestID = $_POST['PDRequestID'];
    $NewPDRequestID = $_POST['NewPDRequestID'];

    $query = "INSERT INTO [IVCPD].[dbo].[Narrative] (PDRequestID, Narrative) "
                ."SELECT ".$NewPDRequestID.", Narrative "
                ."FROM [IVCPD].[dbo].[Narrative] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
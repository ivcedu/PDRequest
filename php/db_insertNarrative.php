<?php
    require("config.php");
    
    $ResultID = "";
    $PDRequestID = $_POST['PDRequestID'];

    $query = "INSERT INTO [IVCPD].[dbo].[Narrative] (PDRequestID) VALUES ('$PDRequestID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
<?php
    require("config.php");
    
    $ResultID = "";
    $PDRequestID = $_POST['PDRequestID'];
    $LoginName = $_POST['LoginName'];
    $Note = $_POST['Note'];

    $query = "INSERT INTO [IVCPD].[dbo].[Transaction] (PDRequestID, LoginName, Note) VALUES ('$PDRequestID', '$LoginName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
<?php
    require("config.php");

    $TracDocID = $_POST['TracDocID'];

    $query = "SELECT * FROM [IVCPD].[dbo].[TracDoc] WHERE TracDocID = '".$TracDocID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
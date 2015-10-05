<?php
    require("config.php");
    
    $query = "SELECT * FROM [IVCPD].[dbo].[FundSrcType]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
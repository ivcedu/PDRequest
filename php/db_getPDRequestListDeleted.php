<?php
    require("config.php");

    $query = "SELECT pdrt.*, lgin.LoginName "
                ."FROM [IVCPD].[dbo].[PDRequest] AS pdrt LEFT JOIN [IVCPD].[dbo].[Login] AS lgin ON pdrt.LoginID = lgin.LoginID "
                ."WHERE pdrt.StatusID = 8";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
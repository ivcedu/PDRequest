<?php
    require("config.php");

    $query = "SELECT pdrt.FiscalYrs "
            . "FROM [IVCPD].[dbo].[AvailPDRequest] AS apdr LEFT JOIN [IVCPD].[dbo].[PDRequest] AS pdrt ON apdr.PDRequestID = pdrt.PDRequestID "
            . "WHERE pdrt.FiscalYrs IS NOT NULL "
            . "GROUP BY pdrt.FiscalYrs "
            . "ORDER BY pdrt.FiscalYrs DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
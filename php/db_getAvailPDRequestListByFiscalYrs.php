<?php
    require("config.php");
    
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');

    $query = "SELECT DISTINCT pdrt.PDRequestID, "
            . "pdrt.ActTitle, "
            . "pdrt.ActOrganizer, "
            . "pdrt.ActCity, "
            . "stat.[State], "
            . "pdrt.StartDate, "
            . "pdrt.EndDate, "
            . "pdrt.ResourceTypeID "
            . "FROM [IVCPD].[dbo].[AvailPDRequest] AS apdr LEFT JOIN [IVCPD].[dbo].[PDRequest] AS pdrt ON apdr.PDRequestID = pdrt.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[ActState] AS stat ON pdrt.ActStateID = stat.ActStateID "
            . "WHERE pdrt.FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
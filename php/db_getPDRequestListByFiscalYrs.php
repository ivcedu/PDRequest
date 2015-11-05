<?php
    require("config.php");
      
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');

    $query = "SELECT pdrt.PDRequestID, pdrt.ResourceTypeID, rstp.ResourceType, pdrt.ActTitle, pdrt.StartDate, "
            . "(SELECT PDReqStep FROM [IVCPD].[dbo].[PDReqStep] WHERE PDReqStepID = pdpr.HrsStepID) AS  HrsStep, "
            . "(SELECT [Status] FROM [IVCPD].[dbo].[Status] WHERE StatusID = pdpr.HrsStatusID) AS  HrsStatus, "
            . "(SELECT PDReqStep FROM [IVCPD].[dbo].[PDReqStep] WHERE PDReqStepID = pdpr.ReimbStepID) AS  ReimbStep, "
            . "(SELECT [Status] FROM [IVCPD].[dbo].[Status] WHERE StatusID = pdpr.ReimbStatusID) AS  ReimbStatus "
            . "FROM [IVCPD].[dbo].[PDRequest] AS pdrt LEFT JOIN [IVCPD].[dbo].[PDReqHRProcess] AS pdpr ON pdrt.PDRequestID = pdpr.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[ResourceType] AS rstp ON pdrt.ResourceTypeID = rstp.ResourceTypeID "
            . "WHERE pdrt.LoginID = '".$LoginID."' AND pdrt.FiscalYrs = '".$FiscalYrs."' AND StatusID <> 8";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
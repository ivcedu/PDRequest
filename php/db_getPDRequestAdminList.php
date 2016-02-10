<?php
    require("config.php");

    $query = "SELECT pdrt.PDRequestID, pdrt.ResourceTypeID, rstp.ResourceType, pdrt.ActTitle, pdrt.CreateDate, pduf.Name, "
            . "(SELECT PDReqStep FROM [IVCPD].[dbo].[PDReqStep] WHERE PDReqStepID = pdpr.HrsStepID) AS  HrsStep, "
            . "(SELECT [Status] FROM [IVCPD].[dbo].[Status] WHERE StatusID = pdpr.HrsStatusID) AS  HrsStatus, "
            . "(SELECT PDReqStep FROM [IVCPD].[dbo].[PDReqStep] WHERE PDReqStepID = pdpr.ReimbStepID) AS  ReimbStep, "
            . "(SELECT [Status] FROM [IVCPD].[dbo].[Status] WHERE StatusID = pdpr.ReimbStatusID) AS  ReimbStatus "
            . "FROM [IVCPD].[dbo].[PDRequest] AS pdrt LEFT JOIN [IVCPD].[dbo].[PDReqHRProcess] AS pdpr ON pdrt.PDRequestID = pdpr.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[ResourceType] AS rstp ON pdrt.ResourceTypeID = rstp.ResourceTypeID "
            . "LEFT JOIN [IVCPD].[dbo].[PDReqUserInfo] AS pduf ON pdrt.PDRequestID = pduf.PDRequestID "
            . "WHERE pdpr.HrsStatusID = 2 OR pdpr.ReimbStatusID = 2 OR pdpr.ReimbStatusID = 7 "
            . "ORDER BY pdrt.PDRequestID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
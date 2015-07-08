<?php
    require("config.php");

    $query = "SELECT pdrt.*, pduf.Name, rstp.ResourceType, pdrs.PDReqStep, stus.[Status] "
                ."FROM [IVCPD].[dbo].[PDRequest] AS pdrt LEFT JOIN [IVCPD].[dbo].[PDReqUserInfo] AS pduf ON pdrt.PDRequestID = pduf.PDRequestID "
                ."LEFT JOIN [IVCPD].[dbo].[ResourceType] AS rstp ON pdrt.ResourceTypeID = rstp.ResourceTypeID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqStep] AS pdrs ON pdrt.PDReqStepID = pdrs.PDReqStepID "
                ."LEFT JOIN [IVCPD].[dbo].[Status] AS stus ON pdrt.StatusID = stus.StatusID "
                ."WHERE stus.StatusID = 2 OR stus.StatusID = 7";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
?>
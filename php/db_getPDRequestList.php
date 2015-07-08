<?php
    require("config.php");
      
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $TermStart = filter_input(INPUT_POST, 'TermStart');
    $TermEnd = filter_input(INPUT_POST, 'TermEnd');

    $query = "SELECT pdrt.*, rstp.ResourceType, pdrs.PDReqStep, stus.[Status] "
                ."FROM [IVCPD].[dbo].[PDRequest] AS pdrt LEFT JOIN [IVCPD].[dbo].[ResourceType] AS rstp ON pdrt.ResourceTypeID = rstp.ResourceTypeID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqStep] AS pdrs ON pdrt.PDReqStepID = pdrs.PDReqStepID "
                ."LEFT JOIN [IVCPD].[dbo].[Status] AS stus ON pdrt.StatusID = stus.StatusID "
                ."WHERE LoginID = '".$LoginID."' AND CONVERT(DATETIME, pdrt.StartDate) BETWEEN CONVERT(DATETIME, '".$TermStart."') and CONVERT(DATETIME, '".$TermEnd."')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
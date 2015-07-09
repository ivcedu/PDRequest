<?php
    require("config.php");
      
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');

    $query = "SELECT pdrt.*, rstp.ResourceType, pdrs.PDReqStep, stus.[Status] "
                ."FROM [IVCPD].[dbo].[PDRequest] AS pdrt LEFT JOIN [IVCPD].[dbo].[ResourceType] AS rstp ON pdrt.ResourceTypeID = rstp.ResourceTypeID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqStep] AS pdrs ON pdrt.PDReqStepID = pdrs.PDReqStepID "
                ."LEFT JOIN [IVCPD].[dbo].[Status] AS stus ON pdrt.StatusID = stus.StatusID "
                ."WHERE pdrt.LoginID = '".$LoginID."' AND pdrt.FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
<?php
    require("config.php");
    
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PDReqReimbID = filter_input(INPUT_POST, 'PDReqReimbID');

    $query = "SELECT pdfs.FSSelected, fsrt.FundSrcType "
            . "FROM [IVCPD].[dbo].[PDReqFundSrc] AS pdfs LEFT JOIN [IVCPD].[dbo].[FundSrcType] AS fsrt ON pdfs.FundSrcTypeID = fsrt.FundSrcTypeID "
            . "WHERE PDRequestID = '".$PDRequestID."' AND PDReqReimbID = '".$PDReqReimbID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
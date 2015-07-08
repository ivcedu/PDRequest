<?php
    require("config.php");
      
    $LoginID = filter_input(INPUT_POST, 'LoginID');

    $query = "SELECT pdrb.PDRequestID, pdrq.StatusID, pdrq.PDReqStepID, pdrb.PreTotalAmtApproved, pdrb.PostTotalAmtApproved, trdc.DistPaid "
                ."FROM [IVCPD].[dbo].[PDReqReimb] AS pdrb LEFT JOIN [IVCPD].[dbo].[PDRequest] AS pdrq ON pdrb.PDRequestID = pdrq.PDRequestID "
                ."LEFT JOIN [IVCPD].[dbo].[TracDoc] AS trdc ON pdrb.PDRequestID = trdc.PDRequestID "
                ."WHERE pdrq.LoginID = '".$LoginID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
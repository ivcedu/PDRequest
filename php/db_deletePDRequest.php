<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');

    $query1 = "DELETE [IVCPD].[dbo].[Narrative] WHERE PDRequestID = '".$PDRequestID ."'";
    $query2 = "DELETE [IVCPD].[dbo].[PDJustArea] WHERE PDRequestID = '".$PDRequestID ."'";
    $query3 = "DELETE [IVCPD].[dbo].[PDReqHours] WHERE PDRequestID = '".$PDRequestID ."'";
    $query4 = "DELETE [IVCPD].[dbo].[PDReqReimb] WHERE PDRequestID = '".$PDRequestID ."'";
    $query5 = "DELETE [IVCPD].[dbo].[PDReqUserInfo] WHERE PDRequestID = '".$PDRequestID ."'";
    $query6 = "DELETE [IVCPD].[dbo].[Transaction] WHERE PDRequestID = '".$PDRequestID ."'";
    $query7 = "DELETE [IVCPD].[dbo].[PDRequest] WHERE PDRequestID = '".$PDRequestID ."'";
    $query8 = "DELETE [IVCPD].[dbo].[PAReqInfo1] WHERE PDRequestID = '".$PDRequestID ."'";
    $query9 = "DELETE [IVCPD].[dbo].[PAReqInfo2] WHERE PDRequestID = '".$PDRequestID ."'";
    $query10 = "DELETE [IVCPD].[dbo].[TracDoc] WHERE PDRequestID = '".$PDRequestID ."'";
    $query11 = "DELETE [IVCPD].[dbo].[AvailPDRequest] WHERE PDRequestID = '".$PDRequestID ."'";
    $query12 = "DELETE [IVCPD].[dbo].[LogHistory] WHERE PDRequestID = '".$PDRequestID ."'";

    $cmd = $dbConn->prepare($query1);
    $result = $cmd->execute();     

    $cmd = $dbConn->prepare($query2);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query3);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query4);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query5);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query6);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query7);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query8);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query9);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query10);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query11);
    $result = $cmd->execute(); 

    $cmd = $dbConn->prepare($query12);
    $result = $cmd->execute(); 

    echo json_encode($result);
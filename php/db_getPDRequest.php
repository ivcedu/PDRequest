<?php
    require("config.php");
      
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        
        $query = "SELECT pdrq.*, trdc.ReqNum "
                    ."FROM [IVCPD].[dbo].[PDRequest] AS pdrq LEFT JOIN [IVCPD].[dbo].[TracDoc] AS trdc ON pdrq.PDRequestID = trdc.PDRequestID "
                    ."WHERE pdrq.PDRequestID = '".$PDRequestID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
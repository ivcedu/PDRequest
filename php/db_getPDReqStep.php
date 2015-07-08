<?php
    require("config.php");
      
    if (isset($_POST['PDReqStepID']))
    {
        $PDReqStepID = $_POST['PDReqStepID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[PDReqStep] WHERE PDReqStepID = '".$PDReqStepID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
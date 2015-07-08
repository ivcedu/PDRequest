<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PDReqStepID = $_POST['PDReqStepID'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDRequest] SET PDReqStepID = '".$PDReqStepID."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
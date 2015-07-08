<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PreAppHr = $_POST['PreAppHr'];
        $PreNotAppHr = $_POST['PreNotAppHr'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                    ."SET PreAppHr = '".$PreAppHr."', PreNotAppHr = '".$PreNotAppHr."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
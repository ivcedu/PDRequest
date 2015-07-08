<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PostAppHr = $_POST['PostAppHr'];
        $PostNotAppHr = $_POST['PostNotAppHr'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                    ."SET PostAppHr = '".$PostAppHr."', PostNotAppHr = '".$PostNotAppHr."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
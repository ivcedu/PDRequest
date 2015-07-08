<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PreInputHr = $_POST['PreInputHr'];
        $PrePresHr = $_POST['PrePresHr'];
        $PrePartHr = $_POST['PrePartHr'];
        $PreTotalHr = $_POST['PreTotalHr'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                    ."SET PreInputHr = '".$PreInputHr."', PrePresHr = '".$PrePresHr."', PrePartHr = '".$PrePartHr."', PreTotalHr = '".$PreTotalHr."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
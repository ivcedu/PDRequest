<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PostInputHr = $_POST['PostInputHr'];
        $PostPresHr= $_POST['PostPresHr'];
        $PostPartHr = $_POST['PostPartHr'];
        $PostTotalHr = $_POST['PostTotalHr'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqHours] "
                    ."SET PostInputHr = '".$PostInputHr."', PostPresHr = '".$PostPresHr."', PostPartHr = '".$PostPartHr."', PostTotalHr = '".$PostTotalHr."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
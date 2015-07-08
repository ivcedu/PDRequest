<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PAReqInfo2 = $_POST['PAReqInfo2'];
        
        $query = "UPDATE [IVCPD].[dbo].[PAReqInfo2] "
                    ."SET PAReqInfo2 = '".$PAReqInfo2."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
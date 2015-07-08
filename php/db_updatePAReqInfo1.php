<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PAReqInfo1 = $_POST['PAReqInfo1'];
        
        $query = "UPDATE [IVCPD].[dbo].[PAReqInfo1] "
                    ."SET PAReqInfo1 = '".$PAReqInfo1."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
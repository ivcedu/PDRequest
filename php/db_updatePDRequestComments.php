<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $Comments = $_POST['Comments'];
        $ckbCom = $_POST['ckbCom'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDRequest] "
                    ."SET Comments = '".$Comments."', ckbCom = '".$ckbCom."', Modified = getdate() "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
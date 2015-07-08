<?php
    require("config.php");
    
    if (isset($_POST['PDSystemID']))
    {
        $PDSystemID = $_POST['PDSystemID'];
        $PDAmt = $_POST['PDAmt'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDSystem] "
                    ."SET PDAmt = '".$PDAmt."' "
                    ."WHERE PDSystemID = '".$PDSystemID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
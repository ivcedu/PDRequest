<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $Narrative = $_POST['Narrative'];
        
        $query = "UPDATE [IVCPD].[dbo].[Narrative] "
                    ."SET Narrative = '".$Narrative."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
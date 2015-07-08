<?php
    require("config.php");
      
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[PAReqInfo2] WHERE PDRequestID = '".$PDRequestID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
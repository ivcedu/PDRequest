<?php
    require("config.php");
      
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[Transaction] WHERE PDRequestID = '".$PDRequestID."' ORDER BY TransactionID DESC";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
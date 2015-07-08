<?php
    require("config.php");
      
    if (isset($_POST['State']))
    {
        $State = $_POST['State'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[ActState] WHERE State = '".$State."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
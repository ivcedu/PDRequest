<?php
    require("config.php");
      
    if (isset($_POST['ActStateID']))
    {
        $ActStateID = $_POST['ActStateID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[ActState] WHERE ActStateID = '".$ActStateID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
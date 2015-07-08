<?php
    require("config.php");
      
    if (isset($_POST['ActTitle']))
    {
        $ActTitle = $_POST['ActTitle'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[PDRequest] WHERE ActTitle = '".$ActTitle."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
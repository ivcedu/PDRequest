<?php
    require("config.php");
      
    if (isset($_POST['ResourceType']))
    {
        $ResourceType = $_POST['ResourceType'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[ResourceType] WHERE ResourceType = '".$ResourceType."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
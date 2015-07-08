<?php
    require("config.php");
    
    if (isset($_POST['AdminEmail']))
    {
        $AdminEmail = $_POST['AdminEmail'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[Administrator] WHERE AdminEmail = '".$AdminEmail."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
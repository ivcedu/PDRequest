<?php
    require("config.php");
    
    if (isset($_POST['LoginEmail']))
    {
        $LoginEmail = $_POST['LoginEmail'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[Login] WHERE LoginEmail = '".$LoginEmail."'";
        
        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
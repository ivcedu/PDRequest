<?php
    require("config.php");
      
    if (isset($_POST['LoginID']))
    {
        $LoginID = $_POST['LoginID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[FlexWeek] WHERE LoginID = '".$LoginID."' ORDER BY StartDate DESC";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
<?php
    require("config.php");
      
    if (isset($_POST['FlexWeekID']))
    {
        $FlexWeekID = $_POST['FlexWeekID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[FWJustArea] WHERE FlexWeekID = '".$FlexWeekID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
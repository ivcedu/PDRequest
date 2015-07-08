<?php
    require("config.php");
      
    if (isset($_POST['AvailFlexWeekID']))
    {
        $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[AvailFlexWeek] WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
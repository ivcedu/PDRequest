<?php
    require("config.php");
      
    if (isset($_POST['AvailFlexWeekID']))
    {
        $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
        
        $query = "SELECT * FROM [IVCPD].[dbo].[FlexWeek] AS fxwk LEFT JOIN [IVCPD].[dbo].[FlexWeekUserInfo] AS fwui ON fxwk.FlexWeekID = fwui.FlexWeekID "
                    ."WHERE fxwk.AvailFlexWeekID = '".$AvailFlexWeekID."'";

        $cmd = $dbConn->prepare($query);
        $cmd->execute(); 
        $data = $cmd->fetchAll();

        echo json_encode($data);
    }
?>
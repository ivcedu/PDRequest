<?php
    require("config.php");
    
    if (isset($_POST['FlexWeekID']))
    {
        $FlexWeekID = $_POST['FlexWeekID'];
        $FWHours = $_POST['FWHours'];
        
        $query = "UPDATE [IVCPD].[dbo].[FlexWeek] "
                    ."SET FWHours = '".$FWHours."', Modified = getdate() "
                    ."WHERE FlexWeekID = '".$FlexWeekID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
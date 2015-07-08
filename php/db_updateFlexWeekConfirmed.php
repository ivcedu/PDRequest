<?php
    require("config.php");
    
    if (isset($_POST['FlexWeekID']))
    {
        $FlexWeekID = $_POST['FlexWeekID'];
        $FWHours = $_POST['FWHours'];
        $Confirmed = $_POST['Confirmed'];
        
        $query = "UPDATE [IVCPD].[dbo].[FlexWeek] "
                    ."SET FWHours = '".$FWHours."', Confirmed = '".$Confirmed."', Modified = getdate() "
                    ."WHERE FlexWeekID = '".$FlexWeekID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
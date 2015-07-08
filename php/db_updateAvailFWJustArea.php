<?php
    require("config.php");
    
    if (isset($_POST['AvailFlexWeekID']))
    {
        $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
        $FWJust1 = $_POST['FWJust1'];
        $FWJust2 = $_POST['FWJust2'];
        $FWJust3 = $_POST['FWJust3'];
        $FWJust4 = $_POST['FWJust4'];
        $FWJust5 = $_POST['FWJust5'];
        $FWJust6 = $_POST['FWJust6'];
        $FWJust7 = $_POST['FWJust7'];
        $FWJust8 = $_POST['FWJust8'];
        $FWJust9 = $_POST['FWJust9'];
        
        $query = "UPDATE [IVCPD].[dbo].[AvailFWJustArea] "
                    ."SET FWJust1 = '".$FWJust1."', FWJust2 = '".$FWJust2."', FWJust3 = '".$FWJust3."', FWJust4 = '".$FWJust4."', FWJust5 = '".$FWJust5."', "
                    ."FWJust6 = '".$FWJust6."', FWJust7 = '".$FWJust7."', FWJust8 = '".$FWJust8."', FWJust9 = '".$FWJust9."' "
                    ."WHERE AvailFlexWeekID = '".$AvailFlexWeekID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
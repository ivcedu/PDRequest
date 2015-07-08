<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $JustArea_1 = $_POST['JustArea_1'];
        $JustArea_2 = $_POST['JustArea_2'];
        $JustArea_3 = $_POST['JustArea_3'];
        $JustArea_4 = $_POST['JustArea_4'];
        $JustArea_5 = $_POST['JustArea_5'];
        $JustArea_6 = $_POST['JustArea_6'];
        $JustArea_7 = $_POST['JustArea_7'];
        $JustArea_8 = $_POST['JustArea_8'];
        $JustArea_9 = $_POST['JustArea_9'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDJustArea] "
                    ."SET JustArea_1 = '".$JustArea_1."', JustArea_2 = '".$JustArea_2."', JustArea_3 = '".$JustArea_3."', JustArea_4 = '".$JustArea_4."', JustArea_5 = '".$JustArea_5."', "
                    ."JustArea_6 = '".$JustArea_6."', JustArea_7 = '".$JustArea_7."', JustArea_8 = '".$JustArea_8."', JustArea_9 = '".$JustArea_9."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
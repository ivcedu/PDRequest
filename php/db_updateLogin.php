<?php
    require("config.php");
    
    if (isset($_POST['LoginID']))
    {
        $LoginID = $_POST['LoginID'];
        $LoginName = $_POST['LoginName'];
        $LoginEmail = $_POST['LoginEmail'];
        $LoginDepart = $_POST['LoginDepart'];
        $LoginPhone = $_POST['LoginPhone'];
        $LoginDiv = $_POST['LoginDiv'];
        $LoginEType = $_POST['LoginEType'];
        
        $query = "UPDATE [IVCPD].[dbo].[Login] "
                    ."SET LoginName = '".$LoginName."', LoginEmail = '".$LoginEmail."', LoginDepart = '".$LoginDepart."', "
                    ."LoginPhone = '".$LoginPhone."', LoginDiv = '".$LoginDiv."', LoginEType = '".$LoginEType."' "
                    ."WHERE LoginID = '".$LoginID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
<?php
    require("config.php");

        $LoginID = filter_input(INPUT_POST, 'LoginID');
        $LoginName = filter_input(INPUT_POST, 'LoginName');
        $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
        $LoginDepart = filter_input(INPUT_POST, 'LoginDepart');
        $LoginPhone = filter_input(INPUT_POST, 'LoginPhone');
        $LoginDiv = filter_input(INPUT_POST, 'LoginDiv');
        $LoginEType = filter_input(INPUT_POST, 'LoginEType');
        
        $query = "UPDATE [IVCPD].[dbo].[Login] "
                    ."SET LoginName = '".$LoginName."', LoginEmail = '".$LoginEmail."', LoginDepart = '".$LoginDepart."', "
                    ."LoginPhone = '".$LoginPhone."', LoginDiv = '".$LoginDiv."', LoginEType = '".$LoginEType."' "
                    ."WHERE LoginID = '".$LoginID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
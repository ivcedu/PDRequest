<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $Name = $_POST['Name'];
        $Email = $_POST['Email'];
        $Depart = $_POST['Depart'];
        $Phone = $_POST['Phone'];
        $Division = $_POST['Division'];
        $EmployeeType = $_POST['EmployeeType'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqUserInfo] "
                    ."SET Name = '".$Name."', Email = '".$Email."', Depart = '".$Depart."', Phone = '".$Phone."', Division = '".$Division."', EmployeeType = '".$EmployeeType."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
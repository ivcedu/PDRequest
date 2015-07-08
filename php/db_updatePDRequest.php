<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $LoginID = $_POST['LoginID'];
        $ResourceTypeID = $_POST['ResourceTypeID'];
        $ActTitle = $_POST['ActTitle'];
        $ActOrganizer = $_POST['ActOrganizer'];
        $ActCity = $_POST['ActCity'];
        $ActStateID = $_POST['ActStateID'];
        $ActDescrip = $_POST['ActDescrip'];
        $ActLink = $_POST['ActLink'];
        $StartDate = $_POST['StartDate'];
        $EndDate = $_POST['EndDate'];
        $CreateDate = $_POST['CreateDate'];
        $Comments = $_POST['Comments'];
        $ckbCom = $_POST['ckbCom'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDRequest] "
                    ."SET LoginID = '".$LoginID."', ResourceTypeID = '".$ResourceTypeID."', ActTitle = '".$ActTitle."', ActOrganizer = '".$ActOrganizer."', ActCity = '".$ActCity."', ActStateID = '".$ActStateID."', "
                    ."ActDescrip = '".$ActDescrip."', ActLink = '".$ActLink."', StartDate = '".$StartDate."', EndDate = '".$EndDate."', CreateDate = '".$CreateDate."', Comments = '".$Comments."', ckbCom = '".$ckbCom."', Modified = getdate() "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
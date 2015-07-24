<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $LoginID = filter_input(INPUT_POST, 'LoginID');
    $ResourceTypeID = filter_input(INPUT_POST, 'ResourceTypeID');
    $ActTitle = filter_input(INPUT_POST, 'ActTitle');
    $ActOrganizer = filter_input(INPUT_POST, 'ActOrganizer');
    $ActCity = filter_input(INPUT_POST, 'ActCity');
    $ActStateID = filter_input(INPUT_POST, 'ActStateID');
    $ActDescrip = filter_input(INPUT_POST, 'ActDescrip');
    $ActLink = filter_input(INPUT_POST, 'ActLink');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    $CreateDate = filter_input(INPUT_POST, 'CreateDate');
    $Comments = filter_input(INPUT_POST, 'Comments');
    $ckbCom = filter_input(INPUT_POST, 'ckbCom');

    $query = "UPDATE [IVCPD].[dbo].[PDRequest] "
                ."SET LoginID = '".$LoginID."', ResourceTypeID = '".$ResourceTypeID."', ActTitle = '".$ActTitle."', ActOrganizer = '".$ActOrganizer."', ActCity = '".$ActCity."', ActStateID = '".$ActStateID."', "
                ."ActDescrip = '".$ActDescrip."', ActLink = '".$ActLink."', StartDate = '".$StartDate."', EndDate = '".$EndDate."', CreateDate = '".$CreateDate."', Comments = '".$Comments."', ckbCom = '".$ckbCom."', Modified = getdate() "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
<?php
    require("config.php");

    $AvailFlexWeekID = $_POST['AvailFlexWeekID'];
    $LoginID = $_POST['LoginID'];

    $query = "SELECT * FROM [IVCPD].[dbo].[FlexWeek] WHERE AvailFlexWeekID = '".$AvailFlexWeekID."' AND LoginID = '".$LoginID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
?>
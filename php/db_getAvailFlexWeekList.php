<?php
    require("config.php");

    $TermStart = $_POST['TermStart'];
    $TermEnd = $_POST['TermEnd'];
        
    $query = "SELECT avfw.*, admn.* "
                ."FROM [IVCPD].[dbo].[AvailFlexWeek] AS avfw LEFT JOIN [IVCPD].[dbo].[Administrator] AS admn ON avfw.AdministratorID = admn.AdministratorID "
                ."WHERE CONVERT(DATETIME, avfw.StartDate) BETWEEN CONVERT(DATETIME, '".$TermStart."') AND CONVERT(DATETIME, '".$TermEnd."')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);
?>
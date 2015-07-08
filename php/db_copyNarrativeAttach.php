<?php
    require("config.php");
    
    $ResultID = "";
    $SourceFileLinkName = $_POST['SourceFileLinkName'];
    $PDRequestID = $_POST['PDRequestID'];
    $FileLinkName = $_POST['FileLinkName'];
    $FileName = $_POST['FileName'];

    $query = "INSERT INTO [IVCPD].[dbo].[NarrativeAttach] "
                ."(PDRequestID, FileLinkName, FileName) "
                ."VALUES ('$PDRequestID', '$FileLinkName', '$FileName')";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();
    
    if ($ResultID !== "") {
        $result = copy($SourceFileLinkName, $FileLinkName);
    }
    else {
        $result = false;
    }

    echo json_encode($result);
?>
<?php
    require("config.php");
    
    $SourceFileLinkName = filter_input(INPUT_POST, 'SourceFileLinkName');
    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $FileLinkName = filter_input(INPUT_POST, 'FileLinkName');
    $FileName = filter_input(INPUT_POST, 'FileName');

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
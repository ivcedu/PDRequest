<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/PDRequest/attach_files/";
 
    $fileString = $_FILES["files"]["name"][0];

    $pos_1 = strpos($fileString, ":PDRequestID_");
    $pos_2 = strpos($fileString, ":fileIndex_");
    $PDRequestID = substr($fileString, 0, $pos_1);
    $file_index = substr($fileString, $pos_1 + 13, $pos_2 - ($pos_1 + 13));
    $file_name = substr($fileString, $pos_2 + 11);
    $file_link_name = "narrative_".$PDRequestID."_".$file_index."_".$file_name;

    $result = move_uploaded_file($_FILES["files"]["tmp_name"][0], $output_dir.$file_link_name);
    $NarrativeAttachID = insertAttachToDB($dbConn, $PDRequestID, $file_link_name, $file_name);

    echo json_encode($NarrativeAttachID); 
    
    function insertAttachToDB($dbConn, $PDRequestID, $FileLinkName, $FileName) {        
        $ResultID = "";
        $query = "INSERT INTO [IVCPD].[dbo].[NarrativeAttach] "
                    ."(PDRequestID, FileLinkName, FileName) "
                    ."VALUES ('$PDRequestID', '$FileLinkName', '$FileName')";

        $cmd = $dbConn->prepare($query);
        $cmd->execute();
        $ResultID = $dbConn->lastInsertId();
        
        return $ResultID;
    }
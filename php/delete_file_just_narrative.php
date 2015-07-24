<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/PDRequest/attach_files/";

    $FileLinkName = filter_input(INPUT_POST, 'FileLinkName');

    $query = "DELETE FROM [IVCPD].[dbo].[NarrativeAttach] WHERE FileLinkName = '".$FileLinkName."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();

    $result = unlink($output_dir.$FileLinkName);

    echo json_encode($result);
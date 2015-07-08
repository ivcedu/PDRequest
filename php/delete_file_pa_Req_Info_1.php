<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/PDRequest/attach_files/";
    
    if(isset($_POST["FileLinkName"]))
    {  
        $FileLinkName = $_POST['FileLinkName'];

        $query = "DELETE FROM [IVCPD].[dbo].[PAReqInfo1Attach] WHERE FileLinkName = '".$FileLinkName."'";
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute();

        $result = unlink($output_dir.$FileLinkName);
        
        echo json_encode($result);
    }
 ?>
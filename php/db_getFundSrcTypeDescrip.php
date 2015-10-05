<?php
    require("config.php");

    $FundSrcTypeID = filter_input(INPUT_POST, 'FundSrcTypeID');

    $query = "SELECT FundSrcDescrip FROM [IVCPD].[dbo].[FundSrcType] WHERE FundSrcTypeID = '".$FundSrcTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data["FundSrcDescrip"]);
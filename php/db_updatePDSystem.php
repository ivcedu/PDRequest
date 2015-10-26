<?php
    require("config.php");

    $PDSystem = filter_input(INPUT_POST, 'PDSystem');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    $SelFiscalYrs = filter_input(INPUT_POST, 'SelFiscalYrs');
    $PDAmt = filter_input(INPUT_POST, 'PDAmt');

    $query = "UPDATE [IVCPD].[dbo].[PDSystem] "
                ."SET PDAmt = '".$PDAmt."', FiscalYrs = '".$SelFiscalYrs."' "
                ."WHERE PDSystem = '".$PDSystem."' AND FiscalYrs = '".$FiscalYrs."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
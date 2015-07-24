<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PreReqFee = filter_input(INPUT_POST, 'PreReqFee');
    $PreTravel = filter_input(INPUT_POST, 'PreTravel');
    $PreMileage = filter_input(INPUT_POST, 'PreMileage');
    $PreMilCost = filter_input(INPUT_POST, 'PreMilCost');
    $PreLodging = filter_input(INPUT_POST, 'PreLodging');
    $PreNumBrk = filter_input(INPUT_POST, 'PreNumBrk');
    $PreBrkCost = filter_input(INPUT_POST, 'PreBrkCost');
    $PreNumLun = filter_input(INPUT_POST, 'PreNumLun');
    $PreLunCost = filter_input(INPUT_POST, 'PreLunCost');
    $PreNumDin = filter_input(INPUT_POST, 'PreNumDin');
    $PreDinCost = filter_input(INPUT_POST, 'PreDinCost');
    $OtherSource = filter_input(INPUT_POST, 'OtherSource');
    $PreOthCost = filter_input(INPUT_POST, 'PreOthCost');
    $PreSubTotal = filter_input(INPUT_POST, 'PreSubTotal');
    $FundingSource = filter_input(INPUT_POST, 'FundingSource');
    $FSApproved = filter_input(INPUT_POST, 'FSApproved');
    $FSComments = filter_input(INPUT_POST, 'FSComments');
    $PreFunCost = filter_input(INPUT_POST, 'PreFunCost');
    $PreTotalCost = filter_input(INPUT_POST, 'PreTotalCost');
    $PreTotalAmtRequest = filter_input(INPUT_POST, 'PreTotalAmtRequest');

    $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                ."SET PreReqFee = '".$PreReqFee."', PreTravel = '".$PreTravel."', PreMileage = '".$PreMileage."', PreMilCost = '".$PreMilCost."', PreLodging = '".$PreLodging."', "
                ."PreNumBrk = '".$PreNumBrk."', PreBrkCost = '".$PreBrkCost."', PreNumLun = '".$PreNumLun."', PreLunCost = '".$PreLunCost."', PreNumDin = '".$PreNumDin."', PreDinCost = '".$PreDinCost."', "
                ."OtherSource = '".$OtherSource."', PreOthCost = '".$PreOthCost."', PreSubTotal = '".$PreSubTotal."', FundingSource = '".$FundingSource."', FSApproved = '".$FSApproved."', FSComments = '".$FSComments."', "
                ."PreFunCost = '".$PreFunCost."', PreTotalCost = '".$PreTotalCost."', PreTotalAmtRequest = '".$PreTotalAmtRequest."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
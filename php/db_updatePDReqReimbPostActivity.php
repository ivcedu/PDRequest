<?php
    require("config.php");

    $PDRequestID = filter_input(INPUT_POST, 'PDRequestID');
    $PostReqFee = filter_input(INPUT_POST, 'PostReqFee');
    $PostTravel = filter_input(INPUT_POST, 'PostTravel');
    $PostMileage = filter_input(INPUT_POST, 'PostMileage');
    $PostMilCost = filter_input(INPUT_POST, 'PostMilCost');
    $PostLodging = filter_input(INPUT_POST, 'PostLodging');
    $PostNumBrk = filter_input(INPUT_POST, 'PostNumBrk');
    $PostBrkCost = filter_input(INPUT_POST, 'PostBrkCost');
    $PostNumLun = filter_input(INPUT_POST, 'PostNumLun');
    $PostLunCost = filter_input(INPUT_POST, 'PostLunCost');
    $PostNumDin = filter_input(INPUT_POST, 'PostNumDin');
    $PostDinCost = filter_input(INPUT_POST, 'PostDinCost');
    $OtherSource = filter_input(INPUT_POST, 'OtherSource');
    $PostOthCost = filter_input(INPUT_POST, 'PostOthCost');
    $PostSubTotal = filter_input(INPUT_POST, 'PostSubTotal');
    $FundingSource = filter_input(INPUT_POST, 'FundingSource');
    $FSApproved = filter_input(INPUT_POST, 'FSApproved');
    $FSComments = filter_input(INPUT_POST, 'FSComments');
    $PostFunCost = filter_input(INPUT_POST, 'PostFunCost');
    $PostTotalCost = filter_input(INPUT_POST, 'PostTotalCost');
    $PostTotalAmtRequest = filter_input(INPUT_POST, 'PostTotalAmtRequest');

    $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                ."SET PostReqFee = '".$PostReqFee."', PostTravel = '".$PostTravel."', PostMileage = '".$PostMileage."', PostMilCost = '".$PostMilCost."', PostLodging = '".$PostLodging."', "
                ."PostNumBrk = '".$PostNumBrk."', PostBrkCost = '".$PostBrkCost."', PostNumLun = '".$PostNumLun."', PostLunCost = '".$PostLunCost."', PostNumDin = '".$PostNumDin."', PostDinCost = '".$PostDinCost."', "
                ."OtherSource = '".$OtherSource."', PostOthCost = '".$PostOthCost."', PostSubTotal = '".$PostSubTotal."', FundingSource = '".$FundingSource."', FSApproved = '".$FSApproved."', FSComments = '".$FSComments."', "
                ."PostFunCost = '".$PostFunCost."', PostTotalCost = '".$PostTotalCost."', PostTotalAmtRequest = '".$PostTotalAmtRequest."' "
                ."WHERE PDRequestID = '".$PDRequestID."'";

    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);
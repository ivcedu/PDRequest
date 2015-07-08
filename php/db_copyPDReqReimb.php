<?php
    require("config.php");
    
    $ResultID = "";
    $PDRequestID = $_POST['PDRequestID'];
    $NewPDRequestID = $_POST['NewPDRequestID'];

    $query = "INSERT INTO [IVCPD].[dbo].[PDReqReimb] (PDRequestID, PreReqFee, PreTravel, PreMileage, PreMilCost, PreLodging, PreNumBrk, PreBrkCost, PreNumLun, PreLunCost, PreNumDin, PreDinCost, "
                ."OtherSource, PreOthCost, PreSubTotal, FundingSource, FSApproved, FSComments, PreFunCost, PreTotalCost, PreTotalAmtRequest) "
                ."SELECT ".$NewPDRequestID.", PreReqFee, PreTravel, PreMileage, PreMilCost, PreLodging, PreNumBrk, PreBrkCost, PreNumLun, PreLunCost, PreNumDin, PreDinCost, "
                ."OtherSource, PreOthCost, PreSubTotal, FundingSource, FSApproved, FSComments, PreFunCost, PreTotalCost, PreTotalAmtRequest "
                ."FROM [IVCPD].[dbo].[PDReqReimb] "
                ."WHERE PDRequestID = '".$PDRequestID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);
?>
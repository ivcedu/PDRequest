<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PostReqFee = $_POST['PostReqFee'];
        $PostTravel = $_POST['PostTravel'];
        $PostMileage = $_POST['PostMileage'];
        $PostMilCost = $_POST['PostMilCost'];
        $PostLodging = $_POST['PostLodging'];
        $PostNumBrk = $_POST['PostNumBrk'];
        $PostBrkCost = $_POST['PostBrkCost'];
        $PostNumLun = $_POST['PostNumLun'];
        $PostLunCost = $_POST['PostLunCost'];
        $PostNumDin = $_POST['PostNumDin'];
        $PostDinCost = $_POST['PostDinCost'];
        $OtherSource = $_POST['OtherSource'];
        $PostOthCost = $_POST['PostOthCost'];
        $PostSubTotal = $_POST['PostSubTotal'];
        $FundingSource = $_POST['FundingSource'];
        $FSApproved = $_POST['FSApproved'];
        $FSComments = $_POST['FSComments'];
        $PostFunCost = $_POST['PostFunCost'];
        $PostTotalCost = $_POST['PostTotalCost'];
        $PostTotalAmtRequest = $_POST['PostTotalAmtRequest'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                    ."SET PostReqFee = '".$PostReqFee."', PostTravel = '".$PostTravel."', PostMileage = '".$PostMileage."', PostMilCost = '".$PostMilCost."', PostLodging = '".$PostLodging."', "
                    ."PostNumBrk = '".$PostNumBrk."', PostBrkCost = '".$PostBrkCost."', PostNumLun = '".$PostNumLun."', PostLunCost = '".$PostLunCost."', PostNumDin = '".$PostNumDin."', PostDinCost = '".$PostDinCost."', "
                    ."OtherSource = '".$OtherSource."', PostOthCost = '".$PostOthCost."', PostSubTotal = '".$PostSubTotal."', FundingSource = '".$FundingSource."', FSApproved = '".$FSApproved."', FSComments = '".$FSComments."', "
                    ."PostFunCost = '".$PostFunCost."', PostTotalCost = '".$PostTotalCost."', PostTotalAmtRequest = '".$PostTotalAmtRequest."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
<?php
    require("config.php");
    
    if (isset($_POST['PDRequestID']))
    {
        $PDRequestID = $_POST['PDRequestID'];
        $PreReqFee = $_POST['PreReqFee'];
        $PreTravel = $_POST['PreTravel'];
        $PreMileage = $_POST['PreMileage'];
        $PreMilCost = $_POST['PreMilCost'];
        $PreLodging = $_POST['PreLodging'];
        $PreNumBrk = $_POST['PreNumBrk'];
        $PreBrkCost = $_POST['PreBrkCost'];
        $PreNumLun = $_POST['PreNumLun'];
        $PreLunCost = $_POST['PreLunCost'];
        $PreNumDin = $_POST['PreNumDin'];
        $PreDinCost = $_POST['PreDinCost'];
        $OtherSource = $_POST['OtherSource'];
        $PreOthCost = $_POST['PreOthCost'];
        $PreSubTotal = $_POST['PreSubTotal'];
        $FundingSource = $_POST['FundingSource'];
        $FSApproved = $_POST['FSApproved'];
        $FSComments = $_POST['FSComments'];
        $PreFunCost = $_POST['PreFunCost'];
        $PreTotalCost = $_POST['PreTotalCost'];
        $PreTotalAmtRequest = $_POST['PreTotalAmtRequest'];
        
        $query = "UPDATE [IVCPD].[dbo].[PDReqReimb] "
                    ."SET PreReqFee = '".$PreReqFee."', PreTravel = '".$PreTravel."', PreMileage = '".$PreMileage."', PreMilCost = '".$PreMilCost."', PreLodging = '".$PreLodging."', "
                    ."PreNumBrk = '".$PreNumBrk."', PreBrkCost = '".$PreBrkCost."', PreNumLun = '".$PreNumLun."', PreLunCost = '".$PreLunCost."', PreNumDin = '".$PreNumDin."', PreDinCost = '".$PreDinCost."', "
                    ."OtherSource = '".$OtherSource."', PreOthCost = '".$PreOthCost."', PreSubTotal = '".$PreSubTotal."', FundingSource = '".$FundingSource."', FSApproved = '".$FSApproved."', FSComments = '".$FSComments."', "
                    ."PreFunCost = '".$PreFunCost."', PreTotalCost = '".$PreTotalCost."', PreTotalAmtRequest = '".$PreTotalAmtRequest."' "
                    ."WHERE PDRequestID = '".$PDRequestID."'";
        
        $cmd = $dbConn->prepare($query);
        $result = $cmd->execute(); 
        
        echo json_encode($result);
    }
?>
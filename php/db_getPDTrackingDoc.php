<?php
    require("config.php");

    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    $EType = filter_input(INPUT_POST, 'EType');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    
    $str_start_date = "";
    $str_end_date = "";
    $str_etype = "";
    $str_fiscal_yrs = "";
    $str_where = "";
    
    if ($StartDate !== "") {
        $str_start_date = "pdrq.StartDate >= '".$StartDate."'";
    }
    if ($EndDate !== "") {
        $str_end_date = "pdrq.EndDate <= '".$EndDate."'";
    }
    if ($EType !== "All") {
        switch ($EType) {
            case "Full Time":
                $str_etype = "logn.LoginEType = 'Full Time Faculty'";
                break;
            case "Part Time":
                $str_etype = "logn.LoginEType = 'Part Time Faculty'";
                break;
            case "Staff":
                $str_etype = "logn.LoginEType = 'Staff'";
                break;
        }
    }
    if ($FiscalYrs !== "") {
        $str_fiscal_yrs = "pdrq.FiscalYrs = '".$FiscalYrs."'";
    }
    
    ////////////////////////////////////////////////////////////////////////////
    if ($str_start_date !== "") {
        $str_where = "WHERE ".$str_start_date."";
    }
    if ($str_end_date !== "") {
        if ($str_where === "") {
            $str_where = "WHERE ".$str_end_date."";
        }
        else {
            $str_where = $str_where." AND ".$str_end_date."";
        }
    }
    if ($str_etype !== "") {
        if ($str_where === "") {
            $str_where = "WHERE ".$str_etype."";
        }
        else {
            $str_where = $str_where." AND ".$str_etype."";
        }
    }
    if ($str_fiscal_yrs !== "") {
        if ($str_where === "") {
            $str_where = "WHERE ".$str_fiscal_yrs."";
        }
        else {
            $str_where = $str_where." AND ".$str_fiscal_yrs."";
        }
    }
    
    $query = "SELECT pdrq.PDRequestID, trdc.TracDocID, logn.LoginName AS FacultyName, pdrq.PreSubDate AS PreSubmissionDate, pdrq.PreAprDate AS PreApprovedDate, ISNULL(pdrh.PreTotalHr, 0) AS PreHrsRequest, "
                ."ISNULL(pdrh.PreAppHr, 0) AS PreHrsApproved, ISNULL(pdrr.PreTotalAmtRequest, 0) AS PreAmtRequest, ISNULL(pdrr.PreTotalAmtApproved, 0) AS PreAmtApproved, pdrq.PostSubDate AS PostSubmissionDate, "
                ."pdrq.PostAprDate AS PostApprovedDate, ISNULL(pdrh.PostTotalHr, 0) AS PostHrsRequest, ISNULL(pdrh.PostAppHr, 0) AS PostHrsApproved, ISNULL(pdrr.PostTotalAmtRequest, 0) AS PostAmtRequest, "
                ."ISNULL(pdrr.PostTotalAmtApproved, 0) AS PostAmtApproved, trdc.ReqNum AS ReqNum, trdc.DistPaid AS DistPaidAmt, trdc.DistCompDate AS DistCompleteDate, trdc.Comments AS Comments, "
                ."pdrq.StartDate, pdrq.EndDate, "
                ."trdc.DistPaid, trdc.Comments "
                ."FROM [IVCPD].[dbo].[TracDoc] AS trdc LEFT JOIN [IVCPD].[dbo].[PDRequest] AS pdrq ON trdc.PDRequestID = pdrq.PDRequestID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqHours] AS pdrh ON trdc.PDRequestID = pdrh.PDRequestID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqReimb] AS pdrr ON trdc.PDRequestID = pdrr.PDRequestID "
                ."LEFT JOIN [IVCPD].[dbo].[Login] AS logn ON pdrq.LoginID = logn.LoginID "
                .$str_where;

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();

    echo json_encode($data);
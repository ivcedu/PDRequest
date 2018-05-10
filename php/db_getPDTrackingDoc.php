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
    
    $query = "SELECT pdrq.PDRequestID, "
            . "trdc.TracDocID, "
            . "pdrq.ActTitle, "
            . "logn.LoginName AS FacultyName, "
            . "pdrq.StartDate, "
            . "pdrq.EndDate, "
            . "pdpr.HrsPreSubDate, "
            . "pdpr.HrsPreAprDate, "
            . "pdpr.ReimbPreSubDate, "
            . "pdpr.ReimbPreAprDate, "
            . "CASE WHEN pdrq.ResourceTypeID = 1 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrh.PreTotalHr, 0) ELSE 0 END AS PreHrsRequest, "
            . "CASE WHEN pdrq.ResourceTypeID = 1 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrh.PreAppHr, 0) ELSE 0 END AS PreHrsApproved, "
            . "CASE WHEN pdrq.ResourceTypeID = 2 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrr.PreTotalAmtRequest, 0) ELSE 0 END AS PreAmtRequest, "
            . "CASE WHEN pdrq.ResourceTypeID = 2 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrr.PreTotalAmtApproved, 0) ELSE 0 END AS PreAmtApproved, "
            . "pdpr.HrsPostSubDate, "
            . "pdpr.HrsPostAprDate, "
            . "pdpr.ReimbPostSubDate, "
            . "pdpr.ReimbPostAprDate, "
            . "CASE WHEN pdrq.ResourceTypeID = 1 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrh.PostTotalHr, 0) ELSE 0 END AS PostHrsRequest, "
            . "CASE WHEN pdrq.ResourceTypeID = 1 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrh.PostAppHr, 0) ELSE 0 END AS PostHrsApproved, "
            . "CASE WHEN pdrq.ResourceTypeID = 2 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrr.PostTotalAmtRequest, 0) ELSE 0 END AS PostAmtRequest, "
            . "CASE WHEN pdrq.ResourceTypeID = 2 OR pdrq.ResourceTypeID = 3 THEN ISNULL(pdrr.PostTotalAmtApproved, 0) ELSE 0 END AS PostAmtApproved, "
            . "trdc.ExpenseReport, "
            . "trdc.ReqNum, "
            . "trdc.DistPaid, "
            . "trdc.DistCompDate, "
            . "trdc.Comments AS Comments "
            . "FROM [IVCPD].[dbo].[TracDoc] AS trdc LEFT JOIN [IVCPD].[dbo].[PDRequest] AS pdrq ON trdc.PDRequestID = pdrq.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[PDReqHRProcess] AS pdpr ON pdrq.PDRequestID = pdpr.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[PDReqHours] AS pdrh ON trdc.PDRequestID = pdrh.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[PDReqReimb] AS pdrr ON trdc.PDRequestID = pdrr.PDRequestID "
            . "LEFT JOIN [IVCPD].[dbo].[Login] AS logn ON pdrq.LoginID = logn.LoginID "
            . $str_where
            . " ORDER BY pdrq.PDRequestID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();

    echo json_encode($data);
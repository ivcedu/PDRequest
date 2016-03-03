<?php
    require("config.php");

    $StartDate = filter_input(INPUT_GET, 'StartDate');
    $EndDate = filter_input(INPUT_GET, 'EndDate');
    $EType = filter_input(INPUT_GET, 'EType');
    $FiscalYrs = filter_input(INPUT_GET, 'FiscalYrs');
    
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
            . "logn.LoginName AS FacultyName, "
            . "pdrq.StartDate, "
            . "pdrq.EndDate, "
            . "pdpr.HrsPreSubDate, "
            . "pdpr.HrsPreAprDate, "
            . "pdpr.ReimbPreSubDate, "
            . "pdpr.ReimbPreAprDate, "
            . "ISNULL(pdrh.PreTotalHr, 0) AS PreHrsRequest, "
            . "ISNULL(pdrh.PreAppHr, 0) AS PreHrsApproved, "
            . "ISNULL(pdrr.PreTotalAmtRequest, 0) AS PreAmtRequest, "
            . "ISNULL(pdrr.PreTotalAmtApproved, 0) AS PreAmtApproved, "
            . "pdpr.HrsPostSubDate, "
            . "pdpr.HrsPostAprDate, "
            . "pdpr.ReimbPostSubDate, "
            . "pdpr.ReimbPostAprDate, "
            . "ISNULL(pdrh.PostTotalHr, 0) AS PostHrsRequest, "
            . "ISNULL(pdrh.PostAppHr, 0) AS PostHrsApproved, "
            . "ISNULL(pdrr.PostTotalAmtRequest, 0) AS PostAmtRequest, "
            . "ISNULL(pdrr.PostTotalAmtApproved, 0) AS PostAmtApproved, "
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

    $filename = "export_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('PDRequestID','FacultyName', 'StartDate', 'EndDate', 
                        'HrsPreSubDate','HrsPreAprDate','ReimbPreSubDate','ReimbPreAprDate',
                        'PreHrsRequest', 'PreHrsApproved','PreAmtRequest','PreAmtApproved',
                        'HrsPostSubDate','HrsPostAprDate','ReimbPostSubDate','ReimbPostAprDate',
                        'PostHrsRequest','PostHrsApproved','PostAmtRequest','PostAmtApproved',
                        'ReqNum', 'DistrictAllocation', 'Comments'));
    // Write all the user records to the spreadsheet
    foreach($data as $row) {        
        fputcsv($out, array($row['PDRequestID'], $row['FacultyName'], $row['StartDate'], $row['EndDate'], 
                            $row['HrsPreSubDate'], $row['HrsPreAprDate'], $row['ReimbPreSubDate'], $row['ReimbPreAprDate'], 
                            $row['PreHrsRequest'], $row['PreHrsRequest'], $row['PreAmtRequest'], $row['PreAmtApproved'], 
                            $row['HrsPostSubDate'], $row['HrsPostAprDate'], $row['ReimbPostSubDate'], $row['ReimbPostAprDate'], 
                            $row['PostHrsRequest'], $row['PostHrsApproved'], $row['PostAmtRequest'], $row['PostAmtApproved'], 
                            $row['ReqNum'], $row['DistPaid'], $row['Comments']));
    }
    
    fclose($out);
    exit;
<?php
    require("config.php");

    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    $EType = filter_input(INPUT_POST, 'EType');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    
    $str2_where = "";
    $str2_start_date = "";
    $str2_end_date = "";
    $str2_etype = "";
    $str3_where = "";
    $str3_start_date = "";
    $str3_end_date = "";
    $str3_etype = "";
    
    if ($StartDate !== "") {
        $str2_start_date = "CONVERT(DATETIME, flwk.StartDate) >= CONVERT(DATETIME, '".$StartDate."')";
        $str3_start_date = "CONVERT(DATETIME, pdrq.StartDate) >= CONVERT(DATETIME, '".$StartDate."')";
    }
    if ($EndDate !== "") {
        $str2_end_date = "CONVERT(DATETIME, flwk.EndDate) <= CONVERT(DATETIME, '".$EndDate."')";
        $str3_end_date = "CONVERT(DATETIME, pdrq.EndDate) <= CONVERT(DATETIME, '".$EndDate."')";
    }
    if ($EType !== "All") {
        switch ($EType) {
            case "Full Time":
                $str2_etype = "logn.LoginEType = 'Full Time Faculty' ";
                $str3_etype = "logn.LoginEType = 'Full Time Faculty' ";
                break;
            case "Part Time":
                $str2_etype = "logn.LoginEType = 'Part Time Faculty' ";
                $str3_etype = "logn.LoginEType = 'Part Time Faculty' ";
                break;
            case "Staff":
                $str2_etype = "logn.LoginEType = 'Staff' ";
                $str3_etype = "logn.LoginEType = 'Staff' ";
                break;
        }
    }
    
    if ($str2_start_date !== "") {
        $str2_where = "WHERE ".$str2_start_date."";
    }
    if ($str2_end_date !== "") {
        if ($str2_where === "") {
            $str2_where = "WHERE ".$str2_end_date."";
        }
        else {
            $str2_where = $str2_where."AND ".$str2_end_date."";
        }
    }
    if ($str2_etype !== "") {
        if ($str2_where === "") {
            $str2_where = "WHERE ".$str2_etype."";
        }
        else {
            $str2_where = $str2_where."AND ".$str2_etype."";
        }
    }
    $str2_where = $str2_where." AND flwk.FiscalYrs = '".$FiscalYrs."'";
    
    if ($str3_start_date !== "") {
        $str3_where = "WHERE ".$str3_start_date."";
    }
    if ($str3_end_date !== "") {
        if ($str3_where === "") {
            $str3_where = "WHERE ".$str3_end_date."";
        }
        else {
            $str3_where = $str3_where."AND ".$str3_end_date."";
        }
    }
    if ($str3_etype !== "") {
        if ($str3_where === "") {
            $str3_where = "WHERE ".$str3_etype."";
        }
        else {
            $str3_where = $str3_where."AND ".$str3_etype."";
        }
    }
    $str3_where = $str3_where." AND pdrq.FiscalYrs = '".$FiscalYrs."'";

    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query1 = "CREATE TABLE #RESULT (FacultyName nvarchar(255), Employee nvarchar(255), RequestHrs decimal(18, 2), ApprovedHrs decimal(18, 2), RequestAmount decimal(18, 2), ApprovedAmount decimal(18, 2))";
    
    $query2 = "INSERT INTO #RESULT SELECT logn.LoginName, logn.LoginEType, SUM(flwk.FWHours), SUM(CASE WHEN flwk.Confirmed = 1 THEN flwk.FWHours ELSE 0 END), 0.00, 0.00 "
                ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[Login] AS logn ON flwk.LoginID = logn.LoginID "
                .$str2_where.""
                ."GROUP BY logn.LoginName, logn.LoginEType";
    
    $query3 = "INSERT INTO #RESULT SELECT logn.LoginName, logn.LoginEType, ISNULL(SUM(pdrh.PostTotalHr), 0), ISNULL(SUM(pdrh.PostAppHr), 0), ISNULL(SUM(pdrr.PostTotalAmtRequest), 0), ISNULL(SUM(pdrr.PostTotalAmtApproved), 0) "
                ."FROM [IVCPD].[dbo].[PDRequest] AS pdrq LEFT JOIN [IVCPD].[dbo].[Login] AS logn ON pdrq.LoginID = logn.LoginID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqHours] AS pdrh ON pdrq.PDRequestID = pdrh.PDRequestID "
                ."LEFT JOIN [IVCPD].[dbo].[PDReqReimb] AS pdrr ON pdrq.PDRequestID = pdrr.PDRequestID "
                .$str3_where.""
                ."GROUP BY logn.LoginName, logn.LoginEType ";
    
    // tardis current active full time facluty list
    $query4 = "INSERT INTO #RESULT SELECT empy.FirstName + ' ' + empy.LastName AS FullName, 'Full Time Faculty', 0.00, 0.00, 0.00, 0.00 "
                ."FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[InstructorInfo] AS inst LEFT JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[EmployeeInfo] AS empy on inst.EmployeeID = empy.EmployeeID "
                ."WHERE	inst.IsActiveFullTime = 'Y' AND empy.Organization = 'I'";
            
    
    $query5 = "SELECT FacultyName, Employee, SUM(RequestHrs) AS RequestHrs, SUM(ApprovedHrs) AS ApprovedHrs, SUM(RequestAmount) AS RequestAmount, SUM(ApprovedAmount) AS ApprovedAmount "
                ."FROM #RESULT GROUP BY FacultyName, Employee ORDER BY FacultyName ASC";
    
    $query6 = "DROP TABLE #RESULT";
    
    $dbConn->query($query1);
    $dbConn->query($query2);
    $dbConn->query($query3);
    $dbConn->query($query4);

    $cmd = $dbConn->prepare($query5);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    $dbConn->query($query6);

    echo json_encode($data);

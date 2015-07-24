<?php
    require("config.php");

    $StartDate = filter_input(INPUT_GET, 'StartDate');
    $EndDate = filter_input(INPUT_GET, 'EndDate');
    $FWJustID= filter_input(INPUT_GET, 'FWJustID');
    $FiscalYrs = filter_input(INPUT_GET, 'FiscalYrs');
    
    $str_where = "";
    $str_start_date = "";
    $str_end_date = "";
    $str_fw_just_id = "";
    
    if ($StartDate !== "") {
        $str_start_date = "CONVERT(DATETIME, flwk.StartDate) >= CONVERT(DATETIME, '".$StartDate."')";
    }
    if ($EndDate !== "") {
        $str_end_date = "CONVERT(DATETIME, flwk.EndDate) <= CONVERT(DATETIME, '".$EndDate."')";
    }
    if ($FWJustID !== "All") {
        $str_fw_just_id = "fwja.".$FWJustID." = 1";
    }
    
    if ($str_start_date !== "") {
        $str_where = "WHERE ".$str_start_date;
    }
    if ($str_end_date !== "") {
        if ($str_where === "") {
            $str_where = "WHERE ".$str_end_date;
        }
        else {
            $str_where = $str_where." AND ".$str_end_date;
        }
    }
    if ($str_fw_just_id !== "") {
        if ($str_where === "") {
            $str_where = "WHERE ".$str_fw_just_id;
        }
        else {
            $str_where = $str_where." AND ".$str_fw_just_id;
        }
    }
    $str_where = $str_where." AND flwk.FiscalYrs = '".$FiscalYrs."'";
    
    $query = "SELECT flwk.FlexWeekID, logn.LoginName, flwk.ActTitle, flwk.FWHours, flwk.StartDate, flwk.EndDate, flwk.Confirmed, "
                ."fwja.FWJust1, fwja.FWJust2, fwja.FWJust3, fwja.FWJust4, fwja.FWJust5, fwja.FWJust5, fwja.FWJust7, fwja.FWJust8, fwja.FWJust9 "
                ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[Login] AS logn ON flwk.LoginID = logn.LoginID "
                ."LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                ."".$str_where.""
                ."ORDER BY logn.LoginName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();

    $filename = "export_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('Faculty Name','Activity Title','Start Date','End Date', 'Hrs', 'Confirm'));
    // Write all the user records to the spreadsheet
    foreach($data as $row)
    {
        $str_confirm = $row['Confirmed'] == 1 ? "Yes" : "No";
        fputcsv($out, array($row['LoginName'], $row['ActTitle'], $row['StartDate'], $row['EndDate'], $row['FWHours'], $str_confirm));
    }
    
    fclose($out);
    exit;
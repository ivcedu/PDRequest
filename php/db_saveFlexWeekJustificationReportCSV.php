<?php
    require("config.php");
    
    $FiscalYrs = filter_input(INPUT_GET, 'FiscalYrs');
    
    $query_just_1 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust1 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_2 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust2 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_3 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust3 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_4 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust4 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_5 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust5 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_6 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust6 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_7 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust7 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_8 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust8 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $query_just_9 = "SELECT flwk.ActTitle "
                    ."FROM [IVCPD].[dbo].[FlexWeek] AS flwk LEFT JOIN [IVCPD].[dbo].[FWJustArea] AS fwja ON flwk.FlexWeekID = fwja.FlexWeekID "
                    ."WHERE fwja.FWJust9 = 1 AND flwk.FiscalYrs = '".$FiscalYrs."' "
                    ."GROUP BY flwk.ActTitle "
                    ."ORDER BY flwk.ActTitle ASC ";
    
    $cmd = $dbConn->prepare($query_just_1);
    $cmd->execute();
    $data_1 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_2);
    $cmd->execute();
    $data_2 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_3);
    $cmd->execute();
    $data_3 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_4);
    $cmd->execute();
    $data_4 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_5);
    $cmd->execute();
    $data_5 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_6);
    $cmd->execute();
    $data_6 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_7);
    $cmd->execute();
    $data_7 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_8);
    $cmd->execute();
    $data_8 = $cmd->fetchAll();
    
    $cmd = $dbConn->prepare($query_just_9);
    $cmd->execute();
    $data_9 = $cmd->fetchAll();
    
    // create excel file
    $filename = "export_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');
    
    fputcsv($out, array('Justification: Improvement of teaching'));
    foreach($data_1 as $row_1)
    {
        fputcsv($out, array($row_1['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Maintenance of current academic, technical knowledge and skills'));
    foreach($data_2 as $row_2)
    {
        fputcsv($out, array($row_2['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: In-service training for vocational education and employment preparation programs'));
    foreach($data_3 as $row_3)
    {
        fputcsv($out, array($row_3['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Retaining to meet changing institutional needs'));
    foreach($data_4 as $row_4)
    {
        fputcsv($out, array($row_4['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Intersegmental exchange programs'));
    foreach($data_5 as $row_5)
    {
        fputcsv($out, array($row_5['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Development of innovations in instructional and administrative techniques and program effectiveness'));
    foreach($data_6 as $row_6)
    {
        fputcsv($out, array($row_6['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Computer and technology proficiency programs'));
    foreach($data_7 as $row_7)
    {
        fputcsv($out, array($row_7['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Courses and training implementing affirmative action and upward mobility programs'));
    foreach($data_8 as $row_8)
    {
        fputcsv($out, array($row_8['ActTitle']));
    }
    
    fputcsv($out, array(' '));
    fputcsv($out, array('Justification: Other activities determined to be related to educational and professional development'));
    foreach($data_9 as $row_9)
    {
        fputcsv($out, array($row_9['ActTitle']));
    }
    
    fclose($out);
    exit;
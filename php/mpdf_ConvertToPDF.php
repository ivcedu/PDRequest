<?php
    include('C:/xampp/htdocs/mpdf/mpdf.php');

    //$str_html = $_GET['str_html'];
    $html = "<div class='row'>"
            . "<div class='span2' style='padding-top: 5px; font-weight: bold;'>ID:</div>"
            . "<div class='span2' style='padding-top: 5px; font-weight: bold;' id='pdrequest_id'>177</div>"
            . "</div>";

    $mpdf = new mPDF();
    $stylesheet = file_get_contents('../css/bootstrap.min.css'); // external css
    
    $mpdf->WriteHTML($stylesheet, 1);
    //$mpdf->WriteHTML($str_html, 2);
    $mpdf->WriteHTML($html, 2);
    
    $mpdf->Output();
    exit;

?>    
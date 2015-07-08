<?php
    require("class.phpmailer.php");

    if (isset($_POST['Email']))
    {
        $Email = $_POST['Email'];
        $Name = $_POST['Name'];
        $Subject = $_POST['Subject']; 
        $Message = $_POST['Message'];
        
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->Host = "smtp1.socccd.edu";
        $mail->From = "flexofficer@ivc.edu";
        $mail->FromName = "IVC Professional Development Officer";
        $mail->AddAddress($Email, $Name);
        $mail->IsHTML(true); // send as HTML
        $mail->Subject = $Subject;
        $mail->Body = $Message;
        
        if($mail->Send())
            echo "true";
        else
            echo "false";
    }
?>


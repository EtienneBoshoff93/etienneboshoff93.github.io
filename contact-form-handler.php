<?php
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $phone = $_POST['phone'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $email_from = 'etienne4241@gmail.com';

    $email_subject = 'QUERY ON CV WEBSITE';

    $email_body = "Name: $name $surname. \n".
                        "email: $visitor_email. \n". 
                             "message: $message. \n";

    $to = "etienne4241@hotmail.com";

    $headers = "From: $email_from \r\n";
    $headers = "Reply-To: $visitor_email \r\n";

    mail($to,$email_subject,$email_body, $headers);

    header("Location: index.html");
?>
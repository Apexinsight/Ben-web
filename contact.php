<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo 'Invalid request.';
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? 'Website inquiry');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please complete all required fields with a valid email address.';
    exit;
}

$recipient = 'blessedbenwork@gmail.com';
$clean_subject = preg_replace("/[\r\n]+/", ' ', $subject);
$final_subject = 'New message from ' . $name . ' - ' . $clean_subject;

$email_content = "Name: {$name}\n";
$email_content .= "Email: {$email}\n";
$email_content .= "Subject: {$clean_subject}\n\n";
$email_content .= "Message:\n{$message}\n";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: Blessed Ben Website <{$recipient}>";
$headers[] = "Reply-To: {$name} <{$email}>";

$sent = mail($recipient, $final_subject, $email_content, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo 'Thanks, your message has been sent.';
} else {
    http_response_code(500);
    echo 'The message could not be sent automatically. Please use the WhatsApp or email link.';
}

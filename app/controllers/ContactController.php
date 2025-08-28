<?php
class ContactController
{
    public function index()
    {
        session_start();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $result = $this->validate($_POST);

            if (!empty($result['errors'])) {
                $_SESSION['errors'] = $result['errors'];
                $_SESSION['old_input'] = $_POST;
            } else {
                $_SESSION['success'] = $result['success'];
            }

            header("Location: index.php?page=contact");
            exit;
        }

        require_once __DIR__ . '/../views/contact.php';
    }

    private function validate($data)
    {
        $errors = [];
        $success = '';

        $first_name = trim($data['first_name'] ?? '');
        $last_name = trim($data['last_name'] ?? '');
        $email = trim($data['email'] ?? '');
        $phone = trim($data['phone'] ?? '');
        $message = trim($data['message'] ?? '');

        $errors = [];

        if (empty($first_name)) {
            $errors['first_name'] = "First name is required";
        } elseif (!preg_match("/^[a-zA-Z ]+$/", $first_name)) {
            $errors["first_name"] = "First Name can only be letters and spaces";
        }


        if (empty($last_name))
            $errors['last_name'] = "Last name is required";
        if (empty($email))
            $errors['email'] = "Email is required";
        if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL))
            $errors['email'] = "Invalid email";
        if (empty($phone)) {
            $errors['phone'] = "Phone number is required";
        }
        if (!empty($phone)) {
            $cleanPhone = trim($phone);

            if (!ctype_digit($cleanPhone)) {
                $errors['phone'] = "Phone number can contain only digits";
            } elseif (strlen($cleanPhone) < 7 || strlen($cleanPhone) > 10) {
                $errors['phone'] = "Phone number must be between 7 and 10 digits";
            }
        }
        if (empty($errors)) {
            $success = "<div style='padding:15px; border:1px solid #4CAF50; background:#d4edda; color:#155724; border-radius:5px;'>
                    <h4>Thank you, " . htmlspecialchars($first_name) . "!</h4>
                    <p>Your message has been received successfully. Here’s a summary of what you submitted:</p>
                    <ul>
                        <li><strong>Full Name:</strong> " . htmlspecialchars($first_name . " " . $last_name) . "</li>
                        <li><strong>Email:</strong> " . htmlspecialchars($email) . "</li>
                        <li><strong>Phone:</strong> " . htmlspecialchars($phone) . "</li>
                        <li><strong>Message:</strong> " . nl2br(htmlspecialchars($message)) . "</li>
                    </ul>
                    <p>We will get back to you as soon as possible!</p>
                </div>";

            $_SESSION['success'] = $success;
        }


        return ['errors' => $errors, 'success' => $success];
    }
}
?>
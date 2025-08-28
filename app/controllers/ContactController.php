<?php
class ContactController
{

    // Main entry
    public function index()
    {
        session_start();

        // If form is submitted
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $result = $this->validate($_POST); // call separate validation method

            if (!empty($result['errors'])) {
                $_SESSION['errors'] = $result['errors'];
                $_SESSION['old_input'] = $_POST;
            } else {
                $_SESSION['success'] = $result['success'];
            }

            // Redirect back to the contact page
            header("Location: index.php?page=contact");
            exit;
        }

        // Load view
        require_once __DIR__ . '/../views/contact.php';
    }

    // Separate validation method
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

        if (empty($first_name))
            $errors['first_name'] = "First name is required";
        if (empty($last_name))
            $errors['last_name'] = "Last name is required";
        if (empty($email))
            $errors['email'] = "Email is required";
        if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL))
            $errors['email'] = "Invalid email";
        if (empty($message))
            $errors['message'] = "Message is required";


        // Success
        if (empty($errors)) {
            $success = "Form submitted successfully!";
        }

        return ['errors' => $errors, 'success' => $success];
    }
}
?>
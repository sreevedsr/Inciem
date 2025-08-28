<?php
class Contact {
    public function save($data) {
        // Later this will go to DB
        // For now just simulate saving
        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $msg = htmlspecialchars($data['message']);

        // Simulated response
        return "Thank you $name, we received your message!";
    }
}

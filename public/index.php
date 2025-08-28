<?php
$page = $_GET['page'] ?? 'home';
switch ($page) {
    case 'contact':
        require_once "../app/controllers/ContactController.php";
        $controller = new ContactController();
        $controller->index();
        break;

    case 'home':
    default:
        require_once "../app/controllers/HomeController.php";
        $controller = new HomeController();
        $controller->index();
        break;
}
?>

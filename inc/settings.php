<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}
if (isset($_POST['logout'])) {
    // Очищаем сессию
    session_start();
    $_SESSION = [];
    session_destroy();
    // Редирект на главную или страницу входа
    header('Location: /?site=main');
    exit;
}
include 'temp/settings.php';

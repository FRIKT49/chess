<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}

class Profile{
    private static $instance;

    static function getInstance(){
        if (!self::$instance) self::$instance = new Profile();

        return self::$instance;
    }
    static function checkProfile(){
        $SQL = "SELECT * FROM `users` WHERE `id` = ".SessionFunc::getUserId();
    }
    
}
if (isset($_POST['logout'])) {
    // Очищаем сессию
    session_start();
    $_SESSION = [];
    session_destroy();
    // Редирект на главную или страницу входа
    Relocations::toReg();
    exit;
}


include 'temp/settings.php';
// include 'inc/avatar.php';
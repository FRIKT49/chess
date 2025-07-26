<?


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

header('Content-Type:json_decode/application/json');

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    $dbConfig = [
        'host' => 'localhost',
        'user' => 'cm36711_diplom',
        'password' => '@Roman2009',
        'dbName' => 'cm36711_diplom'
    ];

    
    $db = mysqli_connect($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);
    session_start();
    $input = file_get_contents('php://input');

    $name = json_decode($input, true)['name'];
    $id = $_SESSION['id'];
    
 
    $_SESSION['name'] = $name;
    $query = "UPDATE `users` SET `name` = '$name' WHERE `id` = $id";
    $result = mysqli_query($db, $query);
    echo json_encode('{"status": "success"}');
}
?>
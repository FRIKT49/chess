<?
header('Content-Type: application/json');
include './classes.php';  

$db = new db($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);
$db = $db->getConnection();
$upperCaseRegex = "/[A-Z]/";
$lowerCaseRegex = "/[a-z]/";
$rusCaseRegex = "/[А-яа-я]/";
$numberRegex = "/[0-9]/";

if($_GET['nick']){
    $nick = mysqli_real_escape_string($db, $_GET['nick']);
    $id = (int) $_GET['id'];
    if ($nick) {

        if ((strlen($nick) > 3 and strlen($nick) < 16) and !preg_match($rusCaseRegex, $nick) and (preg_match($upperCaseRegex, $nick) or preg_match($lowerCaseRegex, $nick) or preg_match($numberRegex, $nick))) {
            $uniq_name = "SELECT * FROM `users` WHERE name = '{$nick}'";
            $resultUniqName = mysqli_query($db, $uniq_name);

            if (mysqli_num_rows($resultUniqName) > 0) {


                
                echo json_encode(['success' => false, 'error' => 'Указанное Вами имя с уже зарегистрировано на нашем сайте']);
            }else{

                if ($nick && $id) {

                    $query = "UPDATE `users` SET `name` = '" . mysqli_real_escape_string($db, $nick) . "' WHERE `id` = " . intval($id);
                    $result = mysqli_query($db, $query);
                    
                    session_start();
                    $_SESSION['name'] = $nick;

                    echo json_encode(['success' => true, 'message' => 'Вы успешно изменили имя!', 'nick' => $nick]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Ошибка изменения имени!', 'nick' => $nick]);
                }

            }
            
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid nickname']);
        }
        
        

        
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid nickname']);
    }

}else{
    echo json_encode(['success' => false, 'error' => 'Nickname not provided']);
}

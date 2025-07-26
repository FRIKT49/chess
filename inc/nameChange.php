<?
header('Content-Type: application/json');
$dbConfig = [
    'host' => 'localhost',
    'user' => 'cm36711_diplom',
    'password' => '@Roman2009',
    'dbName' => 'cm36711_diplom'
];

    
$db = mysqli_connect($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);

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
                // $query = "UPDATE `users` SET `name` = '{$nick}' WHERE `id` = {$id}";
                // $result = mysqli_query($db, $query);
                echo json_encode(['success' => true, 'message' => 'Вы успешно изменили имя!', 'nick' => $nick]);
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

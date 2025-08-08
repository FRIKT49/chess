<?
header("Content-Type: application/json");
$get = [
    'users'=>$_GET['users'],
    'api' => $_GET['api']  
];
include './classes.php';

$db = new db($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);
$db = $db->getConnection();
if($get['api']=='abcdefg12345'){
    
    if($get['users'] == 'all'){

        $SQL = "SELECT id, name, email, pass, regData, isAdm, rating FROM users";
        $query = mysqli_query($db,$SQL);
        
        if ($query) {

            $users = mysqli_fetch_all($query, MYSQLI_ASSOC);
            echo json_encode($users);
            
        }
        
    }
}

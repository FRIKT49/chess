<?
header("Content-Type: application/json");
$get = $_GET;
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
    if($get['users'] == 'delete'){
        $id = intval($_GET['id']);
        $SQL = "DELETE FROM `users` WHERE `id` = $id";
        $query = mysqli_query($db, $SQL);
        
        if ($query) {
            echo json_encode(['status' => 'success', 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete user']);
        }

    }
    if($get['users'] =='email'){
        if($get['email']){
            if(filter_var($get['email'], FILTER_VALIDATE_EMAIL)){
                $id = intval($_GET['id']);
                $email = mysqli_real_escape_string($db, $_GET['email']);
                $SQL = "UPDATE `users` SET `email` = '$email' WHERE `id` = $id";
                $query = mysqli_query($db, $SQL);
            }
            if ($query) {
                echo json_encode(['success' => true, 'message' => 'Вы успешно изменили email!', 'email' => $email]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Не удалось изменить email.']);
            }
        }
        
    } 
}

    

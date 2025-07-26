<?


header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);
$avatar = $data['avatar']; // строка data:image/png;base64,...
$id = isset($data['id']) ? (int)$data['id'] : 0; // Приводим к числу
$dbConfig = [
    'host' => 'localhost',
    'user' => 'cm36711_diplom',
    'password' => '@Roman2009',
    'dbName' => 'cm36711_diplom'
];

    
$db = mysqli_connect($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);

if ($id > 0 && preg_match('/^data:image\/\w+;base64,/', $avatar)) {
    $avatar = substr($avatar, strpos($avatar, ',') + 1);
    $avatar = base64_decode($avatar);

    $stmt = mysqli_prepare($db, "UPDATE `users` SET `avatar` = ? WHERE `id` = ?");
    mysqli_stmt_bind_param($stmt, "si", $avatar, $id); // "s" - строка (BLOB), "i" - integer
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Некорректный id или avatar']);
}
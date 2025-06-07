<?
    if (!defined('ENGINE')) {
        die("Hack no attempt!");
    }
    $dbConfig = [
        'host' => 'MySQL-8.0',
        'user' => 'root',
        'password' => '',
        'dbName' => 'diplom'
    ];


    $db = mysqli_connect($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);

    
?>
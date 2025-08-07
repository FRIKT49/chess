<?php
$dbConfig = [
        'host' => '127.127.126.17',
        'user' => 'root',
        'password' => '',
        'dbName' => 'diplom'
];
class db{
    static $connection;
    public function __construct($host, $user, $password, $dbName){
        self::$connection = mysqli_connect($host, $user, $password, $dbName);
    }
    public static function getConnection(){
        if(!self::$connection){
            throw new Exception("Database connection failed: " . mysqli_connect_error());
        }
        return self::$connection;
    }
}
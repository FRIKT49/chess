<?

    $db = new db($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);

    

    $db = $db->getConnection();
    

?>
<?php
    session_start();
    define('ENGINE', true);

    include 'inc/classes.php';
    #Подключение базы данных
    include 'db/db.php';
    #Подключение массива функций
    include 'inc/functions.php';
    #Загружаем инфу про пользователя
    include 'inc/userInit.php';
    
    #Загрузка главной страницы
    include 'inc/init.php';
    #Проверка ошибок
    include 'inc/error.php';

?>
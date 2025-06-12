<?php

header('Content-Type: application/json');
$dbConfig = [
    'host' => 'localhost',
    'user' => 'cz22780_diplom',
    'password' => '@Roman2009',
    'dbName' => 'cz22780_diplom'
];
    
$db2 = mysqli_connect($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['dbName']);

if ($_GET['nick']) {
    $nick = $_GET['nick'];

    if (mysqli_query($db2, "SELECT `id` FROM `users` WHERE `name` = '{$nick}'")) {
        $resultName = mysqli_query($db2, "SELECT `id` FROM `users` WHERE `name` = '{$nick}'");
        $nameQuery = mysqli_fetch_assoc($resultName);

        $file = 'queue.json';
        $now = time();
        $id = $nameQuery['id'];

        if (file_exists($file)) {
            $queue = json_decode(file_get_contents($file), true);
            if (!is_array($queue)) $queue = [];
        } else {
            $queue = [];
        }

        // Удаляем пользователя из очереди, если он там есть
        $queue = array_filter($queue, function ($item) use ($id) {
            return isset($item['id']) && $item['id'] != $id;
        });

        // Добавляем/обновляем пользователя с last_ping
        $queue[] = ['id' => $id, 'last_ping' => $now];

        // Удаляем "мертвых" (не пинговали больше 10 секунд)
        $queue = array_filter($queue, function ($item) use ($now) {
            return isset($item['last_ping']) && ($now - $item['last_ping']) < 10;
        });

        // Переиндексация массива
        $queue = array_values($queue);

        // Сохраняем обратно
        file_put_contents($file, json_encode($queue, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        // Проверяем, есть ли 2 пользователя
        if (count($queue) >= 2) {
            $id1 = $queue[0]['id'];
            $id2 = $queue[1]['id'];

            // Формируем оба возможных имени файла
            $gameFile1 = "game_{$id1}_{$id2}.json";
            $gameFile2 = "game_{$id2}_{$id1}.json";

            // Проверяем, существует ли файл с этими id (в любом порядке)
            if (file_exists($gameFile1)) {
                $gameFile = $gameFile1;
            } elseif (file_exists($gameFile2)) {

                $gameFile = $gameFile2;
            } else {
                // Если ни один не существует — создаём новый
                $gameFile = $gameFile1;
                // Пример начальных данных для игры
                $rand = rand(1, 2);
                // $color1 = 'white';
                // $color2 = 'black';
                if ($rand == 1) {
                    $color1 = 'white';
                    $color2 = 'black';
                } else {
                    $color1 = 'black';
                    $color2 = 'white';
                }


                $gameData = [
                    'players' => [
                        ['id' => $id1],
                        ['id' => $id2]
                    ],


                    'start_time' => time(),
                ];
                $SQL = "INSERT INTO `games` 
                (
                    `game_name`,
                    `id1`,
                    `id2`,
                    `id1color`,
                    `id2color`
                )
                VALUES 
                (
                    '{$gameFile}',
                    '{$id1}',
                    '{$id2}',
                    '{$color1}',
                    '{$color2}'
                )";
                if (mysqli_query($db2, $SQL)) file_put_contents($gameFile, json_encode($gameData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
            }

            echo json_encode([
                'success' => true,
                'start' => true,
                'players' => [$queue[0], $queue[1]],
                'queue' => $queue,
                'gameFile' => $gameFile
            ]);
        } else {
            // Ждём второго игрока
            echo json_encode([
                'success' => true,
                'start' => false,
                'queue' => $queue
            ]);
        }
        
    }
}

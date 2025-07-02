<?php

if (!defined('ENGINE')) {
    die("Hack no attempt!");
}
$usersId = explode("_", $_GET['game']);

// echo dump($usersId);
$usersInfo=[];


foreach($usersId as $key => $id){
    $name = mysqli_query($db, "SELECT `name` , `rating`,`avatar` FROM `users` WHERE `id` = '{$id}'");
    $nameQuery = mysqli_fetch_assoc($name);

    $game = mysqli_query($db, "SELECT *  FROM `games` WHERE `game_name` = '{$_GET['game']}'");
    // echo dump($nameQuery);
    $usersInfo[] = [$nameQuery['name'],$nameQuery['rating'],'avatar'=>$nameQuery['avatar']];
}
echo dump($_SESSION);
if($usersInfo[1][0] == $_SESSION["name"]){
    $userName = $usersInfo[1][0];
    $userElo = $usersInfo[1][1];
    $userAvatar = $usersInfo[1]['avatar'];
    $enemyName = $usersInfo[2][0];
    $enemyElo = $usersInfo[2][1];
    $enemyAvatar = $usersInfo[2]['avatar'];
    $usersInfo=[[$userName,$userElo,$userAvatar],[$enemyName,$enemyElo,$enemyAvatar]];

}else{
    $userName = $usersInfo[2][0];
    $userElo = $usersInfo[2][1];
    $userAvatar = $usersInfo[2]['avatar'];
    $enemyName = $usersInfo[1][0];
    $enemyElo = $usersInfo[1][1];
    $enemyAvatar = $usersInfo[1]['avatar'];
    $usersInfo=[[$userName,$userElo,$userAvatar],[$enemyName,$enemyElo,$enemyAvatar]];
}
echo dump($usersInfo);
$json = file_get_contents('http://diplom/?site=game&game=38_1');
$data = json_decode($json, true);


include './temp/game.php';


?>

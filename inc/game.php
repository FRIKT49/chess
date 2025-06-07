<?php

if (!defined('ENGINE')) {
    die("Hack no attempt!");
}
$usersId = explode("_", $_GET['game']);

// echo dump($usersId);
$usersInfo=[];


foreach($usersId as $key => $id){
    $name = mysqli_query($db, "SELECT `name` , `rating` FROM `users` WHERE `id` = '{$id}'");
    $nameQuery = mysqli_fetch_assoc($name);

    $game = mysqli_query($db, "SELECT *  FROM `games` WHERE `game_name` = '{$_GET['game']}'");
    // echo dump($nameQuery);
    $usersInfo[] = [$nameQuery['name'],$nameQuery['rating']];
}
echo dump($_SESSION);
if($usersInfo[1][0] == $_SESSION["name"]){
    $userName = $usersInfo[1][0];
    $userElo = $usersInfo[1][1];
    $enemyName = $usersInfo[2][0];
    $enemyElo = $usersInfo[2][1];
    $usersInfo=[[$userName,$userElo],[$enemyName,$enemyElo]];

}else{
    $userName = $usersInfo[2][0];
    $userElo = $usersInfo[2][1];
    $enemyName = $usersInfo[1][0];
    $enemyElo = $usersInfo[1][1];
    $usersInfo=[[$userName,$userElo],[$enemyName,$enemyElo]];
}
echo dump($usersInfo);
$json = file_get_contents('http://diplom/?site=game&game=38_1');
$data = json_decode($json, true);


include './temp/game.php';


?>

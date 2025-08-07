asfsfda<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Новости - ASDChess</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/bootstrap-icons.min.css">
    <link rel="stylesheet" href="./styles/bootstrap.min.css">
    <link rel="stylesheet" href="./styles/main.css">
    <link rel="stylesheet" href="./styles/animations.css">
    <link rel="stylesheet" href="./styles/news.css">
    <script src="./js/jquery.min.js"></script>
    <script src="./js/functions.js"></script>

</head>


<body>
    <div id="sideBar">
        <div id="sideTopWrap">
            <div id="logo" class="sideElem">
                <a href="/?site=main"><img src="./img/mainLogo.svg"></a>
            </div>
            <a href="/?site=play">
                <div id="play" class="sideElem">
                    <img src="./img/play.png">
                    <span>Play</span>
                </div>
            </a>
            
            <div id="you" class="sideElem">
                <img src="./img/you.png">
                <span>You</span>
            </div>
            <a href="/?site=news">
                <div id="news" class="sideElem">
                    <img src="./img/news.png">
                    <span>News</span>
                </div> 
            </a>
            
        </div>
        <div id="sideBotWrap">
            <div id="switch" class="sideElem">
                <img src="./img/white.png">
                <span>Switch mode</span>
            </div>
            <a href="/?site=settings">
                <div id="set" class="sideElem">
                    <img src="./img/settings.png">
                    <span>Settings</span>
                </div>
            </a>
            
        </div> 
    </div>

    <div id="mainBar">
        <div id="newsWrap">
            <div id="newsTopLine"><img src="./img/today.svg" >News</div>
        </div>
    </div>
    <script src="./js/news.js"></script>
</body>

</html> 
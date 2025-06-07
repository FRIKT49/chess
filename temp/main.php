<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/bootstrap-icons.min.css">
    <link rel="stylesheet" href="./styles/bootstrap.min.css">
    <link rel="stylesheet" href="./styles/main.css">
    <link rel="stylesheet" href="./styles/animations.css">
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
            <div id="news" class="sideElem">
                <img src="./img/news.png">
                <span>News</span>
            </div>
        </div>
        <div id="sideBotWrap">
            <div id="switch" class="sideElem">
                <img src="./img/white.png">
                <span>Switch mode</span>
            </div>
            <div id="set" class="sideElem">
                <img src="./img/settings.png">
                <span>Settings</span>
            </div>
        </div>
    </div>
    <div id="mainBar">
        <div id="mainWrap">
            <div id="topLine">
                <div class="userInfo">
                    <img src="./img/schessUserImage.svg" id="userImg"><span><?= $userInfo['userName'] ?></span>
                </div>
                <div id="topRight">
                    <a href="/?site=settings"><img src="./img/settings.png"></a>
                </div>
            </div>
            <div id="playDeck">
                <div id="deck">
                    <div id="cell-template" class="cell" style="display:none"></div>

                    <div id="whiteking-template"  style="display:none"></div>
                    <div id="whitequeen-template"  style="display:none"></div>
                    <div id="whitebishop-template" style="display:none"></div>
                    <div id="whiteknight-template"  style="display:none"></div>
                    <div id="whiterook-template"  style="display:none"></div>
                    <div id="whitepawn-template"  style="display:none"></div>

                    <div id="blackking-template"  style="display:none"></div>
                    <div id="blackqueen-template"  style="display:none"></div>
                    <div id="blackbishop-template"  style="display:none"></div>
                    <div id="blackknight-template"  style="display:none"></div>
                    <div id="blackrook-template"  style="display:none"></div>
                    <div id="blackpawn-template"  style="display:none"></div>
                    <div id="inti">
                        <div class="int">1</div>
                        <div class="int">2</div>
                        <div class="int">3</div>
                        <div class="int">4</div>
                        <div class="int">5</div>
                        <div class="int">6</div>
                        <div class="int">7</div>
                        <div class="int">8</div>
                    </div>
                    <div id="letti">
                        <div class="let">a</div>
                        <div class="let">b</div>
                        <div class="let">c</div>
                        <div class="let">d</div>
                        <div class="let">e</div>
                        <div class="let">f</div>
                        <div class="let">g</div>
                        <div class="let">h</div>
                        
                    </div>
                    
                </div>
                <div id="playPlay">
                    
                </div>
            </div>
        </div>
    </div>
    <script src="./js/deck.js"></script>
    <script>
        var int = $('.int');
        int.each(function(i) {
            $(this).css("margin-bottom", "+=57px");
            if (i % 2 == 0) {
                $(this).css("color", "#ebecd0");
            }
        });
        var lett = $('.let');
        lett.each(function(i) {
            $(this).css("margin-left", "+="+cellWidth/1.15);
            if (i % 2 == 0) {
                $(this).css("color", "#ebecd0");
            }
        });
    </script>
    
</body>

</html>
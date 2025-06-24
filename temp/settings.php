<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./styles/bootstrap.min.css">
    <link rel="stylesheet" href="./styles/settings.css">
    <script src="./js/jquery.min.js"></script>
</head>

<body>
    <div id="wrap">
        <div class="wrapH1"><span>Welcome to settings! </span> </div>
        <a href="javascript:window.history.back();"><button id="return" type="button" class="btn btn-secondary">Return</button></a>

        <div id="Profile" class="setBlock">
            <div id="avatar">
                <img src="<?= SessionFunc::getUserAvatar() ?>" alt="">
            </div>
            <form enctype="multipart/form-data" method="post">
                <p><input type="file" name="f" id="fileInput">
                    <input type="submit" value="Отправить">
                </p>
            </form>
            <div id="name"><?= SessionFunc::getUserName() ?><div id="redact"><img src="./img/redact.svg" width="20px"></div>
            </div>
            <div id="Save" class="setBlockBtn">
                <form action="/?site=profile" method="post">

                    <button type="submit" class="btn btn-primary">Profile</button>
                </form>
            </div>
        </div>
        <div id="Exit" class="setBlockBtn">
            <form method="post">
                <button type="submit" name="logout" class="btn btn-danger ">Exit</button>
            </form>

        </div>
    </div>
    <script src="./js/avatar.js"></script>
        

</body>

</html>
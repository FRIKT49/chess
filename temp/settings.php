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
                <img src="<?= getAvatar(SessionFunc::getUserId()) ?>" alt="">
            </div>
            <input type="file" name="f" id="fileInput">
            <div id="name"><?= SessionFunc::getUserName() ?><div id="redact"><img src="./img/redact.svg" width="20px"></div>
            </div>
            <div id="Save" class="setBlockBtn">
                <form action="/?site=profile" method="post">
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
        <div id="Exit" class="setBlockBtn">
            <form method="post">
                <button type="submit" name="logout" class="btn btn-danger ">Exit</button>
            </form>

        </div>
    </div>
    <?include './js/avatar.php'?>
    <script>
        $('#redact img').click(function() {
            let name =  $("#name");
            let nameValue = name.text().replace(/\s/g, '');
            console.log(nameValue);
            name.html(`
                <input type="text" id="nameInput" value="${nameValue}">
                <button id="saveName" class="btn btn-success">Save</button>
            `);
        });
    </script>    

</body>

</html>
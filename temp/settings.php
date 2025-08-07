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
    <title>Параметры - ASDChess</title>
    <link rel="stylesheet" href="./styles/bootstrap.min.css">
    <link rel="stylesheet" href="./styles/settings.css">
    <link rel="stylesheet" href="./styles/animations.css">
    <script src="./js/jquery.min.js"></script> 
    <script src="./js/functions.js"></script>
    
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







        </div>
        <div id="Exit" class="setBlockBtn">
            <form method="post">
                <button type="submit" name="logout" class="btn btn-danger ">Exit</button>
            </form>

        </div>
    </div>
    <?include './js/avatar.php'?>
    <script>
        var changeNick;
        $('#redact img').click(function() {
            let name =  $("#name");
            let nameValue = name.text().replace(/\s/g, '');

            name.html(`
                <input type="text" id="nameInput" value="${nameValue}">
                <button id="saveName" class="btn btn-success">Ok</button>
            `);

            $('#saveName').click(function(e) {
                let newName = $('#nameInput').val();

                if (newName.trim() !== '') {
                    fetch('./inc/nameChange.php?nick=' + newName + '&id=<?= SessionFunc::getUserId() ?>')
                        .then(response => response.json())
                        .then(data => {
                            if (!data.success) {
                                error('danger', data.error, e);
                            }
                            if (data.success) {
                                $('#name').text(newName);
                                error('success', 'Вы успешно изменили имя!', e);
                                changeNick = data.nick;

                                // Второй fetch только после успешного первого
                                
                                
                            }
                        });
                } else {
                    alert('Name cannot be empty');
                }
            });
        });
        
    </script>    

</body>

</html>

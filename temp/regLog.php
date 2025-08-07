<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Авторизация - ASDChess</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/bootstrap-icons.min.css">
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/animations.css">
    <link rel="stylesheet" href="styles/regForm.css">
    
</head>

<body>
    <div id="wrap">

        <div class="regForm">
            <div class="regLog">
                <img src="../img/Chess.svg" class="Chess">
            </div>
            <form id="registrationForm" method="POST">
                <img src="../img/email.png" width="30px" height="30px" id="emailImage">
                <img src="../img/Lock.png" width="30px" height="30px" id="passImage">
                <input type="Text" id="email" name="name" placeholder="Username or Email"><br>
                <input type="password" id="password" name="password" placeholder="Password"><br>

                <button id="login" type="submit">
                    <div class="loginShadow"></div><span>Log In</span>
                </button>
            </form>

            <div class="regReg">
                <p>New?
                    <a href="/?site=reg" class="regLink">Sign up - and start playing chess!</a>
                </p>
            </div>
        </div>
    </div>
    </div>
    <script src="./js/functions.js"></script>
    <script>
        document.head.innerHTML += "<link rel='stylesheet' href='styles/regForm.css'>"
        var style = document.createElement("style");
        document.body.append(style);

        const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        registrationForm.addEventListener("submit", function(e) {
            console.log('нажал');

            if (emailValidator.test(email.value) && email.value.length > 0 ) {
            }else if(email.value.length < 3 && email.value.length > 20){
                error('danger', 'Проверте правильность адреса электронной почты или ника!',e);
            }
            if (password.value.length < 8) {
                error('danger', 'Проверте правильность пароля!',e);
            }
        });
    </script>
</body>

</html>
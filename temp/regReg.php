<!DOCTYPE html>
<html lang="en">

<head>
    <title>Регистрация - ASDChess</title>
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
                <div id="Dog">@</div>
                <img src="../img/email.png" width="30px" height="30px" id="emailImage">
                <img src="../img/Lock.png" width="30px" height="30px" id="passImage">
                <img src="../img/repeat.svg" width="30px" height="30px" id="repImage">
                <input type="Text" id="nick" name="name" placeholder="userName"><br>
                <input type="email" id="email" name="email" placeholder="Email"><br>
                <input type="password" id="password" name="password" placeholder="Password"><br>
                <input type="password" id="secPassword" name="secPassword" placeholder="Repeat password"><br>

                <button id="login" type="submit">
                    <div class="loginShadow"></div><span>Log In</span>
                </button>
            </form>

            <div class="regReg">
                <p>
                    <a href="/?site=log" class="regLink">If you're already Sing in - Log in!</a>
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
        style.innerHTML = `
        .regForm {
            height:500px;
        }
        .regReg{
            bottom: -146px;
        }
        #passImage{
            top: 196px;
        }
        #repImage{  
            top: 274px;
        }
        #login{
            top: 25px !important;
        }`

        const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        const rusCaseRegex = /[А-яа-я]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[@#$%&*!]/;

        function validatePassword() {



            console.log(password.value);
            console.log(upperCaseRegex.test(password));
            console.log(lowerCaseRegex.test(password));
            if (password.length < 16 || password.length > 8) {

                return "Пароль должен содержать не меньше 8 и не больше 16 символов!";
            }
            if (rusCaseRegex.test(password.value)) {

                return "В пароле должны быть только латинские буквы!";
            }
            if (!upperCaseRegex.test(password.value)) {


                return "В пароле должна быть заглавная буква!";
            }
            if (!lowerCaseRegex.test(password.value)) {

                return "В пароле должны быть не заглавные буквы!";
            }
            
            if (!numberRegex.test(password.value)) {

                return "В пароле должна быть хотя бы одна цифра!";
            }
            if (!specialCharRegex.test(password.value)) {

                return "В пароле должен быть хотя бы один специальный символ!";
            }
            if (password.value != secPassword.value) {
                return "Пароли не совпадают!";
            }

        }



        registrationForm.addEventListener("submit", function(e) {
  
            if(nick.value.length < 3){
                error('danger',"В имени не может быть меньше 3 символов!",e);
                console.log('go');
                
            }
            if(nick.value.length > 20){
                error('danger','В имени не может быть больше 16 символов!',e)
            }
            if (emailValidator.test(email.value)) {
            }
            else {
                error('danger', 'Проверте правильность почты!',e);
            }
            if(rusCaseRegex.test(nick.value)){
                error('danger', 'В имени должны быть только латинские буквы!',e);
            }
            if (!validatePassword()) {

            } else {
                error('danger', validatePassword(),e);
            }
        })
    </script>
</body>



</html>
<? 
    if (!defined('ENGINE')) {
        die("Hack no attempt!");
    }
    
    // deReg();
    
    
    // dump($_POST);
    
    
    
    $upperCaseRegex = "/[A-Z]/";
    $lowerCaseRegex = "/[a-z]/";
    $rusCaseRegex = "/[А-яа-я]/";
    $numberRegex = "/[0-9]/";    
    if(!isLog()){
        if(isPOST()){
            $userInfo = [
                'name' => $_POST['name'],
                'password' => $_POST['password'],
            ];
            $name = varFilter($userInfo['name']);
            $password = varFilter($userInfo['password']);
            if($name){
                if(filter_var($name, FILTER_VALIDATE_EMAIL)){
                    
                    $selectUser = "SELECT `id` FROM `users` WHERE `email` = '{$name}'";
                    $isEmail = true;
                }elseif((strlen($name) > 3 and strlen($name) < 16) and !preg_match($rusCaseRegex,$name) and(preg_match($upperCaseRegex,$name) or preg_match($lowerCaseRegex,$name) or preg_match($numberRegex,$name))) {
                    $selectUser = "SELECT `id` FROM `users` WHERE `name` = '{$name}'";
                }else $error = "Неправельный ввод данных";
            }else $error = "Введите данные";
            
            if(empty($error)){
                if(mysqli_query($db, $selectUser)){
                    $result = mysqli_query($db, $selectUser);
                    $row = mysqli_fetch_assoc($result);
                    // dump($row);
                    if($row['id']){

                        $selectPassword = "SELECT `pass` FROM `users` WHERE `id` = '{$row['id']}'";
                        $resultPass = mysqli_query($db,$selectPassword);
                        $passwordQuery = mysqli_fetch_assoc($resultPass);
                        if($passwordQuery){
                            if(password_verify($password,$passwordQuery['pass'])){
                                if($isEmail){
                                    if(mysqli_query($db, "SELECT `name` FROM `users` WHERE `id` = '{$row['id']}'")){
                                        $resultName = mysqli_query($db,"SELECT `name` FROM `users` WHERE `id` = '{$row['id']}'");
                                        $nameQuery = mysqli_fetch_assoc($resultName);
                                        $_SESSION['id'] = $row['id'];
                                        $_SESSION['name'] = $nameQuery['name'];
                                    }
                                    
                                }else{
                                    $_SESSION['id'] = $row['id'];
                                    $_SESSION['name'] = $name;
                                }
                                
                                relocationToMain();
                            }else $error = "Password verification failed";
                        }
                    }else $error = "Неправельный логин или ник";
                    
                };
            }

            
            
        }
    }else{
        relocationToMain();
    }
    include 'temp/regLog.php';
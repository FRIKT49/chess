<?
    if (!defined('ENGINE')) {
        die("Hack no attempt!");
    }
   


    
    $userInfo = $_POST;
    $name = varFilter($userInfo['name']);
    $email = varFilter($userInfo['email']);
    $password = varFilter($userInfo['password']);

    $password2 = varFilter($userInfo['secPassword']);
    // $name = $_POST['name'];
    
    $upperCaseRegex = "/[A-Z]/";
    $lowerCaseRegex = "/[a-z]/";
    $rusCaseRegex = "/[А-яа-я]/";
    $numberRegex = "/[0-9]/";
    $specialCharRegex = "/[@#$%&*!]/";
    
    if($userInfo){
        
        if($name){
            if((strlen($name) > 3 and strlen($name) < 16) and !preg_match($rusCaseRegex,$name) and(preg_match($upperCaseRegex,$name) or preg_match($lowerCaseRegex,$name) or preg_match($numberRegex,$name))){
                $namereg = $name;
            }else{
                $nameError = true;
                $error = "Invalid username";
            }
        }
        if($email){
            if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                $emailreg = $email;
            }else $emailErrror =true;
        }
        if($password){
            if((strlen($password) > 6 and strlen($password) < 16) and ($password == $password2)){
                if(preg_match($upperCaseRegex,$password) and preg_match($lowerCaseRegex,$userInfo['password']) and !preg_match($rusCaseRegex,$password) and preg_match($numberRegex,$password) and preg_match($specialCharRegex,$password)){
                    $passwordreg = password_hash($password, PASSWORD_DEFAULT);
                } 
                
            }else $passError = true;
        }

        if((empty($emailError) and empty($passwordError)) and empty($nameError)){
            
			$uniq_email = "SELECT * FROM `users` WHERE email = '{$emailreg}'";
			$uniq_name = "SELECT * FROM `users` WHERE name = '{$namereg}'";
            
			
			
			$resultUniqEmail = mysqli_query($db, $uniq_email);
			$resultUniqName = mysqli_query($db, $uniq_name);

			if(mysqli_num_rows($resultUniqEmail) > 0){
				$error = 'Указанный Вами email адрес уже зарегистрирован на нашем сайте';
			}
            if(mysqli_num_rows($resultUniqName) > 0){
                $error = 'Указанное Вами имя с уже зарегистрировано на нашем сайте';

            }
		}
        if(($name and $email and $passwordreg) and !$error){
            $date = time();
            $SQL = "INSERT INTO `users` 
            (
                `name`,
                `email`,
                `pass`,
                `regData`
            )
            VALUES 
            (
                '{$namereg}',
                '{$emailreg}',
                '{$passwordreg}',
                '{$date}'
                
            )";
            
            if(mysqli_query($db, $SQL)){
                $isReg = true;
                
            }else{
                $isReg = false;
                $error = 'Ошибка при регистрации';
            }
        }
     
        
            
        
        
    }
    
    include 'temp/regReg.php';
?>
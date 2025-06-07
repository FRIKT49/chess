<?

    if(isLog()){
		$selectUserInfoSQL = "SELECT * FROM `users` WHERE id = ".getUserId();
		
		$result = mysqli_query($db, $selectUserInfoSQL);
		if(mysqli_num_rows($result)){
            $userInfoAssoc = mysqli_fetch_assoc($result);
            $userInfo = [
                'userName' => $userInfoAssoc['name'],
                'userEmail' => $userInfoAssoc['email'],
                'userSt' => $userInfoAssoc['isAdm'],
                'userRate' => $userInfoAssoc['rating'],
            ];
            
        }else $error = 'Ошибка базы данных';
        
	}
?>
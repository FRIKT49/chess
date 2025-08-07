<?
    if (!defined('ENGINE')) {
        die("Hack no attempt!");
    }
    echo isLog();
    if(isLog()){
        include 'temp/play.php';
    }else{
            
        header('Location: /?site=log');
    }

?>




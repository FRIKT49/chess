<?php
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}
if(isLog()){
    include 'temp/main.php';
}else{
    
    header('Location: /?site=log');
}
    
    
    
    
    
?>
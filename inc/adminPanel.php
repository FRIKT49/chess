<?
if(isLog()){
    include 'temp/adminPanel.php';
}else{
    
    header('Location: /?site=log');
}

<?
if (!defined('ENGINE')) {
	die("Hack no attempt!");
}
error_reporting(0); // Отключает отображение всех ошибок

if ($_GET) {
	$module = $_GET['site'];
	if ($module == 'log') {
		$file = 'regLog';
	} elseif ($module == 'reg') {
		$file = 'regReg';
	} elseif ($module == 'main') {
		$file = 'main';
	} elseif ($module == 'play') {
		$file = 'play';
	} elseif ($module == 'settings') {
		$file = 'settings';
	} elseif ($module == 'game') {
		$file = 'game';
	} else {
		if (empty($module)) $file = 'regLog';
		else {
			$error = 404;
		}
	}
}else{
	if(isLog()) relocationToMain();
	else header('Location: /?site=main');
}




// Подключение выбранного модуля
include 'inc/' . $file . '.php';
